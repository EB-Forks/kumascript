/**
 * @prettier
 */
const { JSDOM } = require('jsdom');
const { describeMacro, itMacro } = require('./utils');

describeMacro('TemplateLink', () => {
    itMacro('TemplateLink generates correct DOM', async macro => {
        let dom = JSDOM.fragment(await macro.call('TemplateLink'));
        expect(dom.textContent).toEqual('TemplateLink');
        expect(dom.childElementCount).toEqual(1);

        let code = dom.firstElementChild;
        expect(code.tagName.toLowerCase()).toEqual('code');
        expect(code.classList).toContain('templateLink');
        expect(code.childElementCount).toEqual(1);

        let anchor = /** @type {HTMLAnchorElement} */ (code.firstElementChild);
        expect(anchor.tagName.toLowerCase()).toEqual('a');
        expect(anchor.href).toEqual('https://github.com/mdn/kumascript/tree/master/macros/TemplateLink.ejs');
    });

    itMacro('TemplateLink generates correct link for incorrect case', async macro => {
        let dom = JSDOM.fragment(await macro.call('templateLINK'));
        expect(dom.textContent).toEqual('templateLINK');

        let anchor = dom.querySelector('a');
        expect(anchor).toEqual(expect.anything());
        expect(anchor.href).toEqual('https://github.com/mdn/kumascript/tree/master/macros/TemplateLink.ejs');
    })
});
