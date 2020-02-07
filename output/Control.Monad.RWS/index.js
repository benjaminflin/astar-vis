// Generated by purs version 0.13.5
"use strict";
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Monad_RWS_Trans = require("../Control.Monad.RWS.Trans/index.js");
var Data_Identity = require("../Data.Identity/index.js");
var Data_Newtype = require("../Data.Newtype/index.js");
var withRWS = Control_Monad_RWS_Trans.withRWST;
var rws = function (f) {
    return function (r) {
        return function (s) {
            return Control_Applicative.pure(Data_Identity.applicativeIdentity)(f(r)(s));
        };
    };
};
var runRWS = function (m) {
    return function (r) {
        return function (s) {
            var v = m(r)(s);
            return v;
        };
    };
};
var mapRWS = function (f) {
    return Control_Monad_RWS_Trans.mapRWST((function () {
        var $3 = Data_Newtype.unwrap(Data_Identity.newtypeIdentity);
        return function ($4) {
            return Data_Identity.Identity(f($3($4)));
        };
    })());
};
var execRWS = function (m) {
    return function (r) {
        return function (s) {
            return Data_Newtype.unwrap(Data_Identity.newtypeIdentity)(Control_Monad_RWS_Trans.execRWST(Data_Identity.monadIdentity)(m)(r)(s));
        };
    };
};
var evalRWS = function (m) {
    return function (r) {
        return function (s) {
            return Data_Newtype.unwrap(Data_Identity.newtypeIdentity)(Control_Monad_RWS_Trans.evalRWST(Data_Identity.monadIdentity)(m)(r)(s));
        };
    };
};
module.exports = {
    rws: rws,
    runRWS: runRWS,
    evalRWS: evalRWS,
    execRWS: execRWS,
    mapRWS: mapRWS,
    withRWS: withRWS
};