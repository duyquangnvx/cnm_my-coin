import React from "react";

class BaseView extends React.Component {
    handleButton = (event) => {
        let sender = event.target;
        let type = event.type;

        console.log("handleButton", type);
        switch (type) {
            case "click":
                this.onButtonClick(sender);
                break;
            case "mousedown":
                this.onMouseDown(sender);
                break;
        }
    }

    onButtonClick = (sender) => {

    }

    onMouseDown = (sender) => {

    }
}

export default BaseView;