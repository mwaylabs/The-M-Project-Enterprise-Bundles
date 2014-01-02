// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 * @module M.LoginView
 * @type {*}
 * @extends M.View
 * @example
 *
 M.LoginView.extend({

    // overwrite the placeholder. Default: Password
    passwordPlaceholder:'Placeholder for Password',

    // overwrite the label. Default: Password
    passwordLabel: 'Label for Password',

    // overwrite the placeholder. Default: Username
    userPlaceholder: 'Userinput placeholder',

    // overwrite the label. Default: Username
    userLabel: 'User label',

    // overwrite the value of button. Default: Login
    loginButtonValue: 'Button Text',

    // gets called if the user pressed enter in one of the inputs or tap on the button
    // return true if the credentials are correct or false if they aren't
    login: function( credentials ) {
        return this.scope.login(credentials);
    },

    // gets called if the login method returns false
    onError: function( credentials ) {
        console.log('error', credentials);
    },

    // gets called if the login method returns true
    onSuccess: function( credentials ) {
        console.log('succ', credentials);
    }
 })
 *
 *
 */
M.LoginView = M.View.extend({

    /**
     * The type of the object
     * @type {String}
     * @private
     */
    _type: 'M.LoginView',

    /**
     * Use the M.LoginView as scope for the childViews
     */
    useAsScope: YES,

    /**
     * Apply a grid
     */
    grid: 'col-xs-12',

    /**
     * Initialize the view
     */
    initialize: function() {

        // swap object to extend the user
        var userExtend = {};

        // if a custom label for the user is defined use that one
        if( this.userLabel ) {
            userExtend.label = this.userLabel;
        }

        // if a custom placeholder for the user is defined use that one
        if( this.userPlaceholder ) {
            userExtend.placeholder = this.userPlaceholder;
        }

        // swap object to extend the password
        var passwordExtend = {};

        // if a custom label for the password is defined use that one
        if( this.passwordLabel ) {
            passwordExtend.label = this.passwordLabel;
        }

        // if a custom placeholder for the pasword is defined use that one
        if( this.passwordPlaceholder ) {
            passwordExtend.placeholder = this.passwordPlaceholder;
        }

        // swap object to extend the button
        var loginButtonExtend = {};

        // if a custom value for the button is defined use that one
        if( this.loginButtonValue ) {
            loginButtonExtend.value = this.loginButtonValue;
        }

        // overwrite the user view
        this._childViews.user = this._childViews.user.extend(userExtend);
        // overwrite the password view
        this._childViews.password = this._childViews.password.extend(passwordExtend);
        // overwrite the loginButton view
        this._childViews.loginButton = this._childViews.loginButton.extend(loginButtonExtend);

    },

    /**
     * gets called if the user pressed enter in one of the inputs or tap on the button
     * @private
     */
    _login: function() {

        // build the credentials
        var credentials = {
            user: this.childViews.user.getValue(),
            password: this.childViews.password.getValue()
        };

        // call the out login api
        if( this.login(credentials) ) {
            // if the credentials are correct
            this.onSuccess(credentials);
        } else {
            // if the credentials are invalid
            this._onError(credentials);
        }
    },

    /**
     * Overwrite this method to check the credentials
     * return false if the credentials are invalid otherwise true
     * @param credentials
     */
    login: function( credentials ) {
        // if the credentials are empty return false otherwise true
        if( credentials.user === '' || credentials.password === '' ) {
            return false;
        }
        return true;
    },

    /**
     * gets called if the login returns false
     * @param credentials
     * @private
     */
    _onError: function( credentials ) {
        var that = this;
        this.$el.addClass('m-shake');
        setTimeout(function() {
            that.$el.removeClass('m-shake');
        }, 200);
        this.onError(credentials);
    },

    /**
     * overwrite this function - it gets called if the login method returns true
     * @param credentials
     */
    onSuccess: function( credentials ) {
    },

    /**
     * overwrite this method - it gets called if the login method returns false
     * @param credentials
     */
    onError: function( credentials ) {
    }

}, {

    /**
     * The username input
     */
    user: M.TextfieldView.extend({
        placeholder: 'Username',
        label: 'Username',
        events: {
            enter: '_login'
        }
    }),

    /**
     * The password input
     */
    password: M.TextfieldView.extend({
        type: 'password',
        label: 'Password',
        placeholder: 'Password',
        events: {
            enter: '_login'
        }
    }),

    /**
     * The submit button
     */
    loginButton: M.ButtonView.extend({
        value: 'Login',
        events: {
            tap: '_login',
            enter: '_login'
        }
    })

});

/*global kitchensink*/

kitchensink.Views = kitchensink.Views || {};

(function() {
    'use strict';

    kitchensink.Views.StartScreenView = M.View.extend({

    }, {

        // Menu hint
        menuHint: M.TextView.extend({
            value: 'Drag from left to open up the menu or tab on this text',
            grid: 'col-xs-12',
            cssClass: 'center-text',
            icon: 'fa-exchange',
            events: {
                tap: 'toggleMenu'
            }
        }),

        // Debug hint
        info: M.TextView.extend({
            value: 'Shake to toggle the DebugView',
            grid: 'col-xs-12',
            cssClass: 'stencil',
            icon: 'fa-bug'
        })

    });

})();
