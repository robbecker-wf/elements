/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  window.onload = function() {

    // Random-color demo start
    // Listen to databinding events coming from the element.  Could be less boilerplate with dom-bind.
    var colorElement = document.querySelector('random-color');
    var colorSpan = document.querySelector('#color-span');
    colorElement.addEventListener('color-changed', function(ev) {
       var color = ev.detail.value;
        colorSpan.innerHTML = color;
        colorSpan.style.color = color;
    });

    // API via method
    var apiRandomColor = document.querySelector('#api-random-color');
    apiRandomColor.onclick = function() {
        colorElement.setRandomColor();
    };

    // API via property
    var apiPurple = document.querySelector('#api-purple');
    apiPurple.onclick = function() {
        colorElement.color = 'purple';
    };

    // API via React
    ReactDOM.render(
        React.createElement('random-color', {color: 'blue'}),
        document.querySelector('#random-color-container-react')
    )
  };
  // Random-color demo end

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
    var mainC = document.querySelector('#mainContainer');
    var lazies = document.querySelectorAll('img[is="lazy-image"]');
    for (var i = 0; i < lazies.length; i++) {
        lazies[i].scrollableContainer = mainC;
    }

    window.rendered = 0;

    window.TreeComponent = React.createClass({
    displayName: 'TreeComponent',
    getInitialState: function() {
        return {
            value: Math.floor(Math.random() * 100) // random value
        }
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.state.value !== nextState.value;
    },
    render: function() {

        var kids = [];
        if (this.props.height) {
            kids.push(
                React.createElement(
                    TreeComponent,
                    {
                        key: 'left',
                        ref: 'left',
                        height: this.props.height - 1,
                        className: 'left'
                    }
                )
            );
            kids.push(
                React.createElement(
                    TreeComponent,
                    {
                        key: 'right',
                        ref: 'right',
                        height: this.props.height - 1,
                        className: 'right'
                    }
                )
            );
            // kids.push(React.createElement('div',{invisible: true}));
            // kids.push(React.createElement('div',{invisible: true}));
            // kids.push(React.createElement('div',{invisible: true}));
            // kids.push(React.createElement('div',{invisible: true}));
            // kids.push(React.createElement('div',{invisible: true}));
            // kids.push(React.createElement('div',{invisible: true}));
            // kids.push(React.createElement('div',{invisible: true}));
            // kids.push(React.createElement('div',{invisible: true}));
            // kids.push(React.createElement('div',{invisible: true}));
            // kids.push(React.createElement('div',{invisible: true}));
        }
        // rendered++;
        // console.log('render', rendered);
        return React.createElement('div', {className: this.props.className},
            this.state.value,
            kids
        )
    },
    addOne: function() {
        this.setState({value: this.state.value + 1});
        if (this.refs.left) this.refs.left.addOne();
        if (this.refs.right) this.refs.right.addOne();
    }
});

    // drop-down demo start
    var ddElement = document.querySelector('drop-down');
    ddElement.options = ['Binders', 'Certifications', 'Section 16', 'XBRL'];
    ddElement.buttonText = 'Basic dropdown';
    // drop-down demo end

  });



  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  addEventListener('paper-header-transform', function(e) {
    var appName = document.querySelector('#mainToolbar .app-name');
    var middleContainer = document.querySelector('#mainToolbar .middle-container');
    var bottomContainer = document.querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onDataRouteClick = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    //document.getElementById('mainContainer').scrollTop = 0;
  };



})(document);

function preventUnload(enable) {
    var prev = document.querySelector('#prevent');
    if (prev) prev.enabled = enable;
}
function allowUnload() {
    if (!document.querySelector('#prevent')) {
        var prev = document.createElement('prevent-unload');
        prev.id = 'prevent';
        window.document.body.appendChild(prev);
    }
}
function lazyLoad(html) {
    var link = document.createElement('link');
    link.rel = 'import';
    link.href = html;
    document.body.appendChild(link);
}
function addPolyTree() {
    document.getElementById('polytree').innerHTML = '<tree-node height="9"></tree-node>';
}
function removePolyTree() {
    document.getElementById('polytree').innerHTML = '';
}
function addPolyBlob() {
    var tag = '<tree-node height="9"></tree-node>';
    var html = '';
    for (var i = 0; i < 1000; i++) {
        html += tag;
    };
    document.getElementById('polytree').innerHTML = html;
}
function addReactTree() {
    var rc = React.createElement(TreeComponent, {height: 9});
    var el = document.getElementById('react-tree');
    window.reactTree = ReactDOM.render(rc, el);
}
function removeReactTree() {
    document.getElementById('react-tree').innerHTML = '';
}
