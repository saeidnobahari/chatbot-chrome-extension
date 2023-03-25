import Toolbar from './Toolbar.svelte';

const toolbar = new Toolbar({
  target: document.body,
  props: {
    visible: false,
  },
});

(async () => {
  // const toolbar = document.createElement('div');
  // toolbar.innerHTML =
  //   '<button class="btn_summarize">Summarize</button><button class="btn_expand">Expand</button><button class="btn_readability">Readability</button>';
  // toolbar.style.display = 'none';
  // toolbar.style.position = 'absolute';
  // toolbar.style.zIndex = '99999';
  // toolbar.style.height = '30px';
  // toolbar.style.backgroundColor = 'white';
  // toolbar.style.border = '1px solid #ccc';
  // toolbar
  //   .querySelector('.btn_summarize')
  //   .addEventListener('click', async () => {
  //     const selection = window.getSelection();
  //     const selectionText = selection.toString();
  //     if (selectionText) {
  //       console.log(selectionText);
  //       const response = await chrome.runtime.sendMessage({
  //         name: 'ai-magic',
  //         selectionText,
  //       });
  //       console.log(response);
  //       // replace selection with response
  //       // if (selectionElement) {
  //       //   console.log(selectionElement.innerHTML);
  //       //   selectionElement.innerHTML.replace(selectionText, response);
  //       // }
  //       if (selection.rangeCount > 0) {
  //         const range = selection.getRangeAt(0);
  //         range.deleteContents();
  //         range.insertNode(document.createTextNode(response));
  //       }
  //     }
  //   });
  // toolbar.querySelector('.btn_expand').addEventListener('click', () => {
  //   // console.log(selectionText);
  // });
  // toolbar.querySelector('.btn_readability').addEventListener('click', () => {
  //   // console.log(selectionText);
  // });
  // document.body.appendChild(toolbar);

  // document.addEventListener('selectionchange', function(e) {
  // const selection = window.getSelection();
  // console.log(selection);
  // });

  document.addEventListener('selectionchange', function(e) {
    const selection = window.getSelection();
    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.tagName === 'TEXTAREA' ||
        activeElement.getAttribute('contenteditable') === 'true')
    ) {
      if (
        selection.rangeCount > 0 &&
        selection.toString().length > 1 &&
        selection.type === 'Range'
      ) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // get left position of first character
        // otherwise toolbar will be positioned at the start if multiple lines are selected
        const rect2 = range.getClientRects()[0];
        const left = rect2.left + window.scrollX;

        toolbar.$set({
          visible: true,
          top: rect.top + window.scrollY - 45,
          left: left,
        });
      } else {
        toolbar.$set({
          visible: false,
        });
      }
    }
  });
  document.addEventListener('mousedown', function(e) {
    if (e.target instanceof Element) {
      // if click on button or button child => do nothing
      if (
        e.target.classList.contains('btn_summarize') ||
        e.target.classList.contains('btn_expand') ||
        e.target.classList.contains('btn_friendly') ||
        e.target.classList.contains('btn_prompt') ||
        e.target.closest('.btn_summarize') ||
        e.target.closest('.btn_expand') ||
        e.target.closest('.btn_friendly') ||
        e.target.closest('.btn_prompt')
      ) {
        e.preventDefault();
      }
    }
  });
})();
