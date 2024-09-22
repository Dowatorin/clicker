// script.js

let clickCount = 0;
let salary = 1;
let money = 0;
let items = 0;
let energy = 0;
let itemCost = 10; // アイテムの価格

const clickableArea = document.getElementById('clickable-area');
const clickText = document.getElementById('click-text');
const scoreIncrement = document.getElementById('score-increment');
const title = document.getElementById('title');
const words = document.getElementById('words');
const body = document.getElementById('back');
const moneyElement = document.getElementById('money');
const itemsElement = document.getElementById('items');
const salaryElement = document.getElementById('salary');
const buyItemButton = document.getElementById('buy-item');
const customModal = document.getElementById('custom-modal');
const closeModal = document.getElementById('close-modal');
const modalMessage = document.getElementById('modal-message');


// 称号の取得
function getTitle(clicks) {
    if (clicks < 300) {
        return "社会人１年目";
    } else if (clicks >= 300 && clicks < 500) {
        //buyItemButton.disabled = true;
        return "ニート";
    } else if (clicks >= 500 && clicks < 1000) {
        return "犯罪者";
    } else if (clicks >= 1000 && clicks < 1020) {
        energy = 0;
        itemsElement.textContent ='エナジー: 0';
        money = 0;
        moneyElement.textContent = '給料: 0円';
        salary = 0;
        return "高校生";
    } else if (clicks >= 1020 && clicks < 1080) {
        return "上司";
    } else if (clicks >= 1080 && clicks < 1200) {
        return "あなた";
    } else if (clicks >= 1200) {
        return "高校生：人生２回目";
    }
}
function getWords(clicks) {
    if (clicks < 10) {
        return "今日からバリバリ頑張ろう！";
    }else if (clicks >= 10 && clicks < 50) {
        return "ダイヘンだなぁ!";
    } else if (clicks >= 50 && clicks < 150) {
        return "今日も怒られちゃった。でも俺が悪いし...";
    } else if (clicks >= 150 && clicks < 300) {
        return "やめたい";
    } else if (clicks >= 300 && clicks < 500) {
        return "自由だ";
    } else if(clicks >= 500 && clicks < 600){
        return "もう戻れない";
    } else if(clicks >= 600 && clicks < 700){
        return "俺のせいじゃない";
    } else if(clicks >= 700 && clicks < 800){
        return "あいつが悪い";
    } else if(clicks >= 800 && clicks < 900){
        return "高いな、あの時よりも";
    } else if(clicks >= 900 && clicks < 1000){
        return "こんなはずじゃなかった";
    } else if(clicks >= 1000 && clicks < 1020){
        return "夢か";
    } else if(clicks >= 1020 && clicks < 1050){
        return "そんなはずないだろ";
    } else if(clicks >= 1050 && clicks < 1060){
        return "ごめんな";
    } else if(clicks >= 1060 && clicks < 1070){
        return "全部お前のせいにして";
    } else if(clicks >= 1070 && clicks < 1080){
        return "俺はただ足を滑らせただけなのに";
    } else if(clicks >= 1080 && clicks < 1090){
        return "なんだ";
    } else if(clicks >= 1090 && clicks < 1100) {
        return "すべてが無駄だったのか";
    } else if(clicks >= 1200) {
        return "早く仕事がしたいな（完）";
    }
}
function updateBackgroundColor(clicks) {
    if (clicks < 50) {
        clickableArea.style.backgroundColor = '#4CAF50'; // 初期の色
    } else if (clicks >= 50 && clicks < 100) {
        clickableArea.style.backgroundColor = '#03A9F4'; // 黄色
    } else if (clicks < 100) {
        clickableArea.style.backgroundColor = '#03A9F4'; // 青色
    } else if (clicks >= 1000 && clicks < 1020) {
        clickableArea.style.backgroundColor = '#4CAF50';
    } else if (clicks >= 1020) {
        clickableArea.style.backgroundColor = 'rgb(139, 0, 0)';
        buyItemButton.style.backgroundColor = 'rgb(139, 0, 0)';
    } else {
        clickableArea.style.backgroundColor = '#E91E63'; // ピンク色
    }
    
    if(clicks >= 300 && clicks < 320){
        body.style.backgroundColor = "red";
    } else if(clicks >= 500 && clicks < 1000){
        body.style.backgroundColor ="black";
    } else if(clicks >= 1020 && clicks < 1050){
        body.style.backgroundColor ="black";
    } else if(clicks >= 1200){
        clickableArea.style.backgroundColor = '#4CAF50';
        buyItemButton.style.backgroundColor = '#007bff';
        //body.style.backgroundColor ="black";
    } else {
        body.style.backgroundColor = "white";
    }
}

function buyItem() {
    if (money >= itemCost) {
        money -= itemCost;
        items += 1;
        energy++;
        itemCost += 20;
        moneyElement.textContent = `お金: ${money}円`;
        itemsElement.textContent = `エナジー: ${items}`;
        //buyItemButton.disabled = money < itemCost; // ボタンを有効/無効にする
        salaryElement.textContent = `作業効率: ${salary+energy}`;
        buyItemButton.innerHTML =  `<i class = "key-icon">F</i> エナジードリンク: ${itemCost}円`;
    } else if(clickCount >= 500){
        showModal("もう働かなくていいんだ");
        buyItemButton.disabled = true;
    } else{
        showModal("金欠だ");
    }
}
function showModal(message) {
    modalMessage.textContent = message;
    customModal.style.display = "block";
}

// モーダルを閉じる関数
function closeModalFunction() {
    customModal.style.display = "none";
}

closeModal.addEventListener('click', closeModalFunction);

customModal.addEventListener('click', function(event) {
    if (event.target === customModal) {
        closeModalFunction();
    }
});

clickableArea.addEventListener('click', function() {
    clickCount += 1 + energy;
    money += salary;
    clickText.textContent = `納品: ${clickCount}`;
    moneyElement.textContent = `給料: ${money}円`;
    salaryElement.textContent = `作業効率: ${salary+energy}`;

    updateBackgroundColor(clickCount);
    words.textContent = getWords(clickCount);
    
    title.textContent = getTitle(clickCount);
    // アニメーションの表示
    scoreIncrement.textContent = `+${1+energy}`;
    scoreIncrement.classList.add('show');

    // 一定時間後にアニメーションを非表示にする
    setTimeout(() => {
        scoreIncrement.classList.remove('show');
    }, 500); // アニメーションの長さに合わせて500ms
});

document.addEventListener('keydown', function(event) {
    const keyDisplay = document.getElementById('keyDisplay');
    const key = event.key.toUpperCase(); // 入力キーを大文字に変換

    // Fキーが押された場合のみ処理を行う
    if (key == 'F') {
        // キーを画面に表示
        //keyDisplay.textContent = `Pressed key: ${key}`;

        // 対応するボタンを押す
        const button = document.getElementById('buy-item');
        if (button) {
            button.click(); // ボタンをクリック
        }
    }
});

document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();
    // FキーとJキーが同時に押されたかどうかを確認
    if (key === 'M') {
        money += 100;
        moneyElement.textContent = `給料: ${money}円`;
    }
            if (key === 'C') {
                clickCount += 100;
                clickText.textContent = `納品: ${clickCount}`;
            }
    
});

buyItemButton.addEventListener('click', buyItem);
