// カード関連の定義
const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
const JOKER = 'black_joker';
const RED_JOKER = 'red_joker';

// キャラクター定義を読み込むための変数
let CHARACTERS = {};

// 階級定義
const RANKINGS = [
    '大富豪',
    '富豪',
    '平民',
    '貧民',
    '大貧民'
];

// ゲーム状態
let gameState = {
    players: [],
    currentPlayerIndex: 0,
    field: [],
    deck: [],
    playerName: '',
    selectedCards: [],
    revolution: false,
    selectedCharacters: [],
    finishedPlayers: [], // 上がったプレイヤーを追跡
    dialogueElement: null // セリフ表示要素を追加
};

// DOM要素
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name');
const startGameButton = document.getElementById('start-game');
const fieldElement = document.getElementById('field');
const playersElement = document.getElementById('players');
const playerHandElement = document.getElementById('player-hand');
const playButton = document.getElementById('play-button');
const passButton = document.getElementById('pass-button');
const characterSelectionElement = document.getElementById('ai-character-selection');

// イベントリスナー
startGameButton.addEventListener('click', startGame);
playButton.addEventListener('click', playSelectedCards);
passButton.addEventListener('click', passTurn);

// ゲーム開始
function startGame() {
    const name = playerNameInput.value.trim() || 'プレイヤー';
    gameState.playerName = name;
    setupScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    initializeGame();
}

// ゲーム初期化
function initializeGame() {
    // キャラクター定義を読み込む
    loadCharacterDefinitions();
    
    // キャラクター選択オプションを生成
    generateCharacterOptions();
    
    // プレイヤーの作成 (1人のプレイヤーと選択されたAI)
    gameState.players = [
        { id: 0, name: gameState.playerName, isHuman: true, hand: [], rank: null }
    ];
    
    // 選択されたキャラクターに基づいてAIプレイヤーを作成
    gameState.selectedCharacters.forEach((character, index) => {
        const charData = CHARACTERS[character];
        gameState.players.push({
            id: index + 1,
            name: charData.name,
            isHuman: false,
            hand: [],
            character: character,
            rank: null
        });
    });
    
    // 必要に応じてデフォルトのAIを追加
    while (gameState.players.length < 4) {
        const index = gameState.players.length;
        gameState.players.push({
            id: index,
            name: `AI ${index}`,
            isHuman: false,
            hand: [],
            rank: null
        });
    }
    
    // デッキの作成とシャッフル
    createDeck();
    shuffleDeck();
    
    // カードの配布
    dealCards();
    
    // 上がりプレイヤーをクリア
    gameState.finishedPlayers = [];
    
    // セリフ表示要素を作成
    createDialogueElement();
    
    // ゲーム画面の更新
    updateGameDisplay();
}

// キャラクター定義を読み込む関数
function loadCharacterDefinitions() {
    // JSONファイルからキャラクター定義を読み込む
    fetch('public/characters/character_defs.json')
        .then(response => response.json())
        .then(data => {
            // データをCHARACTERSオブジェクトに格納
            data.forEach(character => {
                CHARACTERS[character.id] = character;
            });
        })
        .catch(error => console.error('キャラクター定義の読み込みエラー:', error));
}

// キャラクター選択オプションを生成する関数
function generateCharacterOptions() {
    characterSelectionElement.innerHTML = '';
    
    // 利用可能なキャラクターを表示
    Object.keys(CHARACTERS).forEach(characterId => {
        const character = CHARACTERS[characterId];
        const characterOption = document.createElement('div');
        characterOption.className = 'character-option';
        characterOption.dataset.character = characterId;
        
        characterOption.innerHTML = `
            <img src="${character.portrait}" alt="${character.name}" width="50">
            <p>${character.name} (${character.MBTI})</p>
        `;
        
        characterOption.addEventListener('click', () => {
            characterOption.classList.toggle('selected');
            const character = characterOption.dataset.character;
            
            // 選択されたキャラクターを追加または削除
            if (gameState.selectedCharacters.includes(character)) {
                gameState.selectedCharacters = gameState.selectedCharacters.filter(c => c !== character);
            } else {
                gameState.selectedCharacters.push(character);
            }
        });
        
        characterSelectionElement.appendChild(characterOption);
    });
}

// セリフ表示要素を作成
function createDialogueElement() {
    // 既存のセリフ要素があれば削除
    if (gameState.dialogueElement) {
        gameState.dialogueElement.remove();
    }
    
    // 新しいセリフ要素を作成
    gameState.dialogueElement = document.createElement('div');
    gameState.dialogueElement.id = 'dialogue';
    gameState.dialogueElement.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(255, 255, 255, 0.9);
        border: 2px solid #333;
        border-radius: 10px;
        padding: 10px 20px;
        font-size: 18px;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        display: none;
    `;
    
    document.body.appendChild(gameState.dialogueElement);
}

// セリフを表示
function showDialogue(text, duration = 3000) {
    if (!gameState.dialogueElement) return;
    
    gameState.dialogueElement.textContent = text;
    gameState.dialogueElement.style.display = 'block';
    
    // 指定時間後に非表示
    setTimeout(() => {
        if (gameState.dialogueElement) {
            gameState.dialogueElement.style.display = 'none';
        }
    }, duration);
}

// ランダムなセリフを取得
function getRandomDialogue(character, situation) {
    // pairLinesのチェック
    if (situation === 'play' || situation === 'pressure' || situation === 'antiPressure' || situation === 'win' || situation === 'pass') {
        // 場の他のプレイヤーをチェック
        for (let i = 1; i < gameState.players.length; i++) {
            const player = gameState.players[i];
            if (player.character && player.character !== character.id && character.pairLinesDetailed) {
                const pairLines = character.pairLinesDetailed[player.character];
                if (pairLines && pairLines[situation]) {
                    const lines = pairLines[situation];
                    return lines[Math.floor(Math.random() * lines.length)];
                }
            }
        }
    }
    
    // 通常のvoiceLinesDetailedからセリフを取得
    if (character.voiceLinesDetailed && character.voiceLinesDetailed[situation]) {
        const lines = character.voiceLinesDetailed[situation];
        return lines[Math.floor(Math.random() * lines.length)];
    }
    
    // デフォルトのセリフ
    const defaultLines = {
        play: "これでどうかな？",
        win: "勝った！",
        pass: "パスするね。",
        revolution: "革命だ！"
    };
    
    return defaultLines[situation] || "...";
}

// デッキの作成
function createDeck() {
    gameState.deck = [];
    
    // 通常のカードを追加
    for (const suit of SUITS) {
        for (const rank of RANKS) {
            gameState.deck.push(`${rank}_of_${suit}`);
        }
    }
    
    // ジョーカーを追加
    gameState.deck.push(JOKER);
    gameState.deck.push(JOKER);
    gameState.deck.push(RED_JOKER);
}

// デッキのシャッフル
function shuffleDeck() {
    for (let i = gameState.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.deck[i], gameState.deck[j]] = [gameState.deck[j], gameState.deck[i]];
    }
}

// カードの配布
function dealCards() {
    // 各プレイヤーに13枚のカードを配る
    for (let i = 0; i < 13; i++) {
        for (const player of gameState.players) {
            if (gameState.deck.length > 0) {
                player.hand.push(gameState.deck.pop());
            }
        }
    }
    
    // プレイヤーの手札をソート
    sortPlayerHand();
}

// プレイヤーの手札をソート
function sortPlayerHand() {
    const player = gameState.players[0];
    player.hand.sort((a, b) => {
        // ジョーカーは最後に
        if (a === JOKER) return 1;
        if (b === JOKER) return -1;
        if (a === RED_JOKER) return 1;
        if (b === RED_JOKER) return -1;
        
        // スートで比較
        const suitA = a.split('_of_')[1];
        const suitB = b.split('_of_')[1];
        const suitIndexA = SUITS.indexOf(suitA);
        const suitIndexB = SUITS.indexOf(suitB);
        
        if (suitIndexA !== suitIndexB) {
            return suitIndexA - suitIndexB;
        }
        
        // ランクで比較
        const rankA = a.split('_of_')[0];
        const rankB = b.split('_of_')[0];
        const rankIndexA = RANKS.indexOf(rankA);
        const rankIndexB = RANKS.indexOf(rankB);
        
        return rankIndexA - rankIndexB;
    });
}

// ゲーム画面の更新
function updateGameDisplay() {
    updateField();
    updatePlayers();
    updatePlayerHand();
}

// 場の更新
function updateField() {
    fieldElement.innerHTML = '';
    if (gameState.field.length === 0) {
        fieldElement.textContent = '場にはカードがありません';
    } else {
        // 場のカードを表示
        for (const card of gameState.field) {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.style.backgroundImage = `url(cards/${card}.png)`;
            fieldElement.appendChild(cardElement);
        }
    }
}

// プレイヤー情報の更新
function updatePlayers() {
    playersElement.innerHTML = '';
    for (let i = 1; i < gameState.players.length; i++) {
        const player = gameState.players[i];
        const playerElement = document.createElement('div');
        playerElement.className = 'player';
        playerElement.innerHTML = `
            <h3>${player.name}</h3>
            <p>手札: ${player.hand.length}枚</p>
        `;
        playersElement.appendChild(playerElement);
    }
}

// プレイヤーの手札の更新
function updatePlayerHand() {
    playerHandElement.innerHTML = '';
    const player = gameState.players[0];
    
    for (let i = 0; i < player.hand.length; i++) {
        const card = player.hand[i];
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.backgroundImage = `url(cards/${card}.png)`;
        cardElement.dataset.index = i;
        
        // カードクリックイベント
        cardElement.addEventListener('click', () => {
            toggleCardSelection(i);
        });
        
        playerHandElement.appendChild(cardElement);
    }
}

// カード選択のトグル
function toggleCardSelection(index) {
    const selectedIndex = gameState.selectedCards.indexOf(index);
    const cardElement = document.querySelector(`.card[data-index="${index}"]`);
    
    if (selectedIndex === -1) {
        // カードを選択
        gameState.selectedCards.push(index);
        cardElement.classList.add('selected');
    } else {
        // カードの選択を解除
        gameState.selectedCards.splice(selectedIndex, 1);
        cardElement.classList.remove('selected');
    }
}

// カードが有効かチェック
function isValidPlay(cardNames) {
    // ここでは簡単のために、同じランクのカードのみを許可
    if (cardNames.length === 0) return false;
    
    // ジョーカーを除いたカードのランクを取得
    const ranks = cardNames
        .filter(name => name !== JOKER && name !== RED_JOKER)
        .map(name => name.split('_of_')[0]);
    
    // すべてのカードが同じランクかチェック
    const isSameRank = ranks.every(rank => rank === ranks[0]);
    
    // 革命時の強さを考慮
    if (gameState.revolution) {
        // 革命時は強さが逆転する
        return isSameRank;
    }
    
    return isSameRank;
}

// 8切りのチェック
function checkEightCut() {
    // 場に出たカードに8が含まれているかチェック
    return gameState.field.some(card => {
        const rank = card.split('_of_')[0];
        return rank === '8';
    });
}

// 革命のチェックと適用
function checkRevolution() {
    // 場に出たカードが4枚で同じランクなら革命
    if (gameState.field.length === 4) {
        const ranks = gameState.field
            .filter(name => name !== JOKER && name !== RED_JOKER)
            .map(name => name.split('_of_')[0]);
        
        if (ranks.length === 4 && ranks.every(rank => rank === ranks[0])) {
            gameState.revolution = !gameState.revolution;
            
            // 革命セリフを表示
            showDialogue(gameState.revolution ? '革命発生！' : '革命終了！');
            
            return true;
        }
    }
    return false;
}

// 選択されたカードを出す
function playSelectedCards() {
    if (gameState.selectedCards.length === 0) {
        alert('カードを選択してください');
        return;
    }
    
    // 選択されたカードを取得
    const selectedCardNames = gameState.selectedCards
        .map(index => gameState.players[0].hand[index])
        .sort();
    
    // 選択されたカードが有効かチェック（簡易的なチェック）
    if (isValidPlay(selectedCardNames)) {
        // 場に出す
        gameState.field = selectedCardNames;
        
        // 8切りのチェック
        if (checkEightCut()) {
            alert('8切り！');
            // 8切りの場合、場のカードをクリア
            setTimeout(() => {
                gameState.field = [];
                updateGameDisplay();
            }, 1000);
        }
        
        // 革命のチェック
        checkRevolution();
        
        // 手札から削除
        gameState.selectedCards.sort((a, b) => b - a); // 降順にソートして後ろから削除
        for (const index of gameState.selectedCards) {
            gameState.players[0].hand.splice(index, 1);
        }
        
        // 上がりチェック
        if (gameState.players[0].hand.length === 0) {
            gameState.finishedPlayers.push(0);
            gameState.players[0].rank = RANKINGS[gameState.finishedPlayers.length - 1];
            alert(`${gameState.playerName} さんが上がりました！ 階級: ${gameState.players[0].rank}`);
            
            // ゲーム終了チェック
            if (gameState.finishedPlayers.length >= 3) {
                finishGame();
                return;
            }
        }
        
        // 選択をクリア
        gameState.selectedCards = [];
        
        // 表示を更新
        updateGameDisplay();
        
        // AIのターンへ
        setTimeout(aiTurn, 1000);
    } else {
        alert('そのカードは出せません');
    }
}

// パス
function passTurn() {
    // 選択をクリア
    gameState.selectedCards = [];
    document.querySelectorAll('.card.selected').forEach(el => el.classList.remove('selected'));
    
    // AIのターンへ
    setTimeout(aiTurn, 500);
}

// AIのターン
function aiTurn() {
    // 各AIプレイヤーのターンを処理
    for (let i = 1; i < gameState.players.length; i++) {
        const player = gameState.players[i];
        if (player.hand.length === 0) continue;
        
        // AIの戦略に基づいてカードを選択
        const cardToPlay = selectCardForAI(player);
        
        if (cardToPlay) {
            gameState.field = [cardToPlay];
            // 手札から削除
            const index = player.hand.indexOf(cardToPlay);
            if (index > -1) {
                player.hand.splice(index, 1);
            }
            
            // セリフを表示
            const character = player.character ? CHARACTERS[player.character] : null;
            if (character) {
                // プレイヤーがカードを出すときのセリフを取得
                let dialogue = getRandomDialogue(character, 'play');
                // pairLinesのチェック
                if (gameState.players[0].character && character.pairLinesDetailed && character.pairLinesDetailed[gameState.players[0].character]) {
                    const pairLines = character.pairLinesDetailed[gameState.players[0].character];
                    if (pairLines['play']) {
                        const lines = pairLines['play'];
                        dialogue = lines[Math.floor(Math.random() * lines.length)];
                    }
                }
                showDialogue(`${player.name}: ${dialogue}`);
            }
            
            // 上がりチェック
            if (player.hand.length === 0) {
                gameState.finishedPlayers.push(i);
                player.rank = RANKINGS[gameState.finishedPlayers.length - 1];
                
                // 上がりセリフを表示
                if (character) {
                    // プレイヤーが上がったときのセリフを取得
                    let dialogue = getRandomDialogue(character, 'win');
                    // pairLinesのチェック
                    if (gameState.players[0].character && character.pairLinesDetailed && character.pairLinesDetailed[gameState.players[0].character]) {
                        const pairLines = character.pairLinesDetailed[gameState.players[0].character];
                        if (pairLines['win']) {
                            const lines = pairLines['win'];
                            dialogue = lines[Math.floor(Math.random() * lines.length)];
                        }
                    }
                    showDialogue(`${player.name}: ${dialogue}`);
                }
                
                alert(`${player.name} さんが上がりました！ 階級: ${player.rank}`);
                
                // ゲーム終了チェック
                if (gameState.finishedPlayers.length >= 3) {
                    finishGame();
                    return;
                }
            }
            
            // 表示を更新
            updateGameDisplay();
            
            // 1人のAIが行動したら終了
            break;
        } else {
            // パスセリフを表示
            const character = player.character ? CHARACTERS[player.character] : null;
            if (character) {
                // プレイヤーがパスするときのセリフを取得
                let dialogue = getRandomDialogue(character, 'pass');
                // pairLinesのチェック
                if (gameState.players[0].character && character.pairLinesDetailed && character.pairLinesDetailed[gameState.players[0].character]) {
                    const pairLines = character.pairLinesDetailed[gameState.players[0].character];
                    if (pairLines['pass']) {
                        const lines = pairLines['pass'];
                        dialogue = lines[Math.floor(Math.random() * lines.length)];
                    }
                }
                showDialogue(`${player.name}: ${dialogue}`);
            }
        }
    }
    
    // プレイヤーのターンに戻る
}

// AIのカード選択ロジック
function selectCardForAI(player) {
    // キャラクターのパラメータを取得
    const character = player.character ? CHARACTERS[player.character] : null;
    
    // 場のカードのランクを取得
    let fieldRank = null;
    if (gameState.field.length > 0) {
        const fieldCard = gameState.field[0];
        fieldRank = fieldCard.split('_of_')[0];
    }
    
    // 有効なカードをフィルタリング
    const validCards = player.hand.filter(card => {
        // ジョーカーは常に有効
        if (card === JOKER || card === RED_JOKER) return true;
        
        const cardRank = card.split('_of_')[0];
        
        // 場にカードがない場合はすべて有効
        if (!fieldRank) return true;
        
        // 革命時の強さを考慮
        const fieldRankIndex = RANKS.indexOf(fieldRank);
        const cardRankIndex = RANKS.indexOf(cardRank);
        
        if (gameState.revolution) {
            // 革命時は強さが逆転
            return cardRankIndex <= fieldRankIndex;
        } else {
            // 通常時は強いカードのみ有効
            return cardRankIndex >= fieldRankIndex;
        }
    });
    
    if (validCards.length === 0) {
        // 有効なカードがない場合はパス
        return null;
    }
    
    // ジョーカーが含まれている場合、それを優先的に選択
    const jokers = validCards.filter(card => card === JOKER || card === RED_JOKER);
    if (jokers.length > 0 && Math.random() < 0.7) { // 70%の確率でジョーカーを使用
        return jokers[Math.floor(Math.random() * jokers.length)];
    }
    
    // キャラクターのパラメータに基づいてカードを選択
    if (character) {
        // 攻撃性が高い場合は強いカードを優先
        if (character.aggressiveness > 0.5) {
            validCards.sort((a, b) => {
                // ジョーカーは最強
                if (a === JOKER || a === RED_JOKER) return -1;
                if (b === JOKER || b === RED_JOKER) return 1;
                
                const rankA = RANKS.indexOf(a.split('_of_')[0]);
                const rankB = RANKS.indexOf(b.split('_of_')[0]);
                
                if (gameState.revolution) {
                    return rankA - rankB; // 革命時は弱いカードを優先
                } else {
                    return rankB - rankA; // 通常時は強いカードを優先
                }
            });
            return validCards[0];
        }
        
        // 協調性が高い場合は弱いカードを優先
        if (character.cooperativeness > 0.5) {
            validCards.sort((a, b) => {
                // ジョーカーは最強
                if (a === JOKER || a === RED_JOKER) return -1;
                if (b === JOKER || b === RED_JOKER) return 1;
                
                const rankA = RANKS.indexOf(a.split('_of_')[0]);
                const rankB = RANKS.indexOf(b.split('_of_')[0]);
                
                if (gameState.revolution) {
                    return rankB - rankA; // 革命時は強いカードを優先
                } else {
                    return rankA - rankB; // 通常時は弱いカードを優先
                }
            });
            return validCards[0];
        }
    }
    
    // デフォルトの選択（ランダム）
    return validCards[Math.floor(Math.random() * validCards.length)];
}

// ゲーム終了処理
function finishGame() {
    // まだ階級が決まっていないプレイヤーには大貧民を割り当て
    gameState.players.forEach(player => {
        if (player.rank === null) {
            player.rank = RANKINGS[4]; // 大貧民
        }
    });
    
    // 結果を表示
    let resultMessage = 'ゲーム終了！\n\n';
    gameState.players.forEach(player => {
        resultMessage += `${player.name}: ${player.rank}\n`;
    });
    
    alert(resultMessage);
    
    // ゲームをリセット
    setTimeout(() => {
        if (confirm('もう一度遊びますか？')) {
            resetGame();
        }
    }, 1000);
}

// ゲームリセット
function resetGame() {
    gameState.players = [];
    gameState.currentPlayerIndex = 0;
    gameState.field = [];
    gameState.deck = [];
    gameState.selectedCards = [];
    gameState.revolution = false;
    gameState.finishedPlayers = [];
    
    // 画面を初期化
    setupScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    
    // キャラクター選択をリセット
    characterOptions.forEach(option => {
        option.classList.remove('selected');
    });
    gameState.selectedCharacters = [];
}

