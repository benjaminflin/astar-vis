// Generated by purs version 0.13.5
"use strict";
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Control_Monad_Error_Class = require("../Control.Monad.Error.Class/index.js");
var Control_Monad_Except_Trans = require("../Control.Monad.Except.Trans/index.js");
var Control_Monad_Reader_Class = require("../Control.Monad.Reader.Class/index.js");
var Control_Monad_Reader_Trans = require("../Control.Monad.Reader.Trans/index.js");
var Control_Monad_Trans_Class = require("../Control.Monad.Trans.Class/index.js");
var Data_Either = require("../Data.Either/index.js");
var Data_Foldable = require("../Data.Foldable/index.js");
var Data_Function = require("../Data.Function/index.js");
var Data_Int = require("../Data.Int/index.js");
var Data_List_Types = require("../Data.List.Types/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Data_Monoid = require("../Data.Monoid/index.js");
var Data_Set = require("../Data.Set/index.js");
var Data_Show = require("../Data.Show/index.js");
var Data_Tuple = require("../Data.Tuple/index.js");
var Data_Unit = require("../Data.Unit/index.js");
var Effect = require("../Effect/index.js");
var Graphics_Canvas = require("../Graphics.Canvas/index.js");
var Web_HTML = require("../Web.HTML/index.js");
var Web_HTML_Window = require("../Web.HTML.Window/index.js");
var Window_DevicePixelRatio = require("../Window.DevicePixelRatio/index.js");
var CanvasNotFoundError = (function () {
    function CanvasNotFoundError() {

    };
    CanvasNotFoundError.value = new CanvasNotFoundError();
    return CanvasNotFoundError;
})();
var OutOfBoundsError = (function () {
    function OutOfBoundsError() {

    };
    OutOfBoundsError.value = new OutOfBoundsError();
    return OutOfBoundsError;
})();
var viewScale = 40.0;
var showErr = new Data_Show.Show(function (v) {
    if (v instanceof CanvasNotFoundError) {
        return "CanvasNotFoundError";
    };
    if (v instanceof OutOfBoundsError) {
        return "OutOfBoundsError";
    };
    throw new Error("Failed pattern match at Draw (line 22, column 1 - line 24, column 45): " + [ v.constructor.name ]);
});
var inverseViewScale = function (vec) {
    return Control_Applicative.pure(Effect.applicativeEffect)({
        x: vec.x / (viewScale / 2.0),
        y: vec.y / (-viewScale / 2.0)
    });
};
var getWindowDimensions = function (withPixelRatio) {
    return function __do() {
        var v = Web_HTML.window();
        var v1 = Web_HTML_Window.innerWidth(v)();
        var v2 = Web_HTML_Window.innerHeight(v)();
        var v3 = Window_DevicePixelRatio.devicePixelRatio(v)();
        var r = (function () {
            if (withPixelRatio) {
                return v3;
            };
            return 1.0;
        })();
        return {
            width: Data_Int.toNumber(v1) * r,
            height: Data_Int.toNumber(v2) * r
        };
    };
};
var inverseView = function (vec) {
    return function __do() {
        var v = getWindowDimensions(false)();
        return {
            x: (vec.x - v.width / 2.0) / (viewScale / 2.0),
            y: (vec.y - v.height / 2.0) / (-viewScale / 2.0)
        };
    };
};
var setupCanvas = function (canvas) {
    return function __do() {
        var v = getWindowDimensions(true)();
        Graphics_Canvas.setCanvasDimensions(canvas)(v)();
        var v1 = Graphics_Canvas.getContext2D(canvas)();
        Graphics_Canvas.clearRect(v1)({
            x: 0.0,
            y: 0.0,
            width: v.width,
            height: v.height
        })();
        return new Data_Tuple.Tuple(v1, v);
    };
};
var getCanvas = Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Effect.monadEffect))(Control_Monad_Trans_Class.lift(Control_Monad_Except_Trans.monadTransExceptT)(Effect.monadEffect)(Graphics_Canvas.getCanvasElementById("astar-vis")))(function (v) {
    if (v instanceof Data_Maybe.Just) {
        return Control_Applicative.pure(Control_Monad_Except_Trans.applicativeExceptT(Effect.monadEffect))(v.value0);
    };
    if (v instanceof Data_Maybe.Nothing) {
        return Control_Monad_Error_Class.throwError(Control_Monad_Except_Trans.monadThrowExceptT(Effect.monadEffect))(CanvasNotFoundError.value);
    };
    throw new Error("Failed pattern match at Draw (line 47, column 3 - line 49, column 46): " + [ v.constructor.name ]);
});
var drawPath = function (result) {
    var maybeDo = Data_Function.flip(Data_Maybe.maybe(Control_Applicative.pure(Control_Monad_Reader_Trans.applicativeReaderT(Effect.applicativeEffect))(Data_Unit.unit)));
    return Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))(Control_Monad_Reader_Class.ask(Control_Monad_Reader_Trans.monadAskReaderT(Effect.monadEffect)))(function (v) {
        return Control_Bind.discard(Control_Bind.discardUnit)(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))(Control_Monad_Trans_Class.lift(Control_Monad_Reader_Trans.monadTransReaderT)(Effect.monadEffect)(Graphics_Canvas.setFillStyle(v.ctx)("#1F4788")))(function () {
            return maybeDo(result)((function () {
                var $82 = Control_Monad_Trans_Class.lift(Control_Monad_Reader_Trans.monadTransReaderT)(Effect.monadEffect);
                var $83 = Data_Foldable.foldMap(Data_List_Types.foldableNonEmptyList)(Effect.monoidEffect(Data_Monoid.monoidUnit))(function (v1) {
                    return Graphics_Canvas.fillRect(v.ctx)({
                        x: Data_Int.toNumber(v1.value0.value0),
                        y: Data_Int.toNumber(v1.value0.value1),
                        width: 1.0,
                        height: 1.0
                    });
                });
                return function ($84) {
                    return $82($83($84));
                };
            })());
        });
    });
};
var drawMap = Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))(Control_Monad_Reader_Class.ask(Control_Monad_Reader_Trans.monadAskReaderT(Effect.monadEffect)))(function (v) {
    return Control_Monad_Trans_Class.lift(Control_Monad_Reader_Trans.monadTransReaderT)(Effect.monadEffect)(function __do() {
        Graphics_Canvas.setFillStyle(v.ctx)("#757D75")();
        return Data_Foldable.foldMap(Data_Set.foldableSet)(Effect.monoidEffect(Data_Monoid.monoidUnit))(function (v1) {
            return Graphics_Canvas.fillRect(v.ctx)({
                x: Data_Int.toNumber(v1.value0),
                y: Data_Int.toNumber(v1.value1),
                width: 1.0,
                height: 1.0
            });
        })(v.params.map)();
    });
});
var drawExplored = function (explored) {
    var drawTile = function (ctx) {
        return function (v) {
            return Graphics_Canvas.fillRect(ctx)({
                x: Data_Int.toNumber(v.value0),
                y: Data_Int.toNumber(v.value1),
                width: 1.0,
                height: 1.0
            });
        };
    };
    return Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))(Control_Monad_Reader_Class.ask(Control_Monad_Reader_Trans.monadAskReaderT(Effect.monadEffect)))(function (v) {
        return Control_Bind.discard(Control_Bind.discardUnit)(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))(Control_Monad_Trans_Class.lift(Control_Monad_Reader_Trans.monadTransReaderT)(Effect.monadEffect)(Graphics_Canvas.setFillStyle(v.ctx)("#F3C13A")))(function () {
            return Control_Monad_Trans_Class.lift(Control_Monad_Reader_Trans.monadTransReaderT)(Effect.monadEffect)(Data_Foldable.foldMap(Data_Set.foldableSet)(Effect.monoidEffect(Data_Monoid.monoidUnit))(drawTile(v.ctx))(explored));
        });
    });
};
var drawEndpoints = (function () {
    var drawGoal = function (ctx) {
        return function (v) {
            return Graphics_Canvas.fillRect(ctx)({
                x: Data_Int.toNumber(v.value0) + (1.0 - 0.7) / 2.0,
                y: Data_Int.toNumber(v.value1) + (1.0 - 0.7) / 2.0,
                width: 0.7,
                height: 0.7
            });
        };
    };
    return Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))(Control_Monad_Reader_Class.ask(Control_Monad_Reader_Trans.monadAskReaderT(Effect.monadEffect)))(function (v) {
        return Control_Monad_Trans_Class.lift(Control_Monad_Reader_Trans.monadTransReaderT)(Effect.monadEffect)(function __do() {
            Graphics_Canvas.setFillStyle(v.ctx)("#eb4034")();
            Graphics_Canvas.fillRect(v.ctx)({
                x: Data_Int.toNumber(v.params.startTile.value0) + (1.0 - 0.7) / 2.0,
                y: Data_Int.toNumber(v.params.startTile.value1) + (1.0 - 0.7) / 2.0,
                width: 0.7,
                height: 0.7
            })();
            Graphics_Canvas.setFillStyle(v.ctx)("#26A65B")();
            return Data_Foldable.foldMap(Data_List_Types.foldableNonEmptyList)(Effect.monoidEffect(Data_Monoid.monoidUnit))(drawGoal(v.ctx))(v.params.goalTiles)();
        });
    });
})();
var applyTransformations = Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))(Control_Monad_Reader_Class.ask(Control_Monad_Reader_Trans.monadAskReaderT(Effect.monadEffect)))(function (v) {
    return Control_Monad_Trans_Class.lift(Control_Monad_Reader_Trans.monadTransReaderT)(Effect.monadEffect)(function __do() {
        Graphics_Canvas.translate(v.ctx)({
            translateX: v.dimensions.width / 2.0,
            translateY: v.dimensions.height / 2.0
        })();
        Graphics_Canvas.scale(v.ctx)({
            scaleX: viewScale,
            scaleY: -viewScale
        })();
        return Graphics_Canvas.transform(v.ctx)(v.world)();
    });
});
var draw = Control_Bind.bind(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))(Control_Monad_Reader_Class.ask(Control_Monad_Reader_Trans.monadAskReaderT(Effect.monadEffect)))(function (v) {
    return Control_Bind.discard(Control_Bind.discardUnit)(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))(applyTransformations)(function () {
        return Control_Bind.discard(Control_Bind.discardUnit)(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))(drawMap)(function () {
            return Control_Bind.discard(Control_Bind.discardUnit)(Control_Monad_Reader_Trans.bindReaderT(Effect.bindEffect))((function () {
                if (v.toDraw instanceof Data_Either.Left) {
                    return drawExplored(v.toDraw.value0);
                };
                if (v.toDraw instanceof Data_Either.Right) {
                    return drawPath(v.toDraw.value0);
                };
                throw new Error("Failed pattern match at Draw (line 133, column 3 - line 135, column 36): " + [ v.toDraw.constructor.name ]);
            })())(function () {
                return drawEndpoints;
            });
        });
    });
});
var drawAStar = function (v) {
    return Control_Monad_Except_Trans.runExceptT(Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Effect.monadEffect))(getCanvas)(function (v1) {
        return Control_Bind.bind(Control_Monad_Except_Trans.bindExceptT(Effect.monadEffect))(Control_Monad_Trans_Class.lift(Control_Monad_Except_Trans.monadTransExceptT)(Effect.monadEffect)(setupCanvas(v1)))(function (v2) {
            var config = {
                canvas: v1,
                ctx: v2.value0,
                dimensions: v2.value1,
                toDraw: v.toDraw,
                world: v.world,
                params: v.params
            };
            return Control_Monad_Trans_Class.lift(Control_Monad_Except_Trans.monadTransExceptT)(Effect.monadEffect)(Control_Monad_Reader_Trans.runReaderT(draw)(config));
        });
    }));
};
module.exports = {
    CanvasNotFoundError: CanvasNotFoundError,
    OutOfBoundsError: OutOfBoundsError,
    viewScale: viewScale,
    getCanvas: getCanvas,
    getWindowDimensions: getWindowDimensions,
    setupCanvas: setupCanvas,
    applyTransformations: applyTransformations,
    inverseView: inverseView,
    inverseViewScale: inverseViewScale,
    drawExplored: drawExplored,
    drawEndpoints: drawEndpoints,
    drawMap: drawMap,
    drawPath: drawPath,
    draw: draw,
    drawAStar: drawAStar,
    showErr: showErr
};