document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('show-game-info');
    const modal = document.getElementById('game-info-modal');
    const closeButton = document.getElementById('close-game-info');
    const gameScreen = document.getElementById('game-screen');
    const setupScreen = document.getElementById('setup-screen');

    // -----------------------------
    // 「このゲームについて」モーダル
    // -----------------------------
    const openInfoModal = () => {
        if (!modal) return;
        modal.style.display = 'block';
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
    };

    const closeInfoModal = () => {
        if (!modal) return;
        modal.style.display = 'none';
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
    };

    if (openButton && modal) {
        openButton.addEventListener('click', openInfoModal);
    }

    if (closeButton && modal) {
        closeButton.addEventListener('click', closeInfoModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeInfoModal();
        });
    }

    // -----------------------------
    // ページ下部の紹介ボタン
    // -----------------------------
    // SEO本文はHTMLに残すが、通常画面では表示しない。
    const seoContent = document.querySelector('.seo-content');
    if (seoContent) seoContent.style.display = 'none';

    let bottomInfoButton = document.getElementById('bottom-game-info');
    if (!bottomInfoButton && modal) {
        bottomInfoButton = document.createElement('button');
        bottomInfoButton.id = 'bottom-game-info';
        bottomInfoButton.type = 'button';
        bottomInfoButton.textContent = '📖 このゲームの紹介・特徴を見る';
        document.body.appendChild(bottomInfoButton);
        bottomInfoButton.addEventListener('click', openInfoModal);
    }

    // ゲーム中は画面下の固定ボタンが操作の邪魔にならないよう非表示。
    const updateBottomButtonVisibility = () => {
        if (!bottomInfoButton || !setupScreen || !gameScreen) return;
        const gameIsVisible = getComputedStyle(gameScreen).display !== 'none';
        const setupIsVisible = getComputedStyle(setupScreen).display !== 'none';
        bottomInfoButton.style.display = setupIsVisible && !gameIsVisible ? 'block' : 'none';
    };

    updateBottomButtonVisibility();

    if (gameScreen) {
        const observer = new MutationObserver(updateBottomButtonVisibility);
        observer.observe(gameScreen, { attributes: true, attributeFilter: ['style', 'class'] });
        if (setupScreen) {
            observer.observe(setupScreen, { attributes: true, attributeFilter: ['style', 'class'] });
        }
    }

    // -----------------------------
    // ゲーム退出確認モーダル
    // -----------------------------
    // window.confirm() の代わりにゲームデザインに合わせた専用モーダルを生成。
    let exitModal = document.getElementById('exit-game-modal');

    if (!exitModal) {
        exitModal = document.createElement('div');
        exitModal.id = 'exit-game-modal';
        exitModal.className = 'modal';
        exitModal.innerHTML = `
            <div class="modal-content exit-game-modal-content">
                <button type="button" class="exit-modal-close" aria-label="閉じる">&times;</button>
                <h2>ゲームを終了しますか？</h2>
                <p>現在のゲームを終了して、最初の画面に戻ります。</p>
                <div class="exit-modal-actions">
                    <button type="button" id="cancel-exit-game">キャンセル</button>
                    <button type="button" id="confirm-exit-game">タイトルに戻る</button>
                </div>
            </div>
        `;
        document.body.appendChild(exitModal);
    }

    const closeExitModal = () => {
        exitModal.style.display = 'none';
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
    };

    const openExitModal = () => {
        exitModal.style.display = 'block';
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
    };

    exitModal.querySelector('.exit-modal-close')?.addEventListener('click', closeExitModal);
    exitModal.querySelector('#cancel-exit-game')?.addEventListener('click', closeExitModal);
    exitModal.addEventListener('click', (event) => {
        if (event.target === exitModal) closeExitModal();
    });

    exitModal.querySelector('#confirm-exit-game')?.addEventListener('click', () => {
        window.location.reload();
    });

    // -----------------------------
    // ゲーム中の「タイトルに戻る」ボタン
    // -----------------------------
    if (gameScreen && !document.getElementById('exit-game-btn')) {
        const exitButton = document.createElement('button');
        exitButton.id = 'exit-game-btn';
        exitButton.type = 'button';
        exitButton.textContent = '↩ タイトルに戻る';
        exitButton.title = '現在のゲームを終了して最初の画面に戻ります';
        exitButton.addEventListener('click', openExitModal);

        const controls = document.getElementById('controls');
        if (controls) {
            controls.insertAdjacentElement('afterend', exitButton);
        } else {
            gameScreen.appendChild(exitButton);
        }
    }

    // -----------------------------
    // キーボード操作
    // -----------------------------
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;

        if (exitModal.style.display === 'block') {
            closeExitModal();
        } else if (modal && modal.style.display === 'block') {
            closeInfoModal();
        }
    });

    // -----------------------------
    // UI用スタイル
    // -----------------------------
    const style = document.createElement('style');
    style.textContent = `
        #bottom-game-info {
            position: fixed;
            z-index: 1200;
            left: 50%;
            bottom: max(14px, env(safe-area-inset-bottom));
            transform: translateX(-50%);
            margin: 0;
            padding: 10px 22px;
            border: 2px solid #6e8efb;
            border-radius: 999px;
            background: rgba(255,255,255,.96);
            color: #6e8efb;
            font-weight: bold;
            font-size: .95rem;
            white-space: nowrap;
            box-shadow: 0 6px 18px rgba(70,90,180,.18);
            cursor: pointer;
        }
        #bottom-game-info:hover {
            background: #f0f7ff;
        }
        #exit-game-btn {
            display: block;
            margin: 6px auto 20px;
            padding: 9px 22px;
            border: 1px solid rgba(120,120,120,.45);
            border-radius: 999px;
            background: rgba(255,255,255,.9);
            color: #666;
            font-size: .9rem;
            font-weight: bold;
            cursor: pointer;
        }
        #exit-game-btn:hover {
            background: #f5f5f5;
        }
        #exit-game-modal .modal-content {
            max-width: 430px;
            text-align: center;
        }
        #exit-game-modal h2 {
            margin-top: 8px;
            color: #555;
        }
        #exit-game-modal p {
            margin: 16px 0 22px;
            line-height: 1.8;
            color: #666;
        }
        .exit-modal-close {
            display: block;
            margin-left: auto;
            border: none;
            background: transparent;
            color: #888;
            font-size: 2rem;
            line-height: 1;
            cursor: pointer;
        }
        .exit-modal-actions {
            display: flex;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .exit-modal-actions button {
            min-width: 130px;
            padding: 11px 18px;
            border: none;
            border-radius: 999px;
            font-weight: bold;
            cursor: pointer;
        }
        #cancel-exit-game {
            background: #eee;
            color: #555;
        }
        #confirm-exit-game {
            background: linear-gradient(45deg, #ff9a9e, #ff6b6b);
            color: white;
            box-shadow: 0 4px 12px rgba(255,107,107,.25);
        }
        @media (max-width: 600px) {
            #bottom-game-info {
                max-width: calc(100% - 24px);
                padding: 9px 16px;
                font-size: .88rem;
            }
            #exit-game-btn {
                margin-bottom: 16px;
                padding: 9px 18px;
            }
            #exit-game-modal .modal-content {
                width: calc(100% - 28px);
                padding: 20px 16px 24px;
            }
        }
    `;
    document.head.appendChild(style);
});
