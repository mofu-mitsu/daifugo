// ==========================================
// 定数・設定
// ==========================================
const SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
const RANKS = ['3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace', '2'];
const JOKER = 'black_joker';
const RED_JOKER = 'red_joker';
const RANKINGS = ['大富豪', '富豪', '貧民', '大貧民'];

let CHARACTERS = {};

const CLASS_2_1 = [
    "miriya", "hitori", "ketsui", "ameri", "shogo", "yuko", "akira", "tomoki",
    "wataru", "zakuro", "kotori", "mikina", "iseri", "maria", "migiwa", "ryogo", "jiha", "rei"
];
const CLASS_2_2 = [
    "yae", "akari", "enishi", "matoi", "suzu", "arin", "yasashi", "rui",
    "makishi", "shige", "hakomo", "shizuka", "mirin", "yuzu", "shinon", "hikari", "kozue", "yamato"
];

// トリプルイベント定義（省略せず記述）
const TRIANGLE_EVENTS = [
  {
    "id": "migiwa_ketsui_ryogo",
    "characters": ["migiwa", "ketsui", "ryogo"],
    "lines": {
      "start": {
        "migiwa": [
          "ちょ、二人してウチの相手すんの！？水兵部三つ巴バトルじゃな！！",
          "けついもりょうごも本気顔しとるけど…ウチが一番に上がるけぇ覚悟しとき！！",
          "水兵部の誇り…今日はウチが守ったるけぇな！！",
          "けついとりょうご、どっちも落とすつもりじゃけぇ覚悟しとき！？"
        ],
        "ketsui": [
          "ほいほい…水兵部三人揃うとかエモいのぉ。船長として負けられんわ。",
          "みぎわもりょうごも、ええ顔しとるの。ほうじゃけぇワシも燃えるんよ。",
          "水兵部の威信かけて…全力でやらせてもらうで。"
        ],
        "ryogo": [
          "水兵部三人か…データ上、この組み合わせは接戦になる確率が高いな。",
          "けついの直感とみぎわの勢い…両方同時は情報量多いけど、勝ち筋は見えてる。",
          "水兵部として…負けられない戦いだ。"
        ]
      },

      "think": {
        "migiwa": [
          "んー…二人の動き読みづらいんよ…でもウチの勢いで押し切ったる！",
          "けついとりょうご、どっちも油断ならんけぇ…慎重にいかな…。",
          "水兵部の仲間じゃけど…今は敵じゃけぇな…ふふん！",
          "……なんなん、二人して余裕そうな顔しとるけど！？ウチも負けんけぇな！！",
        ],
        "ketsui": [
          "みぎわの勢いとりょうごの読み…両方警戒せなアカンのぉ。",
          "二人の動き見とったら…こっちの手が読めるかもしれんわ。",
          "船長として…ここは慎重にいくで。",
          "ほいほい……二人とも、ええ顔して勝負しよるの。船長としては負けられんのぉ。",
          "みぎわもりょうごも、調子ええみたいじゃの。ほうじゃけぇ余計燃えるんよ、ワシは。"
        ],
        "ryogo": [
          "二人の手札…まだ読み切れてない。もう少し情報が必要だ。",
          "けついの直感ムーブとみぎわの勢い任せ…対照的すぎて予測が難しい。",
          "水兵部三人…それぞれのクセは把握してる。あとはタイミングだ。",
          "……なるほど。二人とも動きが極端だな……慎重に読むしかない。",
          "けついとみぎわが同時に来ると、情報量が多すぎる……でも勝てる筋はある。",
          "けつい、その直感ムーブ……読めるようで読めないんだよな。油断しないでおくよ。",
          "みぎわ、勢いが上がると判断変わるんだよね……その波形、僕には追えるよ。",
        ]
      },
      "play": {
        "migiwa": [
          "ほれっ！ウチの一手じゃ！二人とも止められんじゃろ！？",
          "水兵部の勢い、見せたるけぇ！！",
          "けついもりょうごも…この手は読めんかったじゃろ！？ふふん！"
        ],
        "ketsui": [
          "ほいじゃあ…船長の一手、見せたるで。",
          "みぎわもりょうごも…ワシの動き、読めとるか？",
          "水兵部の船長として…ここは譲れんのぉ。"
        ],
        "ryogo": [
          "計算通り…この手が最適解だ。",
          "二人の動き…予測範囲内。僕の勝ち筋は崩れてない。",
          "水兵部の知識担当として…ここは確実にいく。"
        ]
      },
      "pressure": {
        "migiwa": [
          "ほれっ！ウチの強いやつじゃ！二人とも耐えられる！？",
          "水兵部の勢い…見せたるけぇな！！",
          "けついもりょうごも…このプレッシャー、受け止めてみぃ！！"
        ],
        "ketsui": [
          "ほいじゃあ…船長の本気、見せたるで。",
          "みぎわもりょうごも…ワシの攻め、止められるか？",
          "水兵部の船長として…ここは強気でいくで。",
          "りょうご、分析顔しとらんで攻めてこんの？ワシだけ一人で踊らされるのはごめんじゃけぇな。",
          "お前の読みは精度高いけぇ……先に潰しとく方が早いかもしれんのぉ。",
          "みぎわ、その勢いは理解しとるけどの……ワシを抜ける思うなよ？",
          "副部長、あんまムキになったら手の内見えるで。ワシはそこ突くけぇ覚悟しとき。"
        ],
        "ryogo": [
          "計算上、この手が最も効果的だ。二人とも…耐えられるかな？",
          "けついとみぎわ…この圧、受け止めてもらうよ。",
          "水兵部の分析力…今ここで発揮する。"
        ]
      },
      "antiPressure": {
        "migiwa": [
          "ちょ、二人してウチにプレッシャーかけんでよ！？…でも負けんけぇ！！",
          "強いの来たけど…ウチの勢いは止まらんけぇな！！",
          "けついもりょうごも本気出しすぎじゃろ！？…ウチも本気出したる！！",
          "ちょ、二人してウチの進路塞がんでよ！？ほんま勝負する気満々じゃな！",
          "けついもりょうごも、そっちの動き読んどるけぇな！ウチから逃げられんよ！？",
          "ちょ、二人してウチの進路塞がんでよ！？あんたら相手なら全力出さなしゃーないわ！",
          "けついもりょうごも、好き勝手動くけど……ウチが場の空気ひっくり返したるけぇ！！"
        ],
        "ketsui": [
          "おいおい…二人して本気出すとか反則じゃろ？まぁええけぇ、受けて立つで。",
          "みぎわもりょうごも…ええ攻めしよるの。船長として負けられんわ。",
          "こりゃあ手加減しとったら沈むわ…全力でいくで。",
          "おいおい……二人がそろって攻めるとか反則じゃろ。まぁええけぇ受けて立つで。",
          "みぎわもりょうごも、ええ動きしよるの……こりゃあ油断できんわ。",
          "おいおい……二人が揃って本気出すとか反則じゃろ？まぁええけぇ、全部受けて立つで。",
          "こりゃあ手加減しとったら沈むわ……二人して船長狙いとは、ようやるのぉ。"
        ],
        "ryogo": [
          "二人同時に強い手…さすがに厳しいな。でも諦めない。",
          "けついの直感とみぎわの勢い…その衝突点こそ僕の入り込む余地だ。",
          "プレッシャーは感じるけど…まだ勝ち筋は消えてない。",
          "二人同時は情報量多すぎなんだけど……勝ち筋はまだ見えてる。",
          "直感と勢いで挟まれるのはキツいな……でも僕も引く気はないよ。",
          "二人同時はさすがに厳しいけど……逆に言えば、どちらか一人崩せれば流れは作れる。",
          "けついの直感とみぎわの勢い……その衝突点こそ僕の入り込む余地だ。勝ち筋はまだ消えてない。",
          "船長、君が攻める時のクセ……今日は見逃さないから。",
          "その強気、嫌いじゃない。ただ、隙は……確かにある。僕が拾う。"
        ]
      },

      "win": {
        "migiwa": [
          "水兵部の誇り…ウチが守ったで！！",
          "ほれ見ぃ！ウチの勢いは本物じゃったろ！？二人とも次は頑張りぃや！！"
        ],
        "ketsui": [
          "ほいほい…船長の勝ちじゃの。みぎわもりょうごも、ようやったで。",
          "水兵部の船長として…当然の結果じゃの。ふふん。",
          "二人とも強かったけぇ…ワシも本気出さなアカンかったわ。ええ勝負じゃったで。"
        ],
        "ryogo": [
          "勝てた…計算通りだ。けついとみぎわ…強敵だったよ。",
          "水兵部の知識担当として…面目を保てた。",
          "二人の動き…最終的には読み切れた。データの勝利だ。"
        ]
      },

      "lose": {
        "migiwa": [
          "うぅ…負けたぁ…。けついかりょうごが勝ったんか…悔しいわ…！！",
          "水兵部の誇り…守れんかった…次は絶対勝つけぇな！！",
          "ちくしょー！！二人とも強すぎじゃろ！？…でも次は負けんけぇ！！"
        ],
        "ketsui": [
          "やられたのぉ…。みぎわかりょうごが勝ったんか…船長として不甲斐ないわ。",
          "水兵部の船長が負けるとか…悔しいけぇ、次は絶対勝つで。",
          "ほぅ…やるのぉ。次はワシが本気出させてもらうけぇな。"
        ],
        "ryogo": [
          "負けた…計算ミスか。けついかみぎわが勝ったんだな…認めるよ。",
          "水兵部として…負けられない戦いだったのに…次は修正する。",
          "データ上では勝てるはずだったんだけど…二人の動きが予測を超えてたな。"
        ]
      },

      "rank1": {
        "migiwa": [
          "大富豪じゃ！！水兵部の副部長の実力見せたったで！！",
          "けついもりょうごも…ウチの勢いには勝てんかったじゃろ！？ふふん！！",
          "水兵部三人の中で一番！！誇らしいわ〜💕"
        ],
        "ketsui": [
          "大富豪じゃの。船長として当然の結果じゃわ。",
          "みぎわもりょうごも…まだまだ修行が足りんのぉ。ふふん。",
          "水兵部の船長の貫禄…見せたったで。"
        ],
        "ryogo": [
          "大富豪…計算が完璧だった証拠だ。",
          "けついとみぎわ…君たちの動き、全て読み切った。",
          "水兵部の分析力…今日は冴えてたな。"
        ]
      },

      "rank2": {
        "migiwa": [
          "富豪か…惜しかったわ！けついかりょうごが大富豪取ったんか…！",
          "二位…悔しいけど、水兵部三人で上位独占はええ感じじゃな！",
          "次は絶対大富豪取るけぇな！！"
        ],
        "ketsui": [
          "富豪じゃの。惜しかったわ…みぎわかりょうごが大富豪か。",
          "二位…船長としては不本意じゃけど、水兵部が上位なんはええことじゃの。",
          "次は絶対一位取るで。"
        ],
        "ryogo": [
          "富豪…計算が甘かったな。けついかみぎわが大富豪か。",
          "二位…悔しいけど、水兵部の面目は保てた。",
          "次は修正して大富豪を取る。"
        ]
      }
    }
  },
 {
    "id": "rei_akira_tomoki",
    "characters": ["rei", "akira", "tomoki"],
    "lines": {
      "start": {
        "rei": [
          "わあ、あきらくんとともきくんと一緒だ〜。学年トップ3の対決ね！楽しみよ🍅",
          "二人とも本気の顔してるわね！私も負けないわよ〜頑張ろう。",
          "成績トップ3が揃うとか…なんだか燃えてきちゃった。",
          "……なるほど。学年トップ3が揃ったわけね。",
          "ここまで条件が揃うと、むしろ静かに燃えるわ。",
          "手加減はしないわよ。完璧な試合運びをするだけ。",
          "終わったらケチャップ補給したいところね。頭を使うから。"
        ],
        "akira": [
          "ふん…れいとともきか。学年トップ3の対決とは面白い。",
          "1位と2位か…オレが今日ここで順位をひっくり返してやる。",
          "見下されるのは嫌いだ。今日はオレの実力を見せつける。",
          "ふん……1位と2位が揃うとはな。",
          "上から見下ろされるのは嫌いだ。今日は覆す。",
          "順位は数字だ。だが意味は結果で示す。",
          "この場で、オレが証明する。"
        ],
        "tomoki": [
          "れいとあきらか。学年トップ3の勝負…面白くなりそうだな。",
          "こびるつもりはない。実力で勝負させてもらう。",
          "二人とも強敵だが…オレが勝つ。",
          "トップ3が揃ったか。条件としては十分だな。",
          "情は要らない。実力だけで決まる。",
          "二人とも強敵だが、譲る理由はない。",
          "淡々と、勝ちに行く。"
        ]
      },
      "think": {
        "rei": [
          "んー…二人とも頭いいから油断できないな。慎重にいかないと…。",
          "あきらくんの負けず嫌いとともきくんの冷静さ…両方警戒しないと。",
          "トップ3の戦い…頭脳戦ね",
          "あきらは一点突破、ともきは全体制御……役割がはっきりしてるわ。",
          "二人とも隙が少ない。でも、完全ではない。",
          "正解を積むだけじゃ足りないわね。勝ち筋を作る。",
          "ケチャップ足りてる。思考も回る。"
        ],
        "akira": [
          "れいの1位は伊達じゃない…ともきの2位も侮れない…。",
          "二人の動きを読まないと…オレが負けるわけにはいかない。",
          "見下されたくない…ここで勝って見返してやる。",
          "れいは全体最適、ともきは冷静な分析……両方厄介だな。",
          "れいは全体を、ともきは安定を見ている……なら俺は速度だ。",
          "正攻法だけじゃ届かない。踏み込む。",
          "ここで引いたら、また下だ。",
          "一瞬の判断で差を作る。"
        ],
        "tomoki": [
          "れいの頭の回転とあきらの執念…両方厄介だな。",
          "冷静に…感情に流されず、最適解を選ぶ。",
          "リーダーとして…ここは負けられない。",
          "三者三様……だからこそ読み合いになる。",
          "れいは完成度、あきらは突破力。",
          "両方を抑えながら前に出る。",
          "最終的に盤面を制するのは誰かだ。"
        ]
      },

      "play": {
        "rei": [
          "はい、これで。 二人とも、ついてこれるかしら？",
          "学年1位の実力、見せちゃうわね。",
          "あきらくんもともきくんも…この手は読めなかったでしょ？",
          "想定通りね。この流れなら問題ないわ。",
          "焦らなくていい。一手ずつ積むだけ。",
          "ここは私が出る番ね。"
        ],
        "akira": [
          "オレの一手だ。れいもともきも…この手に対応できるか？",
          "3位だからって舐めるな。オレの実力はこんなもんじゃない。",
          "見せつけてやる…オレの天才的な一手をな。",
          "ここだ。迷わない。",
          "強気で行く。それだけだ。",
          "この一手で流れを変える。"
        ],
        "tomoki": [
          "これがオレの最適解だ。二人とも、見ておけ。",
          "リーダーとして…ここは確実にいく。",
          "れいもあきらも…オレの判断力は侮れないぞ。",
          "結果は受け入れる。",
          "判断が一歩遅かったな。",
          "修正すればいい。"
        ]
      },

      "pressure": {
        "rei": [
          "はい、強めに攻めちゃうわね。二人とも耐えられるかしら？",
          "学年1位の本気…見せちゃうわよ",
          "あきらくんもともきくんも…このプレッシャー、受け止めてね。",
          "ここで一段、圧をかけるわ。",
          "二人とも、対応できるかしら？",
          "優等生の範囲？……いいえ、ここからよ。"
        ],
        "akira": [
          "オレの本気だ。れいもともきも…この圧に耐えられるか？",
          "見下すな。オレの実力はこんなもんじゃない！",
          "ここで一気に攻める…二人とも、覚悟しろ。",
        ],
        "tomoki": [
          "ここが勝負所だ。二人とも…オレの判断力を甘く見るな。",
          "リーダーとして…強気で攻める。",
          "れいもあきらも…この手に対応できるか？",
          "ここで踏み込む。",
          "遅れるな。",
          "主導権は渡さない。"
        ]
      },
      "antiPressure": {
        "rei": [
          "うわっ…二人とも強い手出してくるわね。でも負けないわよ",
          "さすがトップ3…プレッシャーすごいけど、私も頑張る！",
          "あきらくんもともきくんも本気だね…私も本気出さないと！",

        ],
        "akira": [
          "ちっ…二人とも本気で来やがる。だが…オレが負けるわけにはいかない。",
          "れいとともきが同時に攻めてくるとは…厄介だが、諦めない。",
          "見下されたくない…ここで耐えて逆転してやる！",
          "退かない。ここが勝負だ。",
          "圧なら受けて立つ。",
          "簡単には折れない。"
        ],
        "tomoki": [

          "二人同時は厳しいな…だが、オレは冷静に対処する。",
          "れいの頭脳とあきらの執念…両方相手にするのは骨が折れるが、負けない。",
          "リーダーとして…ここで崩れるわけにはいかない。",
        ]
      },
      "win": {
        "rei": [
          "学年1位の面目を保てたかな？あきらくんもともきくんもお疲れ様✨",
          "トップ3の戦い…楽しかった！また勝負しようね🔥",
        ],
        "akira": [
          "次は絶対一位を取る…見ておけ。",
        ],
        "tomoki": [
          "リーダーとして…面目を保てた。",
          "学年2位の実力…今日は証明できたな。",
          "勝ちだ。",
          "最も安定した選択を積んだ結果だな。",
          "満足はしないが、悪くない。"
        ]
      },
      "lose": {
        "rei": [
          "あれ…負けちゃった… あきらくんかともきくんが勝ったんだね…悔しいな",
          "学年1位なのに…負けちゃった…次は頑張るね！",
          "二人とも強かった〜！次は絶対勝つからね！",
          "……今回は負けね。でも悪くない試合だったわ。",
          "次はもっと精度を上げるだけ。",
          "ケチャップ、ちょっと濃くしすぎたかしら。"
        ],
        "akira": [
          "くっ…負けた…！れいかともきが勝ったのか…見下されたくないのに…！",
          "ちくしょう…！次は絶対勝つ…！オレの実力はこんなもんじゃない！",
          "負けた…悔しい…！次は必ず見返してやる…！",
          "……くそ、届かなかったか。",
          "だが覚えた。この展開。",
          "次は俺が取る。"
        ],
        "tomoki": [
          "負けたか…れいかあきらが勝ったんだな。認めるよ。",
          "学年2位として…負けられない戦いだったんだが…次は勝つ。",
          "悔しいが…今日は二人の方が上だった。次は修正する。",
          "結果は受け入れる。",
          "判断が一歩遅かったな。",
          "修正すればいい。"
        ]
      },
      "rank1": {
        "rei": [
          "やった〜！勝てた！二人とも強かったけど、私が1位だったわね🍅",
          "大富豪〜！ やっぱり学年1位は伊達じゃないわよね！",
          "あきらくんもともきくんも…今日は私の勝ちね！またやろうね〜",
          "トップ3の頂点に立てた…嬉しいわ！",
          "……終わりね。計画通り。",
          "これが一位の運び方よ。",
          "ふふ、勝利の後のケチャップは格別だわ。"
        ],
        "akira": [
          "大富豪だ…！れいとともきに勝った…！これがオレの実力だ！",
          "学年3位だが…今日はオレが頂点だ。見下すなよ。",
          "ふん…当然の結果だ。オレの天才性は証明された。",
          "よし……やっと届いた。",
          "順位は塗り替えられる。",
          "これで証明できた。",
          "ふん…当然の結果だ。オレの天才性を証明できた。",
          "勝った…！れいとともきに勝てた…！見たか、これがオレの実力だ！",
          "学年3位だが…今日はオレが一番だ。見下すなよ。"
        ],
        "tomoki": [
          "大富豪か。れいとあきら…今日はオレの勝ちだな。",
          "リーダーとして…トップ3の頂点に立てた。",
          "学年2位だが…今日はオレが一番だ。",
          "勝てた。れいとあきら…強敵だったが、オレが上だった。",
        ]
      },

      "rank2": {
        "rei": [
          "富豪か〜惜しかった…",
          "二位…悔しいけど、トップ3で上位独占は嬉しいわ！",
          "次は絶対大富豪取るからね！",
        ],
        "akira": [
          "富豪…惜しかった…！",
          "二位…悔しいが、トップ3の戦いとしては悪くない。",
          "次は絶対一位を取る…見ておけ。",
        ],
        "tomoki": [
          "富豪か。惜しかったな。",
          "二位…リーダーとしては不本意だが、次は修正する。",
          "次は絶対一位を取る。",
        ]
      },

      "drop": {
        "rei": [
          "えっ都落ち！？嘘でしょ… 学年1位なのに…恥ずかしい",
          "あきらくんもともきくんも…今日は調子悪かったの…次は勝つからね！",
          "都落ち…メンタルやられるけど、次は巻き返すわよ！",
        ],
        "akira": [
          "都落ち…！ふざけるな…！見下されたくないのに…！",
          "くっ…れいとともきに見下される…！次は絶対勝つ…！",
          "都落ち…屈辱だ…！次は必ず這い上がってやる…！",
        ],
        "tomoki": [
          "都落ちか…れいとあきらに負けたのは悔しいな。",
          "リーダーとして…都落ちは恥ずかしいが、次は修正する。",
          "都落ち…次は絶対上がる。",
        ]
      },

      "tributeGive": {
        "rei": [
          "はい、これあげるわ！ 強いカードだから大切に使ってね🍅",
          "献上…悔しいけどルールだからね。次は私が大富豪になるから！",
          "強いカードだから渡すの…悔しいな…",
        ],
        "akira": [
          "くっ…強いカードを渡すのか…見下されてる気分だ…。",
          "献上…屈辱だが、ルールだから仕方ない。次は必ず逆転する。",
          "れいかともきに渡すのは悔しいが…受け取れ。"
        ],
        "tomoki": [
          "献上か。れいかあきらに渡すのは悔しいが、ルールだ。",
          "強いカードを渡す…次は自分が大富豪になる。",
          "献上…リーダーとして悔しいが、次は勝つ。",
        ]
      },

      "tributeReceive": {
        "rei": [
          "ありがとう〜🍅 強いカードもらっちゃった！ 大切に使うわね！",
          "献上されるって…やっぱり学年1位の特権ね🍅",
        ],
        "akira": [
          "献上か…当然だ。オレが大富豪になるのは必然だからな。",
          "強いカードを受け取る…これでさらに優位に立てる。",
          "ふん…見下されないように、この勝ちを確実にする。",
        ],
        "tomoki": [
          "献上ありがとう。このカードで勝ちを確実にする。",
          "大富豪として…当然の権利だ。",
        ]
      }
    }
  }
];

let gameState = {
    players: [],
    currentPlayerIndex: 0,
    lastPlayIndex: -1,
    field: [],
    deck: [],
    playerName: '',
    playerAvatar: null,
    selectedCards: [],
    revolution: false,
    selectedCharacters: [],
    finishedPlayers: [],
    round: 1,
    prevRanks: {},
    isSpectator: false,
    isProcessing: false,
    isGameEnded: false,
    isSkipping: false,
    isExchanging: false 
};

// キャラ選択用変数
let tempSelectedCharacters = [];
let isSelectingForSpectator = false;

// ==========================================
// DOM要素
// ==========================================
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name');
const playerImageInput = document.getElementById('player-image');
const startGameButton = document.getElementById('start-game');
const showRulesButton = document.getElementById('show-rules');
const rulesModal = document.getElementById('rules-modal');
const closeModal = document.getElementsByClassName('close')[0];
const fieldElement = document.getElementById('field');
const playersElement = document.getElementById('players');
const playerHandElement = document.getElementById('player-hand');
const playButton = document.getElementById('play-button');
const passButton = document.getElementById('pass-button');
const gameNotification = document.getElementById('game-notification');
const selectionStatus = document.getElementById('selection-status');

const characterModal = document.getElementById('character-modal');
const closeCharacterModal = document.getElementById('close-character-modal');
const characterGrid = document.getElementById('character-grid');
const selectedCharactersList = document.getElementById('selected-characters-list');
const confirmSelectionBtn = document.getElementById('confirm-selection');

const characterPortrait = document.getElementById('character-portrait');
const characterName = document.getElementById('character-name');
const characterMbti = document.getElementById('character-mbti');
const characterEnneagram = document.getElementById('character-enneagram');
const characterSocionics = document.getElementById('character-socionics');
const characterDescription = document.getElementById('character-description');

const resultModal = document.getElementById('result-modal');
const resultList = document.getElementById('result-list');
const nextRoundButton = document.getElementById('next-round-button');
const titleButton = document.getElementById('title-button');

const selectCharactersBtn = document.getElementById('select-characters-btn');
const spectatorModeBtn = document.getElementById('spectator-mode-btn');
const jumpBtn = document.getElementById('modal-jump-btn');
const skipGameBtn = document.getElementById('skip-game-btn');

// ==========================================
// 初期化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadCharacterDefinitions();
    selectCharactersBtn.addEventListener('click', () => openCharacterModal(false));
    spectatorModeBtn.addEventListener('click', () => openCharacterModal(true));
    createDialogueElement(); // ★ここがエラーの原因でした！関数は下に定義してあるよ！

    if (skipGameBtn) {
        skipGameBtn.onclick = () => {
            gameState.isSkipping = true;
            skipGameBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 高速進行中...';
            skipGameBtn.disabled = true;
            if (!gameState.players[gameState.currentPlayerIndex].isHuman) {
                 aiTurn(); 
            }
        };
    }
});

if (playerImageInput) {
    playerImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                gameState.playerAvatar = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

function loadCharacterDefinitions() {
    if (typeof CHARACTER_LIST !== 'undefined') {
        CHARACTER_LIST.forEach(character => {
            CHARACTERS[character.id] = character;
        });
        console.log("Characters loaded:", Object.keys(CHARACTERS).length);
    }
}

function preloadCharacterImages() {
    if (document.getElementById('preload-container')) return;
    const preloadContainer = document.createElement('div');
    preloadContainer.id = 'preload-container';
    preloadContainer.style.position = 'absolute';
    preloadContainer.style.width = '1px';
    preloadContainer.style.height = '1px';
    preloadContainer.style.overflow = 'hidden';
    preloadContainer.style.opacity = '0';
    preloadContainer.style.top = '-9999px';
    preloadContainer.style.left = '-9999px';
    document.body.appendChild(preloadContainer);

    const situations = ['start', 'win', 'lose', 'pressure', 'think', 'play', 'pass', 'revolution', 'joker', 'pair', 'stairs', 'single'];
    Object.values(CHARACTERS).forEach(char => {
        if (!char.portrait) return;
        const img = document.createElement('img');
        img.src = char.portrait;
        preloadContainer.appendChild(img);
        situations.forEach(sit => {
            const vImg = document.createElement('img');
            vImg.src = char.portrait.replace('.png', `_${sit}.png`);
            preloadContainer.appendChild(vImg);
        });
    });
    console.log("Images forced preloaded into DOM.");
}

// ==========================================
// キャラ選択
// ==========================================
if (jumpBtn) {
    jumpBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const modalContent = document.querySelector('.character-modal-content');
        if (modalContent) {
            modalContent.scrollTo({
                top: modalContent.scrollHeight,
                behavior: 'smooth'
            });
        }
    };
}

function openCharacterModal(isSpectator) {
    isSelectingForSpectator = isSpectator;
    tempSelectedCharacters = [...gameState.selectedCharacters];

    const title = characterModal.querySelector('h2');
    if (title) title.textContent = isSpectator ? "観戦する4人を選択（最初は手前）" : "対戦相手を3人選択";

    characterModal.style.display = 'block';
    renderCharacterGrid();
    updateModalSelectionDisplay();

    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    if (jumpBtn) jumpBtn.style.display = 'flex';

    const firstId = Object.keys(CHARACTERS)[0];
    if (firstId) showCharacterDetails(CHARACTERS[firstId]);
}

function closeCharacterModalFunc() {
    characterModal.style.display = 'none';
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    if (jumpBtn) jumpBtn.style.display = 'none';
}

closeCharacterModal.onclick = closeCharacterModalFunc;
window.onclick = (e) => { 
    if (e.target === rulesModal) rulesModal.style.display = 'none';
};

function renderCharacterGrid() {
    characterGrid.innerHTML = '';
    const createSection = (title, ids) => {
        if (ids.length === 0) return;
        const header = document.createElement('h3');
        header.textContent = title;
        header.style.width = '100%';
        header.style.marginTop = '20px';
        header.style.borderBottom = '2px solid #ddd';
        characterGrid.appendChild(header);

        const gridContainer = document.createElement('div');
        gridContainer.className = 'character-section-grid';

        ids.forEach(id => {
            const charData = CHARACTERS[id];
            if (!charData) return;
            const card = document.createElement('div');
            card.className = 'character-card';
            if (tempSelectedCharacters.includes(id)) card.classList.add('selected');

            const fullPath = charData.portrait || '';
            const fileNameOnly = fullPath.split('/').pop();
            const imgTag = `<img src="${fullPath}" alt="${charData.name}" onerror="this.onerror=null; this.src='${fileNameOnly}'; this.style.display='none'; this.nextElementSibling.style.display='flex'">`;
            const fallbackAvatar = `<div class="fallback-avatar" style="width:80px;height:80px;border-radius:50%;background:#eee;display:none;margin:0 auto 10px;line-height:80px;font-size:30px;color:#aaa;align-items:center;justify-content:center;">${charData.name.charAt(0)}</div>`;

            card.innerHTML = `${imgTag}${fallbackAvatar}<div style="font-weight:bold;">${charData.name}</div><div style="font-size:0.8em;color:#666;">${charData.MBTI}</div>`;

            card.onclick = () => {
                toggleCharacterSelection(id, card);
                showCharacterDetails(charData);
            };

            gridContainer.appendChild(card);
        });
        characterGrid.appendChild(gridContainer);
    };
    createSection('2年1組', CLASS_2_1);
    createSection('2年2組', CLASS_2_2);
}

function toggleCharacterSelection(id, cardElement) {
    const index = tempSelectedCharacters.indexOf(id);
    const limit = isSelectingForSpectator ? 4 : 3;

    if (index === -1) {
        if (tempSelectedCharacters.length >= limit) {
            alert(`選択できるのは最大${limit}人までです。`);
            return;
        }
        tempSelectedCharacters.push(id);
        cardElement.classList.add('selected');
    } else {
        tempSelectedCharacters.splice(index, 1);
        cardElement.classList.remove('selected');
    }
    updateModalSelectionDisplay();
}

function updateModalSelectionDisplay() {
    selectedCharactersList.innerHTML = '';
    const required = isSelectingForSpectator ? 4 : 1;

    if (tempSelectedCharacters.length < required) {
        confirmSelectionBtn.disabled = true;
    } else {
        confirmSelectionBtn.disabled = false;
    }
    confirmSelectionBtn.textContent = `この${tempSelectedCharacters.length}人で決定`;

    tempSelectedCharacters.forEach(id => {
        const char = CHARACTERS[id];
        const tag = document.createElement('div');
        tag.className = 'selected-character';
        tag.innerHTML = `${char.name} <span class="remove-character" onclick="removeTempCharacter('${id}')">×</span>`;
        selectedCharactersList.appendChild(tag);
    });
}

window.removeTempCharacter = function(id) {
    const index = tempSelectedCharacters.indexOf(id);
    if (index > -1) {
        tempSelectedCharacters.splice(index, 1);
        renderCharacterGrid();
        updateModalSelectionDisplay();
    }
};

function showCharacterDetails(char) {
    characterName.textContent = char.name;
    const gender = char.gender ? ` (${char.gender})` : "";
    characterMbti.textContent = `MBTI: ${char.MBTI}${gender}`;
    characterEnneagram.textContent = `エニアグラム: ${char.enneagram}`;
    characterDescription.textContent = char.profile || "詳細情報なし";

    if (char.socionics) {
        characterSocionics.textContent = `ソシオニクス: ${char.socionics}`;
        characterSocionics.style.display = 'block';
    } else {
        characterSocionics.style.display = 'none';
    }

    const fullPath = char.portrait || '';
    const fileNameOnly = fullPath.split('/').pop();
    characterPortrait.src = fullPath;
    characterPortrait.onerror = function() { this.src = fileNameOnly; };
    characterPortrait.style.display = 'inline-block';
}

confirmSelectionBtn.onclick = () => {
    gameState.selectedCharacters = [...tempSelectedCharacters];
    gameState.isSpectator = isSelectingForSpectator;

    const names = gameState.selectedCharacters.map(id => CHARACTERS[id].name).join('、');
    const modeName = gameState.isSpectator ? "【観戦モード】" : "【通常モード】";
    selectionStatus.textContent = `${modeName} 参加者: ${names}`;
    selectionStatus.style.color = "#333";
    selectionStatus.style.fontWeight = "bold";
    closeCharacterModalFunc();
};

// ==========================================
// ゲーム開始処理
// ==========================================
showRulesButton.onclick = () => rulesModal.style.display = 'block';
closeModal.onclick = () => rulesModal.style.display = 'none';

startGameButton.addEventListener('click', () => {
    const required = gameState.isSpectator ? 4 : 1;
    if (gameState.selectedCharacters.length < required) {
        showNotification(gameState.isSpectator ? '観戦モードは4人選んでください' : '対戦相手を選んでください');
        return;
    }
    startGame();
});

function startGame() {
    gameState.players = [];
    gameState.field = [];
    gameState.revolution = false;
    gameState.finishedPlayers = [];
    gameState.lastPlayIndex = -1;
    gameState.round = 1;
    gameState.prevRanks = {};
    gameState.isProcessing = false;
    gameState.isGameEnded = false;

    setupPlayers();
    preloadCharacterImages();
    startBgm();
    startRound();
}

function setupPlayers() {
    if (gameState.isSpectator) {
        gameState.selectedCharacters.forEach((charId, index) => {
            const charData = CHARACTERS[charId];
            gameState.players.push({
                id: charId,
                name: charData.name,
                isHuman: false,
                hand: [],
                character: charId,
                rank: null,
                isSpectatorSeat: (index === 0)
            });
        });
        gameState.playerName = "観戦中";
    } else {
        gameState.playerName = playerNameInput.value || "あなた";
        gameState.players.push({
            id: 'player',
            name: gameState.playerName,
            isHuman: true,
            hand: [],
            rank: null,
            portrait: gameState.playerAvatar,
            character: 'player'
        });

        gameState.selectedCharacters.forEach((charId) => {
            const charData = CHARACTERS[charId];
            gameState.players.push({
                id: charId,
                name: charData.name,
                isHuman: false,
                hand: [],
                character: charId,
                rank: null
            });
        });
    }
}

function startRound() {
    gameState.field = [];
    gameState.revolution = false;
    gameState.finishedPlayers = [];
    gameState.lastPlayIndex = -1;
    gameState.isProcessing = false;
    gameState.isTalking = false;
    gameState.isGameEnded = false;
    gameState.isSkipping = false;
    gameState.activeTriangleEvent = null; 
    gameState.isExchanging = false;
    if(skipGameBtn) skipGameBtn.style.display = 'none';

    gameState.players.forEach(p => {
        p.hand = [];
        p.rank = null;
    });

    setupScreen.style.display = 'none';
    resultModal.style.display = 'none';
    gameScreen.style.display = 'block';

    createDialogueElement(); // 念の為ここでも呼ぶ
    initDeck();
    updateGameDisplay();

    if (gameState.round > 1) {
        // 2回戦目以降は「交換中」フラグを立ててロックする！
        gameState.isExchanging = true; 
        updateGameDisplay(); // 手札は見せるけど、操作はさせない
        setTimeout(performCardExchange, 1500);
    } else {
        // 1回戦目は通常通り
        updateGameDisplay();
        showNotification(`第${gameState.round}回戦 スタート！`);
        if (!checkTriangleEvents()) {
            playStartVoices();
        }
    }
}

function initDeck() {
    gameState.deck = [];
    SUITS.forEach(suit => {
        RANKS.forEach(rank => gameState.deck.push(`${rank}_of_${suit}`));
    });
    gameState.deck.push(JOKER, RED_JOKER);

    for (let i = gameState.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.deck[i], gameState.deck[j]] = [gameState.deck[j], gameState.deck[i]];
    }

    let playerIdx = 0;
    while (gameState.deck.length > 0) {
        gameState.players[playerIdx].hand.push(gameState.deck.pop());
        playerIdx = (playerIdx + 1) % gameState.players.length;
    }

    gameState.players.forEach(p => sortHand(p.hand));

    if (gameState.round > 1) {
        const daihinmin = gameState.players.find(p => gameState.prevRanks[p.id] === 3);
        gameState.currentPlayerIndex = daihinmin ? gameState.players.indexOf(daihinmin) : 0;
    } else {
        gameState.currentPlayerIndex = 0;
    }
}

function checkTriangleEvents() {
    if (gameState.round > 1) return false;
    const participantIds = gameState.players.map(p => p.character);

    for (const event of TRIANGLE_EVENTS) {
        const isMatch = event.characters.every(charId => participantIds.includes(charId));
        if (isMatch && Math.random() < 0.4) {
            gameState.activeTriangleEvent = event;
            gameState.isTalking = true;
            let delay = 500;
            const lines = event.lines.start;
            const charIds = Object.keys(lines);

            charIds.forEach((charId, index) => {
                const charData = CHARACTERS[charId];
                const text = lines[charId][Math.floor(Math.random() * lines[charId].length)];
                setTimeout(() => {
                    showDialogue(charData.name, text, charId, 'start');
                    if (index === charIds.length - 1) {
                        setTimeout(() => {
                            gameState.isTalking = false;
                            updateGameDisplay();
                        }, 4000);
                    }
                }, delay);
                delay += 4500;
            });
            return true;
        }
    }
    return false;
}

// ==========================================
// カード交換
// ==========================================
function performCardExchange() {
    gameState.isTalking = true;
    const playersByRank = {};
    
    gameState.players.forEach(p => {
        const r = gameState.prevRanks[p.id];
        if (r !== undefined) playersByRank[r] = p;
    });

    let timeline = 0;

    const processExchange = (winnerRank, loserRank, count) => {
        const winner = playersByRank[winnerRank];
        const loser = playersByRank[loserRank];
        if (!winner || !loser) return;

        sortHand(winner.hand);
        sortHand(loser.hand);

        const giveToLoser = winner.hand.slice(0, count);
        const giveToWinner = loser.hand.slice(loser.hand.length - count);

        exchangeCards(winner, loser, giveToLoser, giveToWinner);
        sortHand(winner.hand);
        sortHand(loser.hand);

        if (winner.isHuman) {
            const cardNames = giveToWinner.map(c => getCardNameJP(c)).join('」と「');
            setTimeout(() => {
                showNotification(`${loser.name}から「${cardNames}」を献上されました！`);
            }, timeline + 1000);
            timeline += 4000;
        } else if (loser.isHuman) {
            const cardNames = giveToWinner.map(c => getCardNameJP(c)).join('」と「');
            setTimeout(() => {
                showNotification(`${winner.name}に「${cardNames}」を没収されました…`);
            }, timeline + 1000);
            timeline += 4000;
        }

        if (!winner.isHuman) {
            setTimeout(() => {
                const char = CHARACTERS[winner.character];
                showDialogue(winner.name, getRandomDialogue(char, 'tributeReceive', winner), winner.character, 'win');
            }, timeline);
            timeline += 3000;
        }
        if (!loser.isHuman) {
            setTimeout(() => {
                const char = CHARACTERS[loser.character];
                showDialogue(loser.name, getRandomDialogue(char, 'tributeGive', loser), loser.character, 'lose');
            }, timeline);
            timeline += 3000;
        }
    };

    updateGameDisplay();
    processExchange(0, 3, 2);
    processExchange(1, 2, 1);

    setTimeout(() => {
        showNotification("都落ち/カード交換が行われました");
        
        setTimeout(() => {
             gameState.isTalking = false;
             
             // ★ここ追加！ロック解除してゲーム開始！
             gameState.isExchanging = false; 
             
             playStartVoices(); 
             showNotification(`第${gameState.round}回戦 スタート！`);
             
             // ★重要！ここで改めて画面更新を呼ぶことで、AIやプレイヤーのターンが始まる
             updateGameDisplay(); 

        }, 2500); // 通知を読んでから開始
        
    }, timeline + 1000);
}

function getCardNameJP(card) {
    if (card === JOKER) return "Joker";
    if (card === RED_JOKER) return "Joker";
    const rank = card.split('_of_')[0];
    const rankMap = {
        '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
        'jack': 'J', 'queen': 'Q', 'king': 'K', 'ace': 'A', '2': '2'
    };
    return rankMap[rank] || rank;
}

function exchangeCards(p1, p2, cardsFromP1, cardsFromP2) {
    cardsFromP1.forEach(c => {
        const idx = p1.hand.indexOf(c);
        if (idx > -1) p1.hand.splice(idx, 1);
    });
    cardsFromP2.forEach(c => {
        const idx = p2.hand.indexOf(c);
        if (idx > -1) p2.hand.splice(idx, 1);
    });
    p1.hand.push(...cardsFromP2);
    p2.hand.push(...cardsFromP1);
}

function getCardStrength(cardName) {
    if (cardName === JOKER || cardName === RED_JOKER) return 99;
    const rank = cardName.split('_of_')[0];
    let strength = RANKS.indexOf(rank);
    if (gameState.revolution) return 12 - strength;
    return strength;
}

function getRankValue(cardName) {
    if (cardName === JOKER || cardName === RED_JOKER) return 100;
    const rank = cardName.split('_of_')[0];
    const order = ['3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace', '2'];
    return order.indexOf(rank);
}

function getSuit(cardName) {
    if (cardName === JOKER || cardName === RED_JOKER) return 'joker';
    return cardName.split('_of_')[1];
}

function sortHand(hand) {
    hand.sort((a, b) => getCardStrength(a) - getCardStrength(b));
}

function playStartVoices() {
    gameState.isTalking = true;
    let delay = 500;
    let maxDelay = 0;
    gameState.players.forEach(p => {
        if (!p.isHuman) {
            setTimeout(() => {
                const char = CHARACTERS[p.character];
                showDialogue(p.name, getRandomDialogue(char, 'start', p), p.character, 'start');
            }, delay);
            delay += 4000;
            maxDelay = delay;
        }
    });
    setTimeout(() => {
        gameState.isTalking = false;
        updateGameDisplay();
    }, maxDelay);
}

// ==========================================
// ゲームロジック
// ==========================================
playButton.onclick = playSelectedCards;
passButton.onclick = playerPass;

function updateGameDisplay() {
    updateField();
    updatePlayers();
    updatePlayerHand();

    // ★ここ修正！「gameState.isExchanging」を追加して、交換中はここで処理を止める！
    if (gameState.isProcessing || gameState.isTalking || gameState.isGameEnded || gameState.isExchanging) return;

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const isHumanTurn = currentPlayer.isHuman;

    if (isHumanTurn) {
        document.getElementById('controls').style.display = 'block';
        playButton.disabled = false;
        passButton.disabled = false;
        checkFieldClear();
    } else {
        document.getElementById('controls').style.display = 'none';
        if (checkFieldClear()) {
            setTimeout(aiTurn, 1000);
        } else {
            setTimeout(aiTurn, 1000);
        }
    }
}

function checkFieldClear() {
    if (gameState.lastPlayIndex === gameState.currentPlayerIndex) {
        gameState.field = [];
        gameState.lastPlayIndex = -1;

        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        let msg = `${currentPlayer.name}が親番です`;
        if (currentPlayer.isHuman) {
            msg = "（あなた）が親番です";
        }
        showNotification(msg);
        updateField();
        return true;
    }

    if (gameState.lastPlayIndex !== -1 && gameState.finishedPlayers.includes(gameState.lastPlayIndex)) {
        if (gameState.field.length > 0) {
            gameState.field = [];
            gameState.lastPlayIndex = -1;

            const currentPlayer = gameState.players[gameState.currentPlayerIndex];
            let msg = `前の親が上がりのため、${currentPlayer.name}が親番です`;
            if (currentPlayer.isHuman) {
                msg = "前の親が上がりのため、親番です";
            }
            showNotification(msg);
            updateField();
            return true;
        }
    }
    return false;
}

function updateField() {
    fieldElement.innerHTML = '';
    if (gameState.field.length === 0) {
        fieldElement.innerHTML = '<div style="color:#888; text-align:center; width:100%;">場にカードはありません</div>';
        return;
    }
    const cardWidth = 110;
    const overlap = 30;
    const totalWidth = (gameState.field.length - 1) * overlap + cardWidth;
    const startX = (fieldElement.clientWidth - totalWidth) / 2;

    gameState.field.forEach((card, index) => {
        const el = document.createElement('div');
        el.className = 'card';
        el.style.backgroundImage = `url(cards/${card}.png)`;
        el.style.position = 'absolute';
        el.style.left = `${startX + index * overlap}px`;
        el.style.zIndex = index;
        fieldElement.appendChild(el);
    });
}

function updatePlayers() {
    playersElement.innerHTML = '';
    gameState.players.forEach((p, idx) => {
        if (p.isHuman || (gameState.isSpectator && idx === 0)) return;

        const div = document.createElement('div');
        div.className = 'player';

        if (!gameState.finishedPlayers.includes(idx) && idx === gameState.currentPlayerIndex) {
            div.style.border = "3px solid #ff6b6b";
            div.style.backgroundColor = "#fff0f0";
        }

        const char = CHARACTERS[p.character];
        const fullPath = char && char.portrait ? char.portrait : '';
        const fileNameOnly = fullPath.split('/').pop();
        const img = fullPath ?
            `<img src="${fullPath}" onerror="this.src='${fileNameOnly}'; this.onerror=null;" style="width:40px;height:40px;border-radius:50%;vertical-align:middle;margin-right:10px;">` :
            `<div style="width:40px;height:40px;border-radius:50%;background:#eee;display:inline-flex;align-items:center;justify-content:center;margin-right:10px;">${p.name.charAt(0)}</div>`;

        const rankText = p.rank ? `<span style="color:#d32f2f;font-weight:bold;">[${p.rank}]</span>` : '';
        const status = gameState.finishedPlayers.includes(idx) ? '上がり' : `手札: ${p.hand.length}枚`;

        div.innerHTML = `${img}<strong>${p.name}</strong> ${rankText}<br>${status}`;
        playersElement.appendChild(div);
    });
}

function updatePlayerHand() {
    playerHandElement.innerHTML = '';
    const myHand = gameState.players[0].hand;

    myHand.forEach((card, i) => {
        const el = document.createElement('div');
        el.className = 'card';
        if (gameState.selectedCards.includes(i)) el.classList.add('selected');
        el.style.backgroundImage = `url(cards/${card}.png)`;

        if (!gameState.isSpectator) {
            el.onclick = () => {
                if (gameState.selectedCards.includes(i)) {
                    gameState.selectedCards = gameState.selectedCards.filter(idx => idx !== i);
                } else {
                    gameState.selectedCards.push(i);
                }
                updatePlayerHand();
            };
        }
        playerHandElement.appendChild(el);
    });
}

function isValidPlay(cards) {
    if (cards.length === 0) return false;

    const isJoker = (c) => c === JOKER || c === RED_JOKER;
    const normalCards = cards.filter(c => !isJoker(c));
    let isStairs = false;

    if (normalCards.length >= 3 && cards.length === normalCards.length) {
        const firstSuit = getSuit(normalCards[0]);
        if (normalCards.every(c => getSuit(c) === firstSuit)) {
            const sorted = [...normalCards].sort((a, b) => getRankValue(a) - getRankValue(b));
            let consecutive = true;
            for (let i = 0; i < sorted.length - 1; i++) {
                if (getRankValue(sorted[i + 1]) !== getRankValue(sorted[i]) + 1) {
                    consecutive = false;
                    break;
                }
            }
            if (consecutive) isStairs = true;
        }
    }

    if (gameState.field.length === 0) {
        if (isStairs) return true;
        if (normalCards.length > 0) {
            const baseRank = normalCards[0].split('_of_')[0];
            if (!normalCards.every(c => c.split('_of_')[0] === baseRank)) {
                return false;
            }
        }
        return true;
    }

    if (cards.length !== gameState.field.length) return false;

    const fieldStrength = getCardStrength(gameState.field[0]);
    const myStrength = normalCards.length > 0 ? getCardStrength(normalCards[0]) : 99;

    return myStrength > fieldStrength;
}

function checkEightCut(cards) {
    return cards.some(c => c.startsWith('8_'));
}

function checkRevolution(cards) {
    return cards.length >= 4;
}

function playSelectedCards() {
    const player = gameState.players[0];
    const cards = gameState.selectedCards.map(i => player.hand[i]);

    if (!isValidPlay(cards)) {
        showNotification("そのカードは出せません！");
        return;
    }
    executePlay(player, cards, gameState.selectedCards);
    gameState.selectedCards = [];
}

function playerPass() {
    if (gameState.field.length === 0) {
        showNotification("親番です。カードを出してください。");
        return;
    }
    showDialogue(gameState.players[0].name, "パスします。", "player", "pass");
    setTimeout(() => {
        advanceTurn();
    }, 1000);
}

function executePlay(player, cards, removeTarget) {
    gameState.field = cards;
    gameState.lastPlayIndex = gameState.players.indexOf(player);

    let targetCards = [];
    if (player.isHuman && !gameState.isSpectator) {
        targetCards = removeTarget.map(i => player.hand[i]);
    } else {
        targetCards = removeTarget;
    }

    targetCards.forEach(card => {
        const idx = player.hand.indexOf(card);
        if (idx !== -1) player.hand.splice(idx, 1);
    });

    if (gameState.isSpectator && player.id === gameState.players[0].id) {
        updatePlayerHand();
    }

    const strength = getCardStrength(cards[0]);
    if ((strength >= 10 || cards.some(c => c === JOKER || c === RED_JOKER)) && !gameState.isSkipping) { 
        gameState.isProcessing = true;
        let delay = 500;
        const reactors = gameState.players.filter(p =>
            !p.isHuman &&
            p !== player &&
            !gameState.finishedPlayers.includes(gameState.players.indexOf(p))
        );

        const numReactors = Math.random() < 0.5 ? 1 : 2;
        const chosenReactors = [];
        for (let i = 0; i < numReactors; i++) {
            if (reactors.length > 0) {
                const rIndex = Math.floor(Math.random() * reactors.length);
                chosenReactors.push(reactors[rIndex]);
                reactors.splice(rIndex, 1);
            }
        }

        chosenReactors.forEach(p => {
            setTimeout(() => {
                const char = CHARACTERS[p.character];
                showDialogue(p.name, getRandomDialogue(char, 'antiPressure', p), p.character, 'lose');
            }, delay);
            delay += 2000;
        });

        setTimeout(() => {
            gameState.isProcessing = false;
            continueExecute(player, cards);
        }, delay);

    } else {
        continueExecute(player, cards);
    }
}

function continueExecute(player, cards) {
    if (checkRevolution(cards)) {
        gameState.revolution = !gameState.revolution;
        if (!gameState.isSkipping) {
            showDialogue("システム", gameState.revolution ? "革命発生！！" : "革命返し！！", null, null);
        }
        gameState.players.forEach(p => sortHand(p.hand));
    }

    if (checkEightCut(cards)) {
        if (!gameState.isSkipping) {
            const char = CHARACTERS[player.character];
            if (char) showDialogue(player.name, "8切り！", player.character, 'play');
            else showDialogue(player.name, "8切り！", "player", "play");
        }

        gameState.field = [];
        gameState.lastPlayIndex = -1;
        updateGameDisplay();

        if (checkWin(player)) return;

        setTimeout(() => {
            if (player.isHuman || (gameState.isSpectator && player.id === gameState.players[0].id)) {
                showNotification("8切り！あなたの親番です");
                updateGameDisplay();
            } else {
                if(!gameState.isSkipping) showNotification(`8切り！${player.name}の親番です`);
                setTimeout(aiTurn, getDelay(1000));
            }
        }, getDelay(1200));
        return;
    }

    if (checkWin(player)) return;
    
    setTimeout(() => {
        advanceTurn();
    }, getDelay(1200));
}

// 遅延時間を管理する関数
function getDelay(normalTime) {
    return gameState.isSkipping ? 50 : normalTime;
}

function checkWin(player) {
    if (player.hand.length === 0) {
        if (player.rank !== null) return true;

        const rankIndex = gameState.finishedPlayers.length;
        
        player.rank = RANKINGS[rankIndex];
        gameState.finishedPlayers.push(gameState.players.indexOf(player));

        if (player.isHuman && !gameState.isGameEnded && gameState.finishedPlayers.length < gameState.players.length - 1) {
            if(skipGameBtn) {
                skipGameBtn.style.display = 'block';
                skipGameBtn.disabled = false;
                skipGameBtn.innerHTML = '<i class="fa-solid fa-forward"></i> 残りの試合をスキップ';
            }
            showNotification("おめでとう！残りの試合をスキップできます");
        }

        if (gameState.round > 1 && rankIndex === 0) {
            const prevKing = gameState.players.find(p => gameState.prevRanks[p.id] === 0);
            
            if (prevKing && prevKing !== player && !gameState.finishedPlayers.includes(gameState.players.indexOf(prevKing))) {
                
                showNotification("都落ち発生！！");
                
                prevKing.isDropped = true; 
                prevKing.rank = RANKINGS[3];
                prevKing.hand = [];
                
                gameState.finishedPlayers.push(gameState.players.indexOf(prevKing));

                const kChar = CHARACTERS[prevKing.character];
                setTimeout(() => {
                    showDialogue(prevKing.name, getRandomDialogue(kChar, 'drop', prevKing), prevKing.character, 'lose');
                }, 1000);
            }
        }

        const char = CHARACTERS[player.character];
        let situation = rankIndex === 0 ? 'rank1' : 'rank2';
        if (char && char.id === 'rei' && Math.random() < 0.2) situation = 'ketchup';
        else if (rankIndex > 1) situation = 'win';

        if (char) {
            showDialogue(player.name, getRandomDialogue(char, situation, player), player.character, situation);
        } else {
            showDialogue(player.name, "上がりました！", "player", 'win');
        }

        if (gameState.finishedPlayers.length >= gameState.players.length - 1) {
            gameState.isGameEnded = true;
            setTimeout(processGameEnd, 3000);
            return true;
        }
    }
    return false;
}

function processGameEnd() {
    const loserIndex = gameState.players.findIndex((p, idx) => !gameState.finishedPlayers.includes(idx));
    if (loserIndex !== -1) {
        const loser = gameState.players[loserIndex];
        if (loser.rank === null) {
            loser.rank = RANKINGS[3];
            gameState.finishedPlayers.push(loserIndex);
            
            const char = CHARACTERS[loser.character];
            if (char) showDialogue(loser.name, getRandomDialogue(char, 'lose', loser), loser.character, 'lose');
            else showDialogue(loser.name, "負けました...", "player", 'lose');
        }
    }

    let sortedPlayers = gameState.finishedPlayers.map(idx => gameState.players[idx]);
    const droppedPlayer = sortedPlayers.find(p => p.isDropped);
    
    if (droppedPlayer) {
        const others = sortedPlayers.filter(p => !p.isDropped);
        sortedPlayers = [...others, droppedPlayer];
        droppedPlayer.isDropped = false; 
    }

    gameState.finishedPlayers = sortedPlayers.map(p => gameState.players.indexOf(p));

    gameState.finishedPlayers.forEach((playerIdx, rankOrder) => {
        const p = gameState.players[playerIdx];
        p.rank = RANKINGS[rankOrder];
        gameState.prevRanks[p.id] = rankOrder;
    });

    setTimeout(showResultModal, 2500);
}

function showResultModal() {
    resultList.innerHTML = '';
    gameState.finishedPlayers.forEach((playerIdx, rank) => {
        const p = gameState.players[playerIdx];
        const row = document.createElement('div');
        row.className = `result-row rank-${rank + 1}`;
        row.innerHTML = `<span class="result-rank">${rank + 1}位</span><span class="result-name">${p.name}</span><span class="result-title">${RANKINGS[rank] || '都落ち'}</span>`;
        resultList.appendChild(row);
    });
    resultModal.style.display = 'block';
}

nextRoundButton.onclick = () => {
    gameState.round++;
    startRound();
};
titleButton.onclick = () => {
    location.reload();
};

function advanceTurn() {
    if (gameState.isGameEnded) return;

    let nextIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    let count = 0;
    while (gameState.finishedPlayers.includes(nextIndex)) {
        nextIndex = (nextIndex + 1) % gameState.players.length;
        count++;
        if (count > 10) break;
    }

    gameState.currentPlayerIndex = nextIndex;
    updateGameDisplay();
}

function aiTurn() {
    if (gameState.isProcessing || gameState.isTalking || gameState.isGameEnded) return;

    const aiPlayer = gameState.players[gameState.currentPlayerIndex];
    if (gameState.finishedPlayers.includes(gameState.currentPlayerIndex)) {
        advanceTurn();
        return;
    }

    if (checkFieldClear()) {
        setTimeout(aiTurn, getDelay(1000));
        return;
    }

    const charData = CHARACTERS[aiPlayer.character];
    const aiParams = charData ? (charData.aiParams || { aggressiveness: 0.5 }) : { aggressiveness: 0.5 };

    if (!gameState.isSkipping && Math.random() < 0.4) {
        showDialogue(aiPlayer.name, getRandomDialogue(charData, 'think', aiPlayer), aiPlayer.character, 'think');
    }

    const playableMoves = getPlayableMoves(aiPlayer.hand);

    if (playableMoves.length === 0) {
        gameState.isProcessing = true;
        setTimeout(() => {
            if (!gameState.isSkipping) {
                showDialogue(aiPlayer.name, getRandomDialogue(charData, 'pass', aiPlayer), aiPlayer.character, 'pass');
            }
            setTimeout(() => {
                gameState.isProcessing = false;
                if (!gameState.isGameEnded) {
                    advanceTurn();
                }
            }, getDelay(1500));
        }, getDelay(800));
        return;
    }

    let selectedMove = null;
    playableMoves.sort((a, b) => getCardStrength(a[0]) - getCardStrength(b[0]));
    if (aiParams.aggressiveness > 0.7) {
        selectedMove = playableMoves[playableMoves.length - 1];
        const specialMove = playableMoves.find(m => checkEightCut(m) || checkRevolution(m));
        if (specialMove && Math.random() < aiParams.aggressiveness) selectedMove = specialMove;
    } else if (aiParams.cooperativeness > 0.7) {
        selectedMove = playableMoves[0];
    } else {
        const idx = Math.floor(Math.random() * playableMoves.length);
        selectedMove = playableMoves[idx];
    }

    gameState.isProcessing = true;
    setTimeout(() => {
        let situation = 'play';
        if (checkRevolution(selectedMove)) situation = 'revolution';
        else if (selectedMove.includes(JOKER) || selectedMove.includes(RED_JOKER)) situation = 'joker';
        else if (getCardStrength(selectedMove[0]) > 10) situation = 'pressure';

        const isJoker = (c) => c === JOKER || c === RED_JOKER;
        const normalCards = selectedMove.filter(c => !isJoker(c));

        if (selectedMove.length === 2 && situation === 'play') situation = 'pair';
        if (selectedMove.length >= 3 && situation === 'play') {
            if (normalCards.length > 1 && normalCards[0].split('_of_')[0] !== normalCards[1].split('_of_')[0]) situation = 'stairs';
            else if (normalCards.length === 1 && selectedMove.length >= 3) situation = 'pair';
        }
        if (selectedMove.length === 1 && situation === 'play') situation = 'single';

        if (!gameState.isSkipping) {
            showDialogue(aiPlayer.name, getRandomDialogue(charData, situation, aiPlayer), aiPlayer.character, situation);
        }

        setTimeout(() => {
            gameState.isProcessing = false;
            executePlay(aiPlayer, selectedMove, selectedMove);
        }, getDelay(1500));

    }, getDelay(800));
}

function getPlayableMoves(hand) {
    let moves = [];
    const fieldQty = gameState.field.length;
    const fieldStrength = fieldQty > 0 ? getCardStrength(gameState.field[0]) : -1;

    if (fieldQty === 0 || fieldQty === 1) {
        hand.forEach(card => {
            if (fieldQty === 0 || getCardStrength(card) > fieldStrength) moves.push([card]);
        });
    }

    const rankGroups = {};
    const cardsBySuit = {};
    const jokers = [];

    hand.forEach(card => {
        if (card === JOKER || card === RED_JOKER) {
            jokers.push(card);
            return;
        }
        const rank = card.split('_of_')[0];
        const suit = card.split('_of_')[1];
        if (!rankGroups[rank]) rankGroups[rank] = [];
        rankGroups[rank].push(card);
        if (!cardsBySuit[suit]) cardsBySuit[suit] = [];
        cardsBySuit[suit].push(card);
    });

    Object.keys(rankGroups).forEach(rank => {
        const cards = rankGroups[rank];
        if (fieldQty === 0) {
            if (cards.length >= 2) moves.push(cards.slice(0, 2));
            if (cards.length >= 3) moves.push(cards.slice(0, 3));
            if (cards.length >= 4) moves.push(cards.slice(0, 4));
            if (jokers.length > 0 && cards.length >= 1) moves.push([...cards.slice(0, 1), jokers[0]]);
        } else {
            if (cards.length >= fieldQty) {
                const move = cards.slice(0, fieldQty);
                if (getCardStrength(move[0]) > fieldStrength) moves.push(move);
            }
            if (fieldQty === 2 && cards.length === 1 && jokers.length > 0) {
                const move = [cards[0], jokers[0]];
                if (getCardStrength(move[0]) > fieldStrength) moves.push(move);
            }
        }
    });

    Object.keys(cardsBySuit).forEach(suit => {
        const cards = cardsBySuit[suit].sort((a, b) => getRankValue(a) - getRankValue(b));
        if (cards.length < 3) return;
        for (let i = 0; i < cards.length; i++) {
            let sequence = [cards[i]];
            for (let j = i + 1; j < cards.length; j++) {
                if (getRankValue(cards[j]) === getRankValue(cards[j - 1]) + 1) {
                    sequence.push(cards[j]);
                    if (sequence.length >= 3) {
                        if (fieldQty === 0 || (fieldQty === sequence.length && getCardStrength(sequence[0]) > fieldStrength)) {
                            moves.push([...sequence]);
                        }
                    }
                } else {
                    break;
                }
            }
        }
    });
    if ((fieldQty === 0 || fieldQty === 1) && jokers.length > 0) {
        jokers.forEach(j => moves.push([j]));
    }
    return moves;
}

// ★ここが大事！前回書き忘れていた部分です！
function createDialogueElement() {
    if (document.getElementById('dialogue')) return;
    const div = document.createElement('div');
    div.id = 'dialogue';
    div.style.position = 'fixed';
    div.style.zIndex = '9999';

    div.innerHTML = `
        <div class="dialogue-container">
            <div class="dialogue-icon" id="dialogue-icon-container">
                <img id="dialogue-img" src="" style="display:none;">
                <div id="dialogue-fallback" class="fallback-icon" style="display:none;"></div>
            </div>
            <div class="dialogue-content">
                <span class="dialogue-name" id="dialogue-name-text"></span>
                <div class="dialogue-text" id="dialogue-body-text"></div>
            </div>
        </div>
    `;
    document.body.appendChild(div);
}

function showDialogue(name, text, characterId = null, situation = null) {
    const el = document.getElementById('dialogue');
    const nameEl = document.getElementById('dialogue-name-text');
    const bodyEl = document.getElementById('dialogue-body-text');
    const imgEl = document.getElementById('dialogue-img');
    const fallbackEl = document.getElementById('dialogue-fallback');

    if (!text || !el) return;

    nameEl.textContent = name;
    bodyEl.textContent = text;

    let targetSrc = '';
    let baseSrc = '';
    let fallbackChar = name.charAt(0);

    if (characterId === 'player') {
        if (gameState.playerAvatar) {
            targetSrc = gameState.playerAvatar;
            baseSrc = gameState.playerAvatar;
        } else {
            targetSrc = '';
        }
    } else if (characterId && CHARACTERS[characterId]) {
        baseSrc = CHARACTERS[characterId].portrait || '';
        if (situation) {
            targetSrc = baseSrc.replace('.png', `_${situation}.png`);
        } else {
            targetSrc = baseSrc;
        }
    }

    if (targetSrc) {
        imgEl.style.display = 'block';
        fallbackEl.style.display = 'none';

        imgEl.src = targetSrc;

        imgEl.onerror = function() {
            if (this.src !== baseSrc && baseSrc) {
                this.src = baseSrc;
            } else {
                this.style.display = 'none';
                fallbackEl.textContent = fallbackChar;
                fallbackEl.style.display = 'flex';
            }
        };
    } else {
        imgEl.style.display = 'none';
        fallbackEl.textContent = fallbackChar;
        fallbackEl.style.display = 'flex';
    }

    el.style.display = 'block';
    if (el.dataset.visible !== "true") {
        el.classList.remove('pop-in');
        void el.offsetWidth;
        el.classList.add('pop-in');
        el.dataset.visible = "true";
    }

    if (el.hideTimer) clearTimeout(el.hideTimer);
    el.hideTimer = setTimeout(() => {
        el.style.display = 'none';
        el.dataset.visible = "false";
    }, 4000);
}

function showNotification(text) {
    const el = document.getElementById('game-notification');
    if (!el) return;
    el.textContent = text;
    el.classList.add('show');
    setTimeout(() => {
        el.classList.remove('show');
    }, 3000);
}

function getRandomDialogue(char, type, playerObj) {
    if (!char) return "...";

    // ★1. トリプルイベント（3人の掛け合い）が発生中なら、それを最優先！
    if (gameState.activeTriangleEvent) {
        const eventLines = gameState.activeTriangleEvent.lines;
        // 今の状況(type)に対応するセリフが、このキャラに設定されているか確認
        if (eventLines[type] && eventLines[type][char.id]) {
            const triLines = eventLines[type][char.id];
            if (triLines && triLines.length > 0) {
                 return triLines[Math.floor(Math.random() * triLines.length)];
            }
        }
    }

    if (!char.voiceLinesDetailed) return "...";

    // 2. ペアセリフ（トリプルがない、またはトリプルのセリフ定義がない場合）
    const otherSurvivors = gameState.players.filter(p => p.id !== playerObj.id && !gameState.finishedPlayers.includes(gameState.players.indexOf(p)));
    if (otherSurvivors.length > 0 && char.pairLinesDetailed) {
        const validTargets = otherSurvivors.filter(target => char.pairLinesDetailed[target.character] && char.pairLinesDetailed[target.character][type]);
        if (validTargets.length > 0 && Math.random() < 0.4) {
            const target = validTargets[Math.floor(Math.random() * validTargets.length)];
            const pLines = char.pairLinesDetailed[target.character][type];
            return pLines[Math.floor(Math.random() * pLines.length)];
        }
    }

    // 3. 通常セリフ
    const lines = char.voiceLinesDetailed[type];
    if (!lines || lines.length === 0) {
        if (type === 'drop') return "……っ。";
        if (type === 'tributeGive') return "どうぞ。";
        if (type === 'tributeReceive') return "ありがとう。";
        return "...";
    }
    return lines[Math.floor(Math.random() * lines.length)];
}

// ==========================================
// BGM制御
// ==========================================
const bgmAudio = document.getElementById('bgm-audio');
const bgmBtn = document.getElementById('bgm-toggle');
let isBgmPlaying = false;

if (bgmBtn && bgmAudio) {
    bgmAudio.volume = 0.3;

    bgmBtn.addEventListener('click', () => {
        if (isBgmPlaying) {
            bgmAudio.pause();
            isBgmPlaying = false;
            bgmBtn.classList.remove('playing');
            bgmBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            bgmAudio.play().then(() => {
                isBgmPlaying = true;
                bgmBtn.classList.add('playing');
                bgmBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
            }).catch(e => console.log("BGM play failed:", e));
        }
    });
}

function startBgm() {
    if (bgmAudio && !isBgmPlaying) {
        bgmAudio.play().then(() => {
            isBgmPlaying = true;
            bgmBtn.classList.add('playing');
            bgmBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
        }).catch(e => {
            console.log("Auto-play blocked, waiting for interaction.");
        });
    }
}
