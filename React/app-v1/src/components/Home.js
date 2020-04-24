import React, { Component} from 'react'

export class Home extends Component {

    render() {
        return (
            <div class="ui segment">
            <div class="ui active transition visible dimmer">
              <div class="content"><div class="ui loader"></div></div>
            </div>
            <img src="/images/wireframe/short-paragraph.png" class="ui image" />
          </div>
        );
    }
}

