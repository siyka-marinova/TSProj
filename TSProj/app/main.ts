var pages = require("ui/pages");
var stackPanel = require("ui/panels/stack-panel");
var button = require("ui/button");
var label = require("ui/label");
var layout = require("ui/core/layout");
var geometry = require("utils/geometry");
var model = require("/modules/model");

class MainViewController {
    
    private createTitleLabel(): any {
        // Setup the title label.
        var titleLabel = new label.Label();
        
        titleLabel.horizontalAlignment = layout.HorizontalAlignment.center;
        titleLabel.margin = new geometry.Thickness(20, 20, 20, 20);
        titleLabel.text = "Tap the button";
        titleLabel.cssClass = "title";

        return titleLabel;
    }

    private createButton(): any {
        // Setup the button.
        var btn = new button.Button();
        
        btn.text = "TAP";
        btn.horizontalAlignment = layout.HorizontalAlignment.center;
        btn.on("click",  () => this.onClick() );
        this.setMessage(model.Text);

        return btn;
    }

    private onClick(): void {
        console.log("button click called");
        model.action();
        if(model.Counter <= 0) {
            this.setMessage("Hoorraaay! You unlocked the NativeScript clicker achievement!");
        } else {
            this.setMessage(model.Text);    
        }
    }
    
    private setMessage(message: string) {
        model.Observable.setProperty("message", message);
    }

    private createMessageLabel(): any {
        //Setup the message label.
        var messageLabel = new label.Label();
        messageLabel.horizontalAlignment = layout.HorizontalAlignment.center;
        messageLabel.margin = new geometry.Thickness(20, 20, 20, 20);
        messageLabel.cssClass = "message";
        messageLabel.textWrap = true;


        // Bind the text of the message label to the text property of the model.
        messageLabel.bind({
            sourceProperty: "message",
            targetProperty: "text"
        }, model.Observable);

        return messageLabel;
    }

    private createPanel(): any {
        // Put all the elements in a StackPanel.
        var panel = new stackPanel.StackPanel();
        panel.addChild(this.createTitleLabel());
        panel.addChild(this.createButton());
        panel.addChild(this.createMessageLabel());

        return panel;
    }

    public createPage(): any {

        // Create and return the page.
        var page = new pages.Page();
        page.content = this.createPanel();
        page.css = " button { font-size: 42 } .title { font-size: 30 } .message { font-size: 20; color: #284848; }";

        return page;
    }
}

module.exports = {
    Page: new MainViewController().createPage()
}