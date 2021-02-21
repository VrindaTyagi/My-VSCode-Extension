// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const axios = require("axios");
const xmlParser = require("fast-xml-parser");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  const res = await axios.get("https://blog.webdevsimplified.com/rss.xml");
  const articles = xmlParser.parse(res.data).rss.channel.item.map((article) => {
    return {
      label: article.title,
      detail: article.description,
	  link: article.link
    };
  });
  console.log(articles);

  let disposable = vscode.commands.registerCommand(
    "trial-extension.searchTrialExtensionBlog",
    async function () {
      const article = await vscode.window.showQuickPick(articles, {
        matchOnDetail: true,
      })
	  if(article==null) return
	  
	  vscode.env.openExternal(article.link)

    }
	
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
