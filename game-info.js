document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('show-game-info');
    const modal = document.getElementById('game-info-modal');
    const closeButton = document.getElementById('close-game-info');
    const seoContent = document.querySelector('.seo-content');
    const gameScreen = document.getElementById('game-screen');
    const gameContainer = document.getElementById('game-container');

    // SEO用の文章はHTMLには残したまま、ゲーム画面では常時表示しない。
    // 詳細は「このゲームについて」モーダルから読めるようにする。
    if (seoContent) {
        seoContent.style.display = 'none';
    }

    // モーダルを開く共通処理
    const openModal = () => {
        if (!modal) return;
        modal.style.display = 'block';
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        if (!modal) return;
        modal.style.display = 'none';
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
    };

    if (openButton && modal && closeButton) {
        openButton.addEventListener('click', openModal);
        closeButton.addEventListener('click', closeModal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) closeModal();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }

    // ページ最下部にも説明ボタンを用意。
    // 長いSEO文章を常時表示せず、読みたい人だけ開けるようにする。
    if (modal && !document.getElementById('bottom-game-info')) {
        const bottomInfoButton = document.createElement('button');
        bottomInfoButton.id = 'bottom-game-info';
        bottomInfoButton.type = 'button';
        bottomInfoButton.textContent = '📖 このゲームの紹介・特徴を見る';
        bottomInfoButton.addEventListener('click', openModal);

        const footer = document.querySelector('.site-footer');
        if (footer) {
            footer.parentNode.insertBefore(bottomInfoButton, footer);
        } else {
            document.body.appendChild(bottomInfoButton);
        }
    }

    // ゲーム中に「やっぱり最初からやりたい」と思ったときの退出ボタン。
    // リロードして初期画面へ戻すので、ゲーム内部の状態やタイマーもまとめてリセットできる。
    if (gameScreen && !document.getElementById('exit-game-btn')) {
        const exitButton = document.createElement('button');
        exitButton.id = 'exit-game-btn';
        exitButton.type = 'button';
        exitButton.textContent = '↩ タイトルに戻る';
        exitButton.title = '現在のゲームを終了して最初の画面に戻ります';

        exitButton.addEventListener('click', () => {
            const shouldExit = window.confirm('現在のゲームを終了して、最初の画面に戻りますか？');
            if (shouldExit) {
                window.location.reload();
            }
        });

        const controls = document.getElementById('controls');
        if (controls) {
            controls.insertAdjacentElement('afterend', exitButton);
        } else {
            gameScreen.appendChild(exitButton);
        }
    }

    // 追加したUI用のスタイル。既存のゲームデザインは変更しない。
    const style = document.createElement('style');
    style.textContent = `
        #bottom-game-info {
            display: block;
            margin: 8px auto 14px;
            padding: 10px 20px;
            border: 2px solid #6e8efb;
            border-radius: 999px;
            background: rgba(255,255,255,.95);
            color: #6e8efb;
            font-weight: bold;
            cursor: pointer;
        }
        #bottom-game-info:hover {
            background: #f0f7ff;
        }
        #exit-game-btn {
            display: block;
            margin: 4px auto 20px;
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
        @media (max-width: 600px) {
            #bottom-game-info {
                width: calc(100% - 32px);
                font-size: .9rem;
            }
            #exit-game-btn {
                margin-bottom: 16px;
                padding: 9px 18px;
            }
        }
    `;
    document.head.appendChild(style);
});
