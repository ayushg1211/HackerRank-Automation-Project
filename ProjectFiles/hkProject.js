const puppeteer = require('puppeteer');
const loginLink = "https://www.hackerrank.com/auth/login";
const codeFile = require('./code');

console.log('before');
// Old Email -> ritivo1853@tebyy.com
let email = 'rehah88106@storypo.com';
let password = 'reh@123';


let page;
let openBrowserPromise = puppeteer.launch({   // It will Launch the Browser.
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
}).then(function (browserInstance) {
    let newTabOpenPromise = browserInstance.newPage();  // It will Open a new Tab
    return newTabOpenPromise;
}).then(function (newTab) {
    // Page is a global variable here.
    page = newTab;
    // goto() will take us on login page
    let websiteOpenPromise = newTab.goto(loginLink);
    return websiteOpenPromise;
}).then(function () {
    // type() method is used to write text.
    let emailWillBeEnteredPromise = page.type('input[id="input-1"]', email, { delay: 100 });
    return emailWillBeEnteredPromise;
}).then(function () {
    // Password Will be typed here.
    let passwordWillBeEnteredPromise = page.type('input[id="input-2"]', password, { delay: 100 });
    return passwordWillBeEnteredPromise;
}).then(function () {
    // click() method is used to click a button in automation.
    // Clicking Login Button here.
    let loginButtonClickPromise = page.click('button[data-analytics="LoginPassword"]');
    return loginButtonClickPromise;
}).then(function () {
    // Clicking on Algo section after a delay of 300ms using waitAndClick() Function
    // which is defined by us that returns a Promise
    let algoSecClickPromise = waitAndClick('a[data-attr1="algorithms"]', page);
    return algoSecClickPromise;
}).then(function () {
    // Clicking on warmUp checkBox using waitAndClick() function.
    let warmupSecClickPromise = waitAndClick('.checkbox-wrap input[value="warmup"]', page);
    return warmupSecClickPromise;
}).then(function () {
    // Using $$ to select all the questions in warmUp section with the same selector as given below.
    let allQuestionsArrPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return allQuestionsArrPromise;
}).then(function (TotalQuestions) {
    console.log('No. of QUestions :-  ' + TotalQuestions.length);
    let questionWillBeSolved = questionSolver(page, TotalQuestions[0], codeFile.answers[0]);
    // questionSolver() function will solve each question.
    return questionWillBeSolved;
})


function waitAndClick(selector, cPage)  // cpage = Current Page.
{
    return new Promise(function (resolve, reject) {
        let waitForModulePromise = cPage.waitForSelector(selector);
        waitForModulePromise.then(function () {
            let clickModal = cPage.click(selector, { delay: 300 });
            return clickModal;
        }).then(function () { resolve() }).then(function () { reject() });
    })
}

function questionSolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillBeClickedPromise = question.click(); // Clicking on the Question.
        questionWillBeClickedPromise.then(function () {
            // Clicking on the question editor to get onthe same page before clicking on TextInput checkbox.
            let waitForEditor = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return waitForEditor;
        }).then(function () {
            // Clicking on TextInput checkbox.
            let customInputClicked = waitAndClick('.checkbox-input', page);
            return customInputClicked;
        }).then(function () {
            // Clicking on TextInput editor to bring the cursor on it.
            return waitAndClick('#input-1', page);
        }).then(function () {
            // Typing the answer of the question in TextInputEditor.
            return page.type('#input-1', answer, { delay: 30 });
        }).then(function () {
            let cltrlIsPressingPromise = page.keyboard.down('Control');
            return cltrlIsPressingPromise;
        }).then(function () {
            let AisPressedPromise = page.keyboard.press('A', { delay: 100 });
            return AisPressedPromise;
        }).then(function () {
            let XisPressedromise = page.keyboard.press('X', { delay: 100 });
            return XisPressedromise;
        }).then(function () {
            let waitForEditor = waitAndClick('.monaco-editor.no-user-select.vs', page);
            return waitForEditor;
        }).then(function () {
            let AisPressedPromise = page.keyboard.press('A', { delay: 100 });
            return AisPressedPromise;
        }).then(function () {
            let VisPressedromise = page.keyboard.press('V', { delay: 100 });
            return VisPressedromise;
        }).then(function () {
            let ctrlIsRealeasedPromise = page.keyboard.up('Control');
            return ctrlIsRealeasedPromise;
        }).then(function () {
            let returnButtonIsClicked = waitAndClick('.hr-monaco__run-code', page);
            return returnButtonIsClicked;
        }).then(function()
        {
            resolve() ;
        }).catch(function(error)
        {   
            console.log(error) ;
        })
    })
}

console.log('After');