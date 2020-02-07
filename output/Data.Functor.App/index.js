// Generated by purs version 0.13.5
"use strict";
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Apply = require("../Control.Apply/index.js");
var Data_Eq = require("../Data.Eq/index.js");
var Data_Monoid = require("../Data.Monoid/index.js");
var Data_Newtype = require("../Data.Newtype/index.js");
var Data_Ord = require("../Data.Ord/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Show = require("../Data.Show/index.js");
var Unsafe_Coerce = require("../Unsafe.Coerce/index.js");
var App = function (x) {
    return x;
};
var traversableWithIndexApp = function (dictTraversableWithIndex) {
    return dictTraversableWithIndex;
};
var traversableApp = function (dictTraversable) {
    return dictTraversable;
};
var showApp = function (dictShow) {
    return new Data_Show.Show(function (v) {
        return "(App " + (Data_Show.show(dictShow)(v) + ")");
    });
};
var semigroupApp = function (dictApply) {
    return function (dictSemigroup) {
        return new Data_Semigroup.Semigroup(function (v) {
            return function (v1) {
                return Control_Apply.lift2(dictApply)(Data_Semigroup.append(dictSemigroup))(v)(v1);
            };
        });
    };
};
var plusApp = function (dictPlus) {
    return dictPlus;
};
var newtypeApp = new Data_Newtype.Newtype(function (n) {
    return n;
}, App);
var monoidApp = function (dictApplicative) {
    return function (dictMonoid) {
        return new Data_Monoid.Monoid(function () {
            return semigroupApp(dictApplicative.Apply0())(dictMonoid.Semigroup0());
        }, Control_Applicative.pure(dictApplicative)(Data_Monoid.mempty(dictMonoid)));
    };
};
var monadZeroApp = function (dictMonadZero) {
    return dictMonadZero;
};
var monadPlusApp = function (dictMonadPlus) {
    return dictMonadPlus;
};
var monadApp = function (dictMonad) {
    return dictMonad;
};
var lazyApp = function (dictLazy) {
    return dictLazy;
};
var hoistLowerApp = Unsafe_Coerce.unsafeCoerce;
var hoistLiftApp = Unsafe_Coerce.unsafeCoerce;
var hoistApp = function (f) {
    return function (v) {
        return f(v);
    };
};
var functorWithIndexApp = function (dictFunctorWithIndex) {
    return dictFunctorWithIndex;
};
var functorApp = function (dictFunctor) {
    return dictFunctor;
};
var foldableWithIndexApp = function (dictFoldableWithIndex) {
    return dictFoldableWithIndex;
};
var foldableApp = function (dictFoldable) {
    return dictFoldable;
};
var extendApp = function (dictExtend) {
    return dictExtend;
};
var eqApp = function (dictEq1) {
    return function (dictEq) {
        return new Data_Eq.Eq(function (x) {
            return function (y) {
                return Data_Eq.eq1(dictEq1)(dictEq)(x)(y);
            };
        });
    };
};
var ordApp = function (dictOrd1) {
    return function (dictOrd) {
        return new Data_Ord.Ord(function () {
            return eqApp(dictOrd1.Eq10())(dictOrd.Eq0());
        }, function (x) {
            return function (y) {
                return Data_Ord.compare1(dictOrd1)(dictOrd)(x)(y);
            };
        });
    };
};
var eq1App = function (dictEq1) {
    return new Data_Eq.Eq1(function (dictEq) {
        return Data_Eq.eq(eqApp(dictEq1)(dictEq));
    });
};
var ord1App = function (dictOrd1) {
    return new Data_Ord.Ord1(function () {
        return eq1App(dictOrd1.Eq10());
    }, function (dictOrd) {
        return Data_Ord.compare(ordApp(dictOrd1)(dictOrd));
    });
};
var comonadApp = function (dictComonad) {
    return dictComonad;
};
var bindApp = function (dictBind) {
    return dictBind;
};
var applyApp = function (dictApply) {
    return dictApply;
};
var applicativeApp = function (dictApplicative) {
    return dictApplicative;
};
var alternativeApp = function (dictAlternative) {
    return dictAlternative;
};
var altApp = function (dictAlt) {
    return dictAlt;
};
module.exports = {
    App: App,
    hoistApp: hoistApp,
    hoistLiftApp: hoistLiftApp,
    hoistLowerApp: hoistLowerApp,
    newtypeApp: newtypeApp,
    eqApp: eqApp,
    eq1App: eq1App,
    ordApp: ordApp,
    ord1App: ord1App,
    showApp: showApp,
    semigroupApp: semigroupApp,
    monoidApp: monoidApp,
    functorApp: functorApp,
    functorWithIndexApp: functorWithIndexApp,
    applyApp: applyApp,
    applicativeApp: applicativeApp,
    bindApp: bindApp,
    monadApp: monadApp,
    altApp: altApp,
    plusApp: plusApp,
    alternativeApp: alternativeApp,
    monadZeroApp: monadZeroApp,
    monadPlusApp: monadPlusApp,
    lazyApp: lazyApp,
    foldableApp: foldableApp,
    traversableApp: traversableApp,
    foldableWithIndexApp: foldableWithIndexApp,
    traversableWithIndexApp: traversableWithIndexApp,
    extendApp: extendApp,
    comonadApp: comonadApp
};