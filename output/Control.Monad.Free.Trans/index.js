// Generated by purs version 0.13.5
"use strict";
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Apply = require("../Control.Apply/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Control_Category = require("../Control.Category/index.js");
var Control_Monad = require("../Control.Monad/index.js");
var Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");
var Control_Monad_Rec_Class = require("../Control.Monad.Rec.Class/index.js");
var Control_Monad_State_Class = require("../Control.Monad.State.Class/index.js");
var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
var Control_Monad_Writer_Class = require("../Control.Monad.Writer.Class/index.js");
var Data_Bifunctor = require("../Data.Bifunctor/index.js");
var Data_Either = require("../Data.Either/index.js");
var Data_Exists = require("../Data.Exists/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_Monoid = require("../Data.Monoid/index.js");
var Data_Semigroup = require("../Data.Semigroup/index.js");
var Data_Unit = require("../Data.Unit/index.js");
var Effect_Aff_Class = require("../Effect.Aff.Class/index.js");
var Effect_Class = require("../Effect.Class/index.js");
var Bound = (function () {
    function Bound(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Bound.create = function (value0) {
        return function (value1) {
            return new Bound(value0, value1);
        };
    };
    return Bound;
})();
var FreeT = (function () {
    function FreeT(value0) {
        this.value0 = value0;
    };
    FreeT.create = function (value0) {
        return new FreeT(value0);
    };
    return FreeT;
})();
var Bind = (function () {
    function Bind(value0) {
        this.value0 = value0;
    };
    Bind.create = function (value0) {
        return new Bind(value0);
    };
    return Bind;
})();
var monadTransFreeT = function (dictFunctor) {
    return new Control_Monad_Trans_Class.MonadTrans(function (dictMonad) {
        return function (ma) {
            return new FreeT(function (v) {
                return Data_Functor.map(((dictMonad.Bind1()).Apply0()).Functor0())(Data_Either.Left.create)(ma);
            });
        };
    });
};
var freeT = FreeT.create;
var bound = function (m) {
    return function (f) {
        return new Bind(Data_Exists.mkExists(new Bound(m, f)));
    };
};
var functorFreeT = function (dictFunctor) {
    return function (dictFunctor1) {
        return new Data_Functor.Functor(function (f) {
            return function (v) {
                if (v instanceof FreeT) {
                    return new FreeT(function (v1) {
                        return Data_Functor.map(dictFunctor1)(Data_Bifunctor.bimap(Data_Either.bifunctorEither)(f)(Data_Functor.map(dictFunctor)(Data_Functor.map(functorFreeT(dictFunctor)(dictFunctor1))(f))))(v.value0(Data_Unit.unit));
                    });
                };
                if (v instanceof Bind) {
                    return Data_Exists.runExists(function (v1) {
                        return bound(v1.value0)((function () {
                            var $123 = Data_Functor.map(functorFreeT(dictFunctor)(dictFunctor1))(f);
                            return function ($124) {
                                return $123(v1.value1($124));
                            };
                        })());
                    })(v.value0);
                };
                throw new Error("Failed pattern match at Control.Monad.Free.Trans (line 59, column 1 - line 61, column 71): " + [ f.constructor.name, v.constructor.name ]);
            };
        });
    };
};
var bimapFreeT = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (nf) {
            return function (nm) {
                return function (v) {
                    if (v instanceof Bind) {
                        return Data_Exists.runExists(function (v1) {
                            return bound((function () {
                                var $125 = bimapFreeT(dictFunctor)(dictFunctor1)(nf)(nm);
                                return function ($126) {
                                    return $125(v1.value0($126));
                                };
                            })())((function () {
                                var $127 = bimapFreeT(dictFunctor)(dictFunctor1)(nf)(nm);
                                return function ($128) {
                                    return $127(v1.value1($128));
                                };
                            })());
                        })(v.value0);
                    };
                    if (v instanceof FreeT) {
                        return new FreeT(function (v1) {
                            return Data_Functor.map(dictFunctor1)(Data_Functor.map(Data_Either.functorEither)((function () {
                                var $129 = Data_Functor.map(dictFunctor)(bimapFreeT(dictFunctor)(dictFunctor1)(nf)(nm));
                                return function ($130) {
                                    return nf($129($130));
                                };
                            })()))(nm(v.value0(Data_Unit.unit)));
                        });
                    };
                    throw new Error("Failed pattern match at Control.Monad.Free.Trans (line 123, column 1 - line 123, column 109): " + [ nf.constructor.name, nm.constructor.name, v.constructor.name ]);
                };
            };
        };
    };
};
var hoistFreeT = function (dictFunctor) {
    return function (dictFunctor1) {
        return bimapFreeT(dictFunctor)(dictFunctor1)(Control_Category.identity(Control_Category.categoryFn));
    };
};
var interpret = function (dictFunctor) {
    return function (dictFunctor1) {
        return function (nf) {
            return bimapFreeT(dictFunctor)(dictFunctor1)(nf)(Control_Category.identity(Control_Category.categoryFn));
        };
    };
};
var monadFreeT = function (dictFunctor) {
    return function (dictMonad) {
        return new Control_Monad.Monad(function () {
            return applicativeFreeT(dictFunctor)(dictMonad);
        }, function () {
            return bindFreeT(dictFunctor)(dictMonad);
        });
    };
};
var bindFreeT = function (dictFunctor) {
    return function (dictMonad) {
        return new Control_Bind.Bind(function () {
            return applyFreeT(dictFunctor)(dictMonad);
        }, function (v) {
            return function (f) {
                if (v instanceof Bind) {
                    return Data_Exists.runExists(function (v1) {
                        return bound(v1.value0)(function (x) {
                            return bound(function (v2) {
                                return v1.value1(x);
                            })(f);
                        });
                    })(v.value0);
                };
                return bound(function (v1) {
                    return v;
                })(f);
            };
        });
    };
};
var applyFreeT = function (dictFunctor) {
    return function (dictMonad) {
        return new Control_Apply.Apply(function () {
            return functorFreeT(dictFunctor)(((dictMonad.Bind1()).Apply0()).Functor0());
        }, Control_Monad.ap(monadFreeT(dictFunctor)(dictMonad)));
    };
};
var applicativeFreeT = function (dictFunctor) {
    return function (dictMonad) {
        return new Control_Applicative.Applicative(function () {
            return applyFreeT(dictFunctor)(dictMonad);
        }, function (a) {
            return new FreeT(function (v) {
                return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Left(a));
            });
        });
    };
};
var liftFreeT = function (dictFunctor) {
    return function (dictMonad) {
        return function (fa) {
            return new FreeT(function (v) {
                return Control_Applicative.pure(dictMonad.Applicative0())(new Data_Either.Right(Data_Functor.map(dictFunctor)(Control_Applicative.pure(applicativeFreeT(dictFunctor)(dictMonad)))(fa)));
            });
        };
    };
};
var resume = function (dictFunctor) {
    return function (dictMonadRec) {
        var go = function (v) {
            if (v instanceof FreeT) {
                return Data_Functor.map((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(Control_Monad_Rec_Class.Done.create)(v.value0(Data_Unit.unit));
            };
            if (v instanceof Bind) {
                return Data_Exists.runExists(function (v1) {
                    var v2 = v1.value0(Data_Unit.unit);
                    if (v2 instanceof FreeT) {
                        return Control_Bind.bind((dictMonadRec.Monad0()).Bind1())(v2.value0(Data_Unit.unit))(function (v3) {
                            if (v3 instanceof Data_Either.Left) {
                                return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Loop(v1.value1(v3.value0)));
                            };
                            if (v3 instanceof Data_Either.Right) {
                                return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Done(new Data_Either.Right(Data_Functor.map(dictFunctor)(function (h) {
                                    return Control_Bind.bind(bindFreeT(dictFunctor)(dictMonadRec.Monad0()))(h)(v1.value1);
                                })(v3.value0))));
                            };
                            throw new Error("Failed pattern match at Control.Monad.Free.Trans (line 54, column 20 - line 56, column 67): " + [ v3.constructor.name ]);
                        });
                    };
                    if (v2 instanceof Bind) {
                        return Data_Exists.runExists(function (v3) {
                            return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Loop(Control_Bind.bind(bindFreeT(dictFunctor)(dictMonadRec.Monad0()))(v3.value0(Data_Unit.unit))(function (z) {
                                return Control_Bind.bind(bindFreeT(dictFunctor)(dictMonadRec.Monad0()))(v3.value1(z))(v1.value1);
                            })));
                        })(v2.value0);
                    };
                    throw new Error("Failed pattern match at Control.Monad.Free.Trans (line 52, column 5 - line 57, column 98): " + [ v2.constructor.name ]);
                })(v.value0);
            };
            throw new Error("Failed pattern match at Control.Monad.Free.Trans (line 49, column 3 - line 49, column 75): " + [ v.constructor.name ]);
        };
        return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(go);
    };
};
var runFreeT = function (dictFunctor) {
    return function (dictMonadRec) {
        return function (interp) {
            var go = function (v) {
                if (v instanceof Data_Either.Left) {
                    return Control_Applicative.pure((dictMonadRec.Monad0()).Applicative0())(new Control_Monad_Rec_Class.Done(v.value0));
                };
                if (v instanceof Data_Either.Right) {
                    return Data_Functor.map((((dictMonadRec.Monad0()).Bind1()).Apply0()).Functor0())(Control_Monad_Rec_Class.Loop.create)(interp(v.value0));
                };
                throw new Error("Failed pattern match at Control.Monad.Free.Trans (line 141, column 3 - line 141, column 63): " + [ v.constructor.name ]);
            };
            return Control_Monad_Rec_Class.tailRecM(dictMonadRec)(Control_Bind.composeKleisliFlipped((dictMonadRec.Monad0()).Bind1())(go)(resume(dictFunctor)(dictMonadRec)));
        };
    };
};
var semigroupFreeT = function (dictFunctor) {
    return function (dictMonad) {
        return function (dictSemigroup) {
            return new Data_Semigroup.Semigroup(Control_Apply.lift2(applyFreeT(dictFunctor)(dictMonad))(Data_Semigroup.append(dictSemigroup)));
        };
    };
};
var monadAskFreeT = function (dictFunctor) {
    return function (dictMonadAsk) {
        return new Control_Monad_Reader_Class.MonadAsk(function () {
            return monadFreeT(dictFunctor)(dictMonadAsk.Monad0());
        }, Control_Monad_Trans_Class.lift(monadTransFreeT(dictFunctor))(dictMonadAsk.Monad0())(Control_Monad_Reader_Class.ask(dictMonadAsk)));
    };
};
var monadEffectFreeT = function (dictFunctor) {
    return function (dictMonadEffect) {
        return new Effect_Class.MonadEffect(function () {
            return monadFreeT(dictFunctor)(dictMonadEffect.Monad0());
        }, (function () {
            var $131 = Control_Monad_Trans_Class.lift(monadTransFreeT(dictFunctor))(dictMonadEffect.Monad0());
            var $132 = Effect_Class.liftEffect(dictMonadEffect);
            return function ($133) {
                return $131($132($133));
            };
        })());
    };
};
var monadAffFreeT = function (dictFunctor) {
    return function (dictMonadAff) {
        return new Effect_Aff_Class.MonadAff(function () {
            return monadEffectFreeT(dictFunctor)(dictMonadAff.MonadEffect0());
        }, (function () {
            var $134 = Control_Monad_Trans_Class.lift(monadTransFreeT(dictFunctor))((dictMonadAff.MonadEffect0()).Monad0());
            var $135 = Effect_Aff_Class.liftAff(dictMonadAff);
            return function ($136) {
                return $134($135($136));
            };
        })());
    };
};
var monadStateFreeT = function (dictFunctor) {
    return function (dictMonadState) {
        return new Control_Monad_State_Class.MonadState(function () {
            return monadFreeT(dictFunctor)(dictMonadState.Monad0());
        }, (function () {
            var $137 = Control_Monad_Trans_Class.lift(monadTransFreeT(dictFunctor))(dictMonadState.Monad0());
            var $138 = Control_Monad_State_Class.state(dictMonadState);
            return function ($139) {
                return $137($138($139));
            };
        })());
    };
};
var monadTellFreeT = function (dictFunctor) {
    return function (dictMonadTell) {
        return new Control_Monad_Writer_Class.MonadTell(function () {
            return monadFreeT(dictFunctor)(dictMonadTell.Monad0());
        }, (function () {
            var $140 = Control_Monad_Trans_Class.lift(monadTransFreeT(dictFunctor))(dictMonadTell.Monad0());
            var $141 = Control_Monad_Writer_Class.tell(dictMonadTell);
            return function ($142) {
                return $140($141($142));
            };
        })());
    };
};
var monadThrowFreeT = function (dictFunctor) {
    return function (dictMonadThrow) {
        return new Control_Monad_Error_Class.MonadThrow(function () {
            return monadFreeT(dictFunctor)(dictMonadThrow.Monad0());
        }, (function () {
            var $143 = Control_Monad_Trans_Class.lift(monadTransFreeT(dictFunctor))(dictMonadThrow.Monad0());
            var $144 = Control_Monad_Error_Class.throwError(dictMonadThrow);
            return function ($145) {
                return $143($144($145));
            };
        })());
    };
};
var monadRecFreeT = function (dictFunctor) {
    return function (dictMonad) {
        return new Control_Monad_Rec_Class.MonadRec(function () {
            return monadFreeT(dictFunctor)(dictMonad);
        }, function (f) {
            var go = function (s) {
                return Control_Bind.bind(bindFreeT(dictFunctor)(dictMonad))(f(s))(function (v) {
                    if (v instanceof Control_Monad_Rec_Class.Loop) {
                        return go(v.value0);
                    };
                    if (v instanceof Control_Monad_Rec_Class.Done) {
                        return Control_Applicative.pure(applicativeFreeT(dictFunctor)(dictMonad))(v.value0);
                    };
                    throw new Error("Failed pattern match at Control.Monad.Free.Trans (line 82, column 15 - line 84, column 25): " + [ v.constructor.name ]);
                });
            };
            return go;
        });
    };
};
var monoidFreeT = function (dictFunctor) {
    return function (dictMonad) {
        return function (dictMonoid) {
            return new Data_Monoid.Monoid(function () {
                return semigroupFreeT(dictFunctor)(dictMonad)(dictMonoid.Semigroup0());
            }, Control_Applicative.pure(applicativeFreeT(dictFunctor)(dictMonad))(Data_Monoid.mempty(dictMonoid)));
        };
    };
};
var substFreeT = function (dictMonad) {
    return function (dictFunctor) {
        return function (fBind) {
            return function (v) {
                if (v instanceof Bind) {
                    return Data_Exists.runExists(function (v1) {
                        return bound((function () {
                            var $146 = substFreeT(dictMonad)(dictFunctor)(fBind);
                            return function ($147) {
                                return $146(v1.value0($147));
                            };
                        })())((function () {
                            var $148 = substFreeT(dictMonad)(dictFunctor)(fBind);
                            return function ($149) {
                                return $148(v1.value1($149));
                            };
                        })());
                    })(v.value0);
                };
                if (v instanceof FreeT) {
                    return Control_Bind.join(bindFreeT(dictFunctor)(dictMonad))(new FreeT(function (v1) {
                        return Data_Functor.mapFlipped(((dictMonad.Bind1()).Apply0()).Functor0())(v.value0(Data_Unit.unit))(function (v2) {
                            if (v2 instanceof Data_Either.Left) {
                                return Data_Either.Left.create(Control_Applicative.pure(applicativeFreeT(dictFunctor)(dictMonad))(v2.value0));
                            };
                            if (v2 instanceof Data_Either.Right) {
                                return Data_Either.Left.create(bound(function (v3) {
                                    return fBind(v2.value0);
                                })(substFreeT(dictMonad)(dictFunctor)(fBind)));
                            };
                            throw new Error("Failed pattern match at Control.Monad.Free.Trans (line 132, column 60 - line 134, column 69): " + [ v2.constructor.name ]);
                        });
                    }));
                };
                throw new Error("Failed pattern match at Control.Monad.Free.Trans (line 130, column 1 - line 130, column 101): " + [ fBind.constructor.name, v.constructor.name ]);
            };
        };
    };
};
module.exports = {
    freeT: freeT,
    liftFreeT: liftFreeT,
    hoistFreeT: hoistFreeT,
    interpret: interpret,
    bimapFreeT: bimapFreeT,
    substFreeT: substFreeT,
    resume: resume,
    runFreeT: runFreeT,
    functorFreeT: functorFreeT,
    applyFreeT: applyFreeT,
    applicativeFreeT: applicativeFreeT,
    bindFreeT: bindFreeT,
    monadFreeT: monadFreeT,
    monadTransFreeT: monadTransFreeT,
    monadRecFreeT: monadRecFreeT,
    semigroupFreeT: semigroupFreeT,
    monoidFreeT: monoidFreeT,
    monadEffectFreeT: monadEffectFreeT,
    monadAffFreeT: monadAffFreeT,
    monadAskFreeT: monadAskFreeT,
    monadTellFreeT: monadTellFreeT,
    monadStateFreeT: monadStateFreeT,
    monadThrowFreeT: monadThrowFreeT
};