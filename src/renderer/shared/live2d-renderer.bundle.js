var Live2DRenderer = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/live2d-renderer/build/framework/src/icubismmodelsetting.js
  var require_icubismmodelsetting = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/icubismmodelsetting.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.ICubismModelSetting = void 0;
      var ICubismModelSetting = class {
      };
      exports.ICubismModelSetting = ICubismModelSetting;
      var $ = __importStar(require_icubismmodelsetting());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.ICubismModelSetting = $.ICubismModelSetting;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/type/csmvector.js
  var require_csmvector = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/type/csmvector.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.iterator = exports.csmVector = void 0;
      var csmVector = class _csmVector {
        /**
         * 引数付きコンストラクタ
         * @param iniitalCapacity 初期化後のキャパシティ。データサイズは_capacity * sizeof(T)
         * @param zeroClear trueなら初期化時に確保した領域を0で埋める
         */
        constructor(initialCapacity = 0) {
          if (initialCapacity < 1) {
            this._ptr = [];
            this._capacity = 0;
            this._size = 0;
          } else {
            this._ptr = new Array(initialCapacity);
            this._capacity = initialCapacity;
            this._size = 0;
          }
        }
        /**
         * インデックスで指定した要素を返す
         */
        at(index) {
          return this._ptr[index];
        }
        /**
         * 要素をセット
         * @param index 要素をセットするインデックス
         * @param value セットする要素
         */
        set(index, value) {
          this._ptr[index] = value;
        }
        /**
         * コンテナを取得する
         */
        get(offset = 0) {
          const ret = new Array();
          for (let i = offset; i < this._size; i++) {
            ret.push(this._ptr[i]);
          }
          return ret;
        }
        /**
         * pushBack処理、コンテナに新たな要素を追加する
         * @param value PushBack処理で追加する値
         */
        pushBack(value) {
          if (this._size >= this._capacity) {
            this.prepareCapacity(this._capacity == 0 ? _csmVector.DefaultSize : this._capacity * 2);
          }
          this._ptr[this._size++] = value;
        }
        /**
         * コンテナの全要素を解放する
         */
        clear() {
          this._ptr.length = 0;
          this._size = 0;
        }
        /**
         * コンテナの要素数を返す
         * @return コンテナの要素数
         */
        getSize() {
          return this._size;
        }
        /**
         * コンテナの全要素に対して代入処理を行う
         * @param newSize 代入処理後のサイズ
         * @param value 要素に代入する値
         */
        assign(newSize, value) {
          const curSize = this._size;
          if (curSize < newSize) {
            this.prepareCapacity(newSize);
          }
          for (let i = 0; i < newSize; i++) {
            this._ptr[i] = value;
          }
          this._size = newSize;
        }
        /**
         * サイズ変更
         */
        resize(newSize, value = null) {
          this.updateSize(newSize, value, true);
        }
        /**
         * サイズ変更
         */
        updateSize(newSize, value = null, callPlacementNew = true) {
          const curSize = this._size;
          if (curSize < newSize) {
            this.prepareCapacity(newSize);
            if (callPlacementNew) {
              for (let i = this._size; i < newSize; i++) {
                if (typeof value == "function") {
                  this._ptr[i] = JSON.parse(JSON.stringify(new value()));
                } else {
                  this._ptr[i] = value;
                }
              }
            } else {
              for (let i = this._size; i < newSize; i++) {
                this._ptr[i] = value;
              }
            }
          } else {
            const sub = this._size - newSize;
            this._ptr.splice(this._size - sub, sub);
          }
          this._size = newSize;
        }
        /**
         * コンテナにコンテナ要素を挿入する
         * @param position 挿入する位置
         * @param begin 挿入するコンテナの開始位置
         * @param end 挿入するコンテナの終端位置
         */
        insert(position, begin, end) {
          let dstSi = position._index;
          const srcSi = begin._index;
          const srcEi = end._index;
          const addCount = srcEi - srcSi;
          this.prepareCapacity(this._size + addCount);
          const addSize = this._size - dstSi;
          if (addSize > 0) {
            for (let i = 0; i < addSize; i++) {
              this._ptr.splice(dstSi + i, 0, null);
            }
          }
          for (let i = srcSi; i < srcEi; i++, dstSi++) {
            this._ptr[dstSi] = begin._vector._ptr[i];
          }
          this._size = this._size + addCount;
        }
        /**
         * コンテナからインデックスで指定した要素を削除する
         * @param index インデックス値
         * @return true 削除実行
         * @return false 削除範囲外
         */
        remove(index) {
          if (index < 0 || this._size <= index) {
            return false;
          }
          this._ptr.splice(index, 1);
          --this._size;
          return true;
        }
        /**
         * コンテナから要素を削除して他の要素をシフトする
         * @param ite 削除する要素
         */
        erase(ite) {
          const index = ite._index;
          if (index < 0 || this._size <= index) {
            return ite;
          }
          this._ptr.splice(index, 1);
          --this._size;
          const ite2 = new iterator(this, index);
          return ite2;
        }
        /**
         * コンテナのキャパシティを確保する
         * @param newSize 新たなキャパシティ。引数の値が現在のサイズ未満の場合は何もしない.
         */
        prepareCapacity(newSize) {
          if (newSize > this._capacity) {
            if (this._capacity == 0) {
              this._ptr = new Array(newSize);
              this._capacity = newSize;
            } else {
              this._ptr.length = newSize;
              this._capacity = newSize;
            }
          }
        }
        /**
         * コンテナの先頭要素を返す
         */
        begin() {
          const ite = this._size == 0 ? this.end() : new iterator(this, 0);
          return ite;
        }
        /**
         * コンテナの終端要素を返す
         */
        end() {
          const ite = new iterator(this, this._size);
          return ite;
        }
        getOffset(offset) {
          const newVector = new _csmVector();
          newVector._ptr = this.get(offset);
          newVector._size = this.get(offset).length;
          newVector._capacity = this.get(offset).length;
          return newVector;
        }
      };
      exports.csmVector = csmVector;
      csmVector.DefaultSize = 10;
      var iterator = class _iterator {
        /**
         * コンストラクタ
         */
        constructor(v, index) {
          this._vector = v != void 0 ? v : null;
          this._index = index != void 0 ? index : 0;
        }
        /**
         * 代入
         */
        set(ite) {
          this._index = ite._index;
          this._vector = ite._vector;
          return this;
        }
        /**
         * 前置き++演算
         */
        preIncrement() {
          ++this._index;
          return this;
        }
        /**
         * 前置き--演算
         */
        preDecrement() {
          --this._index;
          return this;
        }
        /**
         * 後置き++演算子
         */
        increment() {
          const iteold = new _iterator(this._vector, this._index++);
          return iteold;
        }
        /**
         * 後置き--演算子
         */
        decrement() {
          const iteold = new _iterator(this._vector, this._index--);
          return iteold;
        }
        /**
         * ptr
         */
        ptr() {
          return this._vector._ptr[this._index];
        }
        /**
         * =演算子のオーバーロード
         */
        substitution(ite) {
          this._index = ite._index;
          this._vector = ite._vector;
          return this;
        }
        /**
         * !=演算子のオーバーロード
         */
        notEqual(ite) {
          return this._index != ite._index || this._vector != ite._vector;
        }
      };
      exports.iterator = iterator;
      var $ = __importStar(require_csmvector());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.csmVector = $.csmVector;
        Live2DCubismFramework2.iterator = $.iterator;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/type/csmstring.js
  var require_csmstring = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/type/csmstring.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.csmString = void 0;
      var csmString = class {
        /**
         * 文字列を後方に追加する
         *
         * @param c 追加する文字列
         * @return 更新された文字列
         */
        append(c, length) {
          this.s += length !== void 0 ? c.substr(0, length) : c;
          return this;
        }
        /**
         * 文字サイズを拡張して文字を埋める
         * @param length    拡張する文字数
         * @param v         埋める文字
         * @return 更新された文字列
         */
        expansion(length, v) {
          for (let i = 0; i < length; i++) {
            this.append(v);
          }
          return this;
        }
        /**
         * 文字列の長さをバイト数で取得する
         */
        getBytes() {
          return encodeURIComponent(this.s).replace(/%../g, "x").length;
        }
        /**
         * 文字列の長さを返す
         */
        getLength() {
          return this.s.length;
        }
        /**
         * 文字列比較 <
         * @param s 比較する文字列
         * @return true:    比較する文字列より小さい
         * @return false:   比較する文字列より大きい
         */
        isLess(s) {
          return this.s < s.s;
        }
        /**
         * 文字列比較 >
         * @param s 比較する文字列
         * @return true:    比較する文字列より大きい
         * @return false:   比較する文字列より小さい
         */
        isGreat(s) {
          return this.s > s.s;
        }
        /**
         * 文字列比較 ==
         * @param s 比較する文字列
         * @return true:    比較する文字列と等しい
         * @return false:   比較する文字列と異なる
         */
        isEqual(s) {
          return this.s == s;
        }
        /**
         * 文字列が空かどうか
         * @return true: 空の文字列
         * @return false: 値が設定されている
         */
        isEmpty() {
          return this.s.length == 0;
        }
        /**
         * 引数付きコンストラクタ
         */
        constructor(s) {
          this.s = s;
        }
      };
      exports.csmString = csmString;
      var $ = __importStar(require_csmstring());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.csmString = $.csmString;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/id/cubismid.js
  var require_cubismid = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/id/cubismid.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismId = void 0;
      var csmstring_1 = require_csmstring();
      var CubismId = class _CubismId {
        /**
         * 内部で使用するCubismIdクラス生成メソッド
         *
         * @param id ID文字列
         * @returns CubismId
         * @note 指定したID文字列からCubismIdを取得する際は
         *       CubismIdManager().getId(id)を使用してください
         */
        static createIdInternal(id) {
          return new _CubismId(id);
        }
        /**
         * ID名を取得する
         */
        getString() {
          return this._id;
        }
        /**
         * idを比較
         * @param c 比較するid
         * @return 同じならばtrue,異なっていればfalseを返す
         */
        isEqual(c) {
          if (typeof c === "string") {
            return this._id.isEqual(c);
          } else if (c instanceof csmstring_1.csmString) {
            return this._id.isEqual(c.s);
          } else if (c instanceof _CubismId) {
            return this._id.isEqual(c._id.s);
          }
          return false;
        }
        /**
         * idを比較
         * @param c 比較するid
         * @return 同じならばtrue,異なっていればfalseを返す
         */
        isNotEqual(c) {
          if (typeof c == "string") {
            return !this._id.isEqual(c);
          } else if (c instanceof csmstring_1.csmString) {
            return !this._id.isEqual(c.s);
          } else if (c instanceof _CubismId) {
            return !this._id.isEqual(c._id.s);
          }
          return false;
        }
        /**
         * プライベートコンストラクタ
         *
         * @note ユーザーによる生成は許可しません
         */
        constructor(id) {
          if (typeof id === "string") {
            this._id = new csmstring_1.csmString(id);
            return;
          }
          this._id = id;
        }
      };
      exports.CubismId = CubismId;
      var $ = __importStar(require_cubismid());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismId = $.CubismId;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/id/cubismidmanager.js
  var require_cubismidmanager = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/id/cubismidmanager.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismIdManager = void 0;
      var csmvector_1 = require_csmvector();
      var cubismid_1 = require_cubismid();
      var CubismIdManager = class {
        /**
         * コンストラクタ
         */
        constructor() {
          this._ids = new csmvector_1.csmVector();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          for (let i = 0; i < this._ids.getSize(); ++i) {
            this._ids.set(i, void 0);
          }
          this._ids = null;
        }
        /**
         * ID名をリストから登録
         *
         * @param ids ID名リスト
         * @param count IDの個数
         */
        registerIds(ids) {
          for (let i = 0; i < ids.length; i++) {
            this.registerId(ids[i]);
          }
        }
        /**
         * ID名を登録
         *
         * @param id ID名
         */
        registerId(id) {
          let result = null;
          if ("string" == typeof id) {
            if ((result = this.findId(id)) != null) {
              return result;
            }
            result = cubismid_1.CubismId.createIdInternal(id);
            this._ids.pushBack(result);
          } else {
            return this.registerId(id.s);
          }
          return result;
        }
        /**
         * ID名からIDを取得する
         *
         * @param id ID名
         */
        getId(id) {
          return this.registerId(id);
        }
        /**
         * ID名からIDの確認
         *
         * @return true 存在する
         * @return false 存在しない
         */
        isExist(id) {
          if ("string" == typeof id) {
            return this.findId(id) != null;
          }
          return this.isExist(id.s);
        }
        /**
         * ID名からIDを検索する。
         *
         * @param id ID名
         * @return 登録されているID。なければNULL。
         */
        findId(id) {
          for (let i = 0; i < this._ids.getSize(); ++i) {
            if (this._ids.at(i).getString().isEqual(id)) {
              return this._ids.at(i);
            }
          }
          return null;
        }
      };
      exports.CubismIdManager = CubismIdManager;
      var $ = __importStar(require_cubismidmanager());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismIdManager = $.CubismIdManager;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/math/cubismmatrix44.js
  var require_cubismmatrix44 = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/math/cubismmatrix44.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismMatrix44 = void 0;
      var CubismMatrix44 = class _CubismMatrix44 {
        /**
         * コンストラクタ
         */
        constructor() {
          this._tr = new Float32Array(16);
          this.loadIdentity();
        }
        /**
         * 受け取った２つの行列の乗算を行う。
         *
         * @param a 行列a
         * @param b 行列b
         * @return 乗算結果の行列
         */
        static multiply(a, b, dst) {
          const c = new Float32Array([
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ]);
          const n = 4;
          for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
              for (let k = 0; k < n; ++k) {
                c[j + i * 4] += a[k + i * 4] * b[j + k * 4];
              }
            }
          }
          for (let i = 0; i < 16; ++i) {
            dst[i] = c[i];
          }
        }
        /**
         * 単位行列に初期化する
         */
        loadIdentity() {
          const c = new Float32Array([
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1
          ]);
          this.setMatrix(c);
        }
        /**
         * 行列を設定
         *
         * @param tr 16個の浮動小数点数で表される4x4の行列
         */
        setMatrix(tr) {
          for (let i = 0; i < 16; ++i) {
            this._tr[i] = tr[i];
          }
        }
        /**
         * 行列を浮動小数点数の配列で取得
         *
         * @return 16個の浮動小数点数で表される4x4の行列
         */
        getArray() {
          return this._tr;
        }
        /**
         * X軸の拡大率を取得
         * @return X軸の拡大率
         */
        getScaleX() {
          return this._tr[0];
        }
        /**
         * Y軸の拡大率を取得する
         *
         * @return Y軸の拡大率
         */
        getScaleY() {
          return this._tr[5];
        }
        /**
         * X軸の移動量を取得
         * @return X軸の移動量
         */
        getTranslateX() {
          return this._tr[12];
        }
        /**
         * Y軸の移動量を取得
         * @return Y軸の移動量
         */
        getTranslateY() {
          return this._tr[13];
        }
        /**
         * X軸の値を現在の行列で計算
         *
         * @param src X軸の値
         * @return 現在の行列で計算されたX軸の値
         */
        transformX(src) {
          return this._tr[0] * src + this._tr[12];
        }
        /**
         * Y軸の値を現在の行列で計算
         *
         * @param src Y軸の値
         * @return 現在の行列で計算されたY軸の値
         */
        transformY(src) {
          return this._tr[5] * src + this._tr[13];
        }
        /**
         * X軸の値を現在の行列で逆計算
         */
        invertTransformX(src) {
          return (src - this._tr[12]) / this._tr[0];
        }
        /**
         * Y軸の値を現在の行列で逆計算
         */
        invertTransformY(src) {
          return (src - this._tr[13]) / this._tr[5];
        }
        /**
         * 現在の行列の位置を起点にして移動
         *
         * 現在の行列の位置を起点にして相対的に移動する。
         *
         * @param x X軸の移動量
         * @param y Y軸の移動量
         */
        translateRelative(x, y) {
          const tr1 = new Float32Array([
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            x,
            y,
            0,
            1
          ]);
          _CubismMatrix44.multiply(tr1, this._tr, this._tr);
        }
        /**
         * 現在の行列の位置を移動
         *
         * 現在の行列の位置を指定した位置へ移動する
         *
         * @param x X軸の移動量
         * @param y y軸の移動量
         */
        translate(x, y) {
          this._tr[12] = x;
          this._tr[13] = y;
        }
        /**
         * 現在の行列のX軸の位置を指定した位置へ移動する
         *
         * @param x X軸の移動量
         */
        translateX(x) {
          this._tr[12] = x;
        }
        /**
         * 現在の行列のY軸の位置を指定した位置へ移動する
         *
         * @param y Y軸の移動量
         */
        translateY(y) {
          this._tr[13] = y;
        }
        /**
         * 現在の行列の拡大率を相対的に設定する
         *
         * @param x X軸の拡大率
         * @param y Y軸の拡大率
         */
        scaleRelative(x, y) {
          const tr1 = new Float32Array([
            x,
            0,
            0,
            0,
            0,
            y,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1
          ]);
          _CubismMatrix44.multiply(tr1, this._tr, this._tr);
        }
        /**
         * 現在の行列の拡大率を指定した倍率に設定する
         *
         * @param x X軸の拡大率
         * @param y Y軸の拡大率
         */
        scale(x, y) {
          this._tr[0] = x;
          this._tr[5] = y;
        }
        /**
         * 引数で与えられた行列にこの行列を乗算する。
         * (引数で与えられた行列) * (この行列)
         *
         * @note 関数名と実際の計算内容に乖離があるため、今後計算順が修正される可能性があります。
         * @param m 行列
         */
        multiplyByMatrix(m) {
          _CubismMatrix44.multiply(m.getArray(), this._tr, this._tr);
        }
        /**
         * オブジェクトのコピーを生成する
         */
        clone() {
          const cloneMatrix = new _CubismMatrix44();
          for (let i = 0; i < this._tr.length; i++) {
            cloneMatrix._tr[i] = this._tr[i];
          }
          return cloneMatrix;
        }
      };
      exports.CubismMatrix44 = CubismMatrix44;
      var $ = __importStar(require_cubismmatrix44());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismMatrix44 = $.CubismMatrix44;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/type/csmrectf.js
  var require_csmrectf = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/type/csmrectf.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.csmRect = void 0;
      var csmRect = class {
        /**
         * コンストラクタ
         * @param x 左端X座標
         * @param y 上端Y座標
         * @param w 幅
         * @param h 高さ
         */
        constructor(x, y, w, h) {
          this.x = x;
          this.y = y;
          this.width = w;
          this.height = h;
        }
        /**
         * 矩形中央のX座標を取得する
         */
        getCenterX() {
          return this.x + 0.5 * this.width;
        }
        /**
         * 矩形中央のY座標を取得する
         */
        getCenterY() {
          return this.y + 0.5 * this.height;
        }
        /**
         * 右側のX座標を取得する
         */
        getRight() {
          return this.x + this.width;
        }
        /**
         * 下端のY座標を取得する
         */
        getBottom() {
          return this.y + this.height;
        }
        /**
         * 矩形に値をセットする
         * @param r 矩形のインスタンス
         */
        setRect(r) {
          this.x = r.x;
          this.y = r.y;
          this.width = r.width;
          this.height = r.height;
        }
        /**
         * 矩形中央を軸にして縦横を拡縮する
         * @param w 幅方向に拡縮する量
         * @param h 高さ方向に拡縮する量
         */
        expand(w, h) {
          this.x -= w;
          this.y -= h;
          this.width += w * 2;
          this.height += h * 2;
        }
      };
      exports.csmRect = csmRect;
      var $ = __importStar(require_csmrectf());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.csmRect = $.csmRect;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/rendering/cubismrenderer.js
  var require_cubismrenderer = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/rendering/cubismrenderer.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismClippingContext = exports.CubismTextureColor = exports.CubismBlendMode = exports.CubismRenderer = void 0;
      var cubismmatrix44_1 = require_cubismmatrix44();
      var csmrectf_1 = require_csmrectf();
      var CubismRenderer = class {
        /**
         * レンダラのインスタンスを生成して取得する
         *
         * @return レンダラのインスタンス
         */
        static create() {
          return null;
        }
        /**
         * レンダラのインスタンスを解放する
         */
        static delete(renderer) {
          renderer = null;
        }
        /**
         * レンダラの初期化処理を実行する
         * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
         * @param model モデルのインスタンス
         */
        initialize(model) {
          this._model = model;
        }
        /**
         * モデルを描画する
         */
        drawModel() {
          if (this.getModel() == null)
            return;
          this.saveProfile();
          this.doDrawModel();
          this.restoreProfile();
        }
        /**
         * Model-View-Projection 行列をセットする
         * 配列は複製されるので、元の配列は外で破棄して良い
         * @param matrix44 Model-View-Projection 行列
         */
        setMvpMatrix(matrix44) {
          this._mvpMatrix4x4.setMatrix(matrix44.getArray());
        }
        /**
         * Model-View-Projection 行列を取得する
         * @return Model-View-Projection 行列
         */
        getMvpMatrix() {
          return this._mvpMatrix4x4;
        }
        /**
         * モデルの色をセットする
         * 各色0.0~1.0の間で指定する（1.0が標準の状態）
         * @param red 赤チャンネルの値
         * @param green 緑チャンネルの値
         * @param blue 青チャンネルの値
         * @param alpha αチャンネルの値
         */
        setModelColor(red, green, blue, alpha) {
          if (red < 0) {
            red = 0;
          } else if (red > 1) {
            red = 1;
          }
          if (green < 0) {
            green = 0;
          } else if (green > 1) {
            green = 1;
          }
          if (blue < 0) {
            blue = 0;
          } else if (blue > 1) {
            blue = 1;
          }
          if (alpha < 0) {
            alpha = 0;
          } else if (alpha > 1) {
            alpha = 1;
          }
          this._modelColor.r = red;
          this._modelColor.g = green;
          this._modelColor.b = blue;
          this._modelColor.a = alpha;
        }
        /**
         * モデルの色を取得する
         * 各色0.0~1.0の間で指定する(1.0が標準の状態)
         *
         * @return RGBAのカラー情報
         */
        getModelColor() {
          return JSON.parse(JSON.stringify(this._modelColor));
        }
        /**
         * 透明度を考慮したモデルの色を計算する。
         *
         * @param opacity 透明度
         *
         * @return RGBAのカラー情報
         */
        getModelColorWithOpacity(opacity) {
          const modelColorRGBA = this.getModelColor();
          modelColorRGBA.a *= opacity;
          if (this.isPremultipliedAlpha()) {
            modelColorRGBA.r *= modelColorRGBA.a;
            modelColorRGBA.g *= modelColorRGBA.a;
            modelColorRGBA.b *= modelColorRGBA.a;
          }
          return modelColorRGBA;
        }
        /**
         * 乗算済みαの有効・無効をセットする
         * 有効にするならtrue、無効にするならfalseをセットする
         */
        setIsPremultipliedAlpha(enable) {
          this._isPremultipliedAlpha = enable;
        }
        /**
         * 乗算済みαの有効・無効を取得する
         * @return true 乗算済みのα有効
         * @return false 乗算済みのα無効
         */
        isPremultipliedAlpha() {
          return this._isPremultipliedAlpha;
        }
        /**
         * カリング（片面描画）の有効・無効をセットする。
         * 有効にするならtrue、無効にするならfalseをセットする
         */
        setIsCulling(culling) {
          this._isCulling = culling;
        }
        /**
         * カリング（片面描画）の有効・無効を取得する。
         * @return true カリング有効
         * @return false カリング無効
         */
        isCulling() {
          return this._isCulling;
        }
        /**
         * テクスチャの異方性フィルタリングのパラメータをセットする
         * パラメータ値の影響度はレンダラの実装に依存する
         * @param n パラメータの値
         */
        setAnisotropy(n) {
          this._anisotropy = n;
        }
        /**
         * テクスチャの異方性フィルタリングのパラメータをセットする
         * @return 異方性フィルタリングのパラメータ
         */
        getAnisotropy() {
          return this._anisotropy;
        }
        /**
         * レンダリングするモデルを取得する
         * @return レンダリングするモデル
         */
        getModel() {
          return this._model;
        }
        /**
         * マスク描画の方式を変更する。
         * falseの場合、マスクを1枚のテクスチャに分割してレンダリングする（デフォルト）
         * 高速だが、マスク個数の上限が36に限定され、質も荒くなる
         * trueの場合、パーツ描画の前にその都度必要なマスクを描き直す
         * レンダリング品質は高いが描画処理負荷は増す
         * @param high 高精細マスクに切り替えるか？
         */
        useHighPrecisionMask(high) {
          this._useHighPrecisionMask = high;
        }
        /**
         * マスクの描画方式を取得する
         * @return true 高精細方式
         * @return false デフォルト
         */
        isUsingHighPrecisionMask() {
          return this._useHighPrecisionMask;
        }
        /**
         * コンストラクタ
         */
        constructor() {
          this._isCulling = false;
          this._isPremultipliedAlpha = false;
          this._anisotropy = 0;
          this._model = null;
          this._modelColor = new CubismTextureColor();
          this._useHighPrecisionMask = false;
          this._mvpMatrix4x4 = new cubismmatrix44_1.CubismMatrix44();
          this._mvpMatrix4x4.loadIdentity();
        }
      };
      exports.CubismRenderer = CubismRenderer;
      var CubismBlendMode;
      (function(CubismBlendMode2) {
        CubismBlendMode2[CubismBlendMode2["CubismBlendMode_Normal"] = 0] = "CubismBlendMode_Normal";
        CubismBlendMode2[CubismBlendMode2["CubismBlendMode_Additive"] = 1] = "CubismBlendMode_Additive";
        CubismBlendMode2[CubismBlendMode2["CubismBlendMode_Multiplicative"] = 2] = "CubismBlendMode_Multiplicative";
      })(CubismBlendMode || (exports.CubismBlendMode = CubismBlendMode = {}));
      var CubismTextureColor = class {
        /**
         * コンストラクタ
         */
        constructor(r = 1, g = 1, b = 1, a = 1) {
          this.r = r;
          this.g = g;
          this.b = b;
          this.a = a;
        }
      };
      exports.CubismTextureColor = CubismTextureColor;
      var CubismClippingContext = class {
        /**
         * 引数付きコンストラクタ
         */
        constructor(clippingDrawableIndices, clipCount) {
          this._clippingIdList = clippingDrawableIndices;
          this._clippingIdCount = clipCount;
          this._allClippedDrawRect = new csmrectf_1.csmRect();
          this._layoutBounds = new csmrectf_1.csmRect();
          this._clippedDrawableIndexList = [];
          this._matrixForMask = new cubismmatrix44_1.CubismMatrix44();
          this._matrixForDraw = new cubismmatrix44_1.CubismMatrix44();
          this._bufferIndex = 0;
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          if (this._layoutBounds != null) {
            this._layoutBounds = null;
          }
          if (this._allClippedDrawRect != null) {
            this._allClippedDrawRect = null;
          }
          if (this._clippedDrawableIndexList != null) {
            this._clippedDrawableIndexList = null;
          }
        }
        /**
         * このマスクにクリップされる描画オブジェクトを追加する
         *
         * @param drawableIndex クリッピング対象に追加する描画オブジェクトのインデックス
         */
        addClippedDrawable(drawableIndex) {
          this._clippedDrawableIndexList.push(drawableIndex);
        }
      };
      exports.CubismClippingContext = CubismClippingContext;
      var $ = __importStar(require_cubismrenderer());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismBlendMode = $.CubismBlendMode;
        Live2DCubismFramework2.CubismRenderer = $.CubismRenderer;
        Live2DCubismFramework2.CubismTextureColor = $.CubismTextureColor;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/cubismframeworkconfig.js
  var require_cubismframeworkconfig = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/cubismframeworkconfig.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CSM_LOG_LEVEL = exports.CSM_LOG_LEVEL_OFF = exports.CSM_LOG_LEVEL_ERROR = exports.CSM_LOG_LEVEL_WARNING = exports.CSM_LOG_LEVEL_INFO = exports.CSM_LOG_LEVEL_DEBUG = exports.CSM_LOG_LEVEL_VERBOSE = void 0;
      exports.CSM_LOG_LEVEL_VERBOSE = 0;
      exports.CSM_LOG_LEVEL_DEBUG = 1;
      exports.CSM_LOG_LEVEL_INFO = 2;
      exports.CSM_LOG_LEVEL_WARNING = 3;
      exports.CSM_LOG_LEVEL_ERROR = 4;
      exports.CSM_LOG_LEVEL_OFF = 5;
      exports.CSM_LOG_LEVEL = exports.CSM_LOG_LEVEL_VERBOSE;
    }
  });

  // node_modules/live2d-renderer/build/framework/src/utils/cubismdebug.js
  var require_cubismdebug = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/utils/cubismdebug.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismDebug = exports.CubismLogError = exports.CubismLogWarning = exports.CubismLogInfo = exports.CubismLogDebug = exports.CubismLogVerbose = exports.CSM_ASSERT = exports.CubismLogPrintIn = exports.CubismLogPrint = void 0;
      var cubismframeworkconfig_1 = require_cubismframeworkconfig();
      var live2dcubismframework_1 = require_live2dcubismframework();
      var CubismLogPrint = (level, fmt, args) => {
        CubismDebug.print(level, "[CSM]" + fmt, args);
      };
      exports.CubismLogPrint = CubismLogPrint;
      var CubismLogPrintIn = (level, fmt, args) => {
        (0, exports.CubismLogPrint)(level, fmt + "\n", args);
      };
      exports.CubismLogPrintIn = CubismLogPrintIn;
      var CSM_ASSERT = (expr) => {
        console.assert(expr);
      };
      exports.CSM_ASSERT = CSM_ASSERT;
      if (cubismframeworkconfig_1.CSM_LOG_LEVEL <= cubismframeworkconfig_1.CSM_LOG_LEVEL_VERBOSE) {
        exports.CubismLogVerbose = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Verbose, "[V]" + fmt, args);
        };
        exports.CubismLogDebug = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Debug, "[D]" + fmt, args);
        };
        exports.CubismLogInfo = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Info, "[I]" + fmt, args);
        };
        exports.CubismLogWarning = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Warning, "[W]" + fmt, args);
        };
        exports.CubismLogError = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Error, "[E]" + fmt, args);
        };
      } else if (cubismframeworkconfig_1.CSM_LOG_LEVEL == cubismframeworkconfig_1.CSM_LOG_LEVEL_DEBUG) {
        exports.CubismLogDebug = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Debug, "[D]" + fmt, args);
        };
        exports.CubismLogInfo = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Info, "[I]" + fmt, args);
        };
        exports.CubismLogWarning = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Warning, "[W]" + fmt, args);
        };
        exports.CubismLogError = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Error, "[E]" + fmt, args);
        };
      } else if (cubismframeworkconfig_1.CSM_LOG_LEVEL == cubismframeworkconfig_1.CSM_LOG_LEVEL_INFO) {
        exports.CubismLogInfo = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Info, "[I]" + fmt, args);
        };
        exports.CubismLogWarning = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Warning, "[W]" + fmt, args);
        };
        exports.CubismLogError = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Error, "[E]" + fmt, args);
        };
      } else if (cubismframeworkconfig_1.CSM_LOG_LEVEL == cubismframeworkconfig_1.CSM_LOG_LEVEL_WARNING) {
        exports.CubismLogWarning = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Warning, "[W]" + fmt, args);
        };
        exports.CubismLogError = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Error, "[E]" + fmt, args);
        };
      } else if (cubismframeworkconfig_1.CSM_LOG_LEVEL == cubismframeworkconfig_1.CSM_LOG_LEVEL_ERROR) {
        exports.CubismLogError = (fmt, ...args) => {
          (0, exports.CubismLogPrintIn)(live2dcubismframework_1.LogLevel.LogLevel_Error, "[E]" + fmt, args);
        };
      }
      var CubismDebug = class {
        /**
         * ログを出力する。第一引数にログレベルを設定する。
         * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
         *
         * @param logLevel ログレベルの設定
         * @param format 書式付き文字列
         * @param args 可変長引数
         */
        static print(logLevel, format, args) {
          if (logLevel < live2dcubismframework_1.CubismFramework.getLoggingLevel()) {
            return;
          }
          const logPrint = live2dcubismframework_1.CubismFramework.coreLogFunction;
          if (!logPrint)
            return;
          const buffer = format.replace(/\{(\d+)\}/g, (m, k) => {
            return args[k];
          });
          logPrint(buffer);
        }
        /**
         * データから指定した長さだけダンプ出力する。
         * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
         *
         * @param logLevel ログレベルの設定
         * @param data ダンプするデータ
         * @param length ダンプする長さ
         */
        static dumpBytes(logLevel, data, length) {
          for (let i = 0; i < length; i++) {
            if (i % 16 == 0 && i > 0)
              this.print(logLevel, "\n");
            else if (i % 8 == 0 && i > 0)
              this.print(logLevel, "  ");
            this.print(logLevel, "{0} ", [data[i] & 255]);
          }
          this.print(logLevel, "\n");
        }
        /**
         * private コンストラクタ
         */
        constructor() {
        }
      };
      exports.CubismDebug = CubismDebug;
      var $ = __importStar(require_cubismdebug());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismDebug = $.CubismDebug;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/type/csmmap.js
  var require_csmmap = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/type/csmmap.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.iterator = exports.csmMap = exports.csmPair = void 0;
      var cubismdebug_1 = require_cubismdebug();
      var csmPair = class {
        /**
         * コンストラクタ
         * @param key Keyとしてセットする値
         * @param value Valueとしてセットする値
         */
        constructor(key, value) {
          this.first = key == void 0 ? null : key;
          this.second = value == void 0 ? null : value;
        }
      };
      exports.csmPair = csmPair;
      var csmMap = class _csmMap {
        /**
         * 引数付きコンストラクタ
         * @param size 初期化時点で確保するサイズ
         */
        constructor(size) {
          if (size != void 0) {
            if (size < 1) {
              this._keyValues = [];
              this._dummyValue = null;
              this._size = 0;
            } else {
              this._keyValues = new Array(size);
              this._size = size;
            }
          } else {
            this._keyValues = [];
            this._dummyValue = null;
            this._size = 0;
          }
        }
        /**
         * デストラクタ
         */
        release() {
          this.clear();
        }
        /**
         * キーを追加する
         * @param key 新たに追加するキー
         */
        appendKey(key) {
          let findIndex = -1;
          for (let i = 0; i < this._size; i++) {
            if (this._keyValues[i].first == key) {
              findIndex = i;
              break;
            }
          }
          if (findIndex != -1) {
            (0, cubismdebug_1.CubismLogWarning)("The key `{0}` is already append.", key);
            return;
          }
          this.prepareCapacity(this._size + 1, false);
          this._keyValues[this._size] = new csmPair(key);
          this._size += 1;
        }
        /**
         * 添字演算子[key]のオーバーロード(get)
         * @param key 添字から特定されるValue値
         */
        getValue(key) {
          let found = -1;
          for (let i = 0; i < this._size; i++) {
            if (this._keyValues[i].first == key) {
              found = i;
              break;
            }
          }
          if (found >= 0) {
            return this._keyValues[found].second;
          } else {
            this.appendKey(key);
            return this._keyValues[this._size - 1].second;
          }
        }
        /**
         * 添字演算子[key]のオーバーロード(set)
         * @param key 添字から特定されるValue値
         * @param value 代入するValue値
         */
        setValue(key, value) {
          let found = -1;
          for (let i = 0; i < this._size; i++) {
            if (this._keyValues[i].first == key) {
              found = i;
              break;
            }
          }
          if (found >= 0) {
            this._keyValues[found].second = value;
          } else {
            this.appendKey(key);
            this._keyValues[this._size - 1].second = value;
          }
        }
        /**
         * 引数で渡したKeyを持つ要素が存在するか
         * @param key 存在を確認するkey
         * @return true 引数で渡したkeyを持つ要素が存在する
         * @return false 引数で渡したkeyを持つ要素が存在しない
         */
        isExist(key) {
          for (let i = 0; i < this._size; i++) {
            if (this._keyValues[i].first == key) {
              return true;
            }
          }
          return false;
        }
        /**
         * keyValueのポインタを全て解放する
         */
        clear() {
          this._keyValues = void 0;
          this._keyValues = null;
          this._keyValues = [];
          this._size = 0;
        }
        /**
         * コンテナのサイズを取得する
         *
         * @return コンテナのサイズ
         */
        getSize() {
          return this._size;
        }
        /**
         * コンテナのキャパシティを確保する
         * @param newSize 新たなキャパシティ。引数の値が現在のサイズ未満の場合は何もしない。
         * @param fitToSize trueなら指定したサイズに合わせる。falseならサイズを2倍確保しておく。
         */
        prepareCapacity(newSize, fitToSize) {
          if (newSize > this._keyValues.length) {
            if (this._keyValues.length == 0) {
              if (!fitToSize && newSize < _csmMap.DefaultSize)
                newSize = _csmMap.DefaultSize;
              this._keyValues.length = newSize;
            } else {
              if (!fitToSize && newSize < this._keyValues.length * 2)
                newSize = this._keyValues.length * 2;
              this._keyValues.length = newSize;
            }
          }
        }
        /**
         * コンテナの先頭要素を返す
         */
        begin() {
          const ite = new iterator(this, 0);
          return ite;
        }
        /**
         * コンテナの終端要素を返す
         */
        end() {
          const ite = new iterator(this, this._size);
          return ite;
        }
        /**
         * コンテナから要素を削除する
         *
         * @param ite 削除する要素
         */
        erase(ite) {
          const index = ite._index;
          if (index < 0 || this._size <= index) {
            return ite;
          }
          this._keyValues.splice(index, 1);
          --this._size;
          const ite2 = new iterator(this, index);
          return ite2;
        }
        /**
         * コンテナの値を32ビット符号付き整数型でダンプする
         */
        dumpAsInt() {
          for (let i = 0; i < this._size; i++) {
            (0, cubismdebug_1.CubismLogDebug)("{0} ,", this._keyValues[i]);
            (0, cubismdebug_1.CubismLogDebug)("\n");
          }
        }
      };
      exports.csmMap = csmMap;
      csmMap.DefaultSize = 10;
      var iterator = class _iterator {
        /**
         * コンストラクタ
         */
        constructor(v, idx) {
          this._map = v != void 0 ? v : new csmMap();
          this._index = idx != void 0 ? idx : 0;
        }
        /**
         * =演算子のオーバーロード
         */
        set(ite) {
          this._index = ite._index;
          this._map = ite._map;
          return this;
        }
        /**
         * 前置き++演算子のオーバーロード
         */
        preIncrement() {
          ++this._index;
          return this;
        }
        /**
         * 前置き--演算子のオーバーロード
         */
        preDecrement() {
          --this._index;
          return this;
        }
        /**
         * 後置き++演算子のオーバーロード
         */
        increment() {
          const iteold = new _iterator(this._map, this._index++);
          return iteold;
        }
        /**
         * 後置き--演算子のオーバーロード
         */
        decrement() {
          const iteold = new _iterator(this._map, this._index);
          this._map = iteold._map;
          this._index = iteold._index;
          return this;
        }
        /**
         * *演算子のオーバーロード
         */
        ptr() {
          return this._map._keyValues[this._index];
        }
        /**
         * !=演算
         */
        notEqual(ite) {
          return this._index != ite._index || this._map != ite._map;
        }
      };
      exports.iterator = iterator;
      var $ = __importStar(require_csmmap());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.csmMap = $.csmMap;
        Live2DCubismFramework2.csmPair = $.csmPair;
        Live2DCubismFramework2.iterator = $.iterator;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/utils/cubismjsonextension.js
  var require_cubismjsonextension = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/utils/cubismjsonextension.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CubismJsonExtension = void 0;
      var cubismjson_1 = require_cubismjson();
      var CubismJsonExtension = class _CubismJsonExtension {
        static parseJsonObject(obj, map) {
          Object.keys(obj).forEach((key) => {
            if (typeof obj[key] == "boolean") {
              const convValue = Boolean(obj[key]);
              map.put(key, new cubismjson_1.JsonBoolean(convValue));
            } else if (typeof obj[key] == "string") {
              const convValue = String(obj[key]);
              map.put(key, new cubismjson_1.JsonString(convValue));
            } else if (typeof obj[key] == "number") {
              const convValue = Number(obj[key]);
              map.put(key, new cubismjson_1.JsonFloat(convValue));
            } else if (obj[key] instanceof Array) {
              map.put(key, _CubismJsonExtension.parseJsonArray(obj[key]));
            } else if (obj[key] instanceof Object) {
              map.put(key, _CubismJsonExtension.parseJsonObject(obj[key], new cubismjson_1.JsonMap()));
            } else if (obj[key] == null) {
              map.put(key, new cubismjson_1.JsonNullvalue());
            } else {
              map.put(key, obj[key]);
            }
          });
          return map;
        }
        static parseJsonArray(obj) {
          const arr = new cubismjson_1.JsonArray();
          Object.keys(obj).forEach((key) => {
            const convKey = Number(key);
            if (typeof convKey == "number") {
              if (typeof obj[key] == "boolean") {
                const convValue = Boolean(obj[key]);
                arr.add(new cubismjson_1.JsonBoolean(convValue));
              } else if (typeof obj[key] == "string") {
                const convValue = String(obj[key]);
                arr.add(new cubismjson_1.JsonString(convValue));
              } else if (typeof obj[key] == "number") {
                const convValue = Number(obj[key]);
                arr.add(new cubismjson_1.JsonFloat(convValue));
              } else if (obj[key] instanceof Array) {
                arr.add(this.parseJsonArray(obj[key]));
              } else if (obj[key] instanceof Object) {
                arr.add(this.parseJsonObject(obj[key], new cubismjson_1.JsonMap()));
              } else if (obj[key] == null) {
                arr.add(new cubismjson_1.JsonNullvalue());
              } else {
                arr.add(obj[key]);
              }
            } else if (obj[key] instanceof Array) {
              arr.add(this.parseJsonArray(obj[key]));
            } else if (obj[key] instanceof Object) {
              arr.add(this.parseJsonObject(obj[key], new cubismjson_1.JsonMap()));
            } else if (obj[key] == null) {
              arr.add(new cubismjson_1.JsonNullvalue());
            } else {
              const convValue = Array(obj[key]);
              for (let i = 0; i < convValue.length; i++) {
                arr.add(convValue[i]);
              }
            }
          });
          return arr;
        }
      };
      exports.CubismJsonExtension = CubismJsonExtension;
    }
  });

  // node_modules/live2d-renderer/build/framework/src/utils/cubismjson.js
  var require_cubismjson = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/utils/cubismjson.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.JsonMap = exports.JsonArray = exports.JsonNullvalue = exports.JsonError = exports.JsonString = exports.JsonBoolean = exports.JsonFloat = exports.CubismJson = exports.Value = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var csmmap_1 = require_csmmap();
      var csmstring_1 = require_csmstring();
      var csmvector_1 = require_csmvector();
      var cubismdebug_1 = require_cubismdebug();
      var CSM_JSON_ERROR_TYPE_MISMATCH = "Error: type mismatch";
      var CSM_JSON_ERROR_INDEX_OF_BOUNDS = "Error: index out of bounds";
      var Value = class _Value {
        /**
         * コンストラクタ
         */
        constructor() {
        }
        /**
         * 要素を文字列型で返す(string)
         */
        getRawString(defaultValue, indent) {
          return this.getString(defaultValue, indent);
        }
        /**
         * 要素を数値型で返す(number)
         */
        toInt(defaultValue = 0) {
          return defaultValue;
        }
        /**
         * 要素を数値型で返す(number)
         */
        toFloat(defaultValue = 0) {
          return defaultValue;
        }
        /**
         * 要素を真偽値で返す(boolean)
         */
        toBoolean(defaultValue = false) {
          return defaultValue;
        }
        /**
         * サイズを返す
         */
        getSize() {
          return 0;
        }
        /**
         * 要素を配列で返す(Value[])
         */
        getArray(defaultValue = null) {
          return defaultValue;
        }
        /**
         * 要素をコンテナで返す(array)
         */
        getVector(defaultValue = new csmvector_1.csmVector()) {
          return defaultValue;
        }
        /**
         * 要素をマップで返す(csmMap<csmString, Value>)
         */
        getMap(defaultValue) {
          return defaultValue;
        }
        /**
         * 添字演算子[index]
         */
        getValueByIndex(index) {
          return _Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }
        /**
         * 添字演算子[string | csmString]
         */
        getValueByString(s) {
          return _Value.nullValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }
        /**
         * マップのキー一覧をコンテナで返す
         *
         * @return マップのキーの一覧
         */
        getKeys() {
          return _Value.dummyKeys;
        }
        /**
         * Valueの種類がエラー値ならtrue
         */
        isError() {
          return false;
        }
        /**
         * Valueの種類がnullならtrue
         */
        isNull() {
          return false;
        }
        /**
         * Valueの種類が真偽値ならtrue
         */
        isBool() {
          return false;
        }
        /**
         * Valueの種類が数値型ならtrue
         */
        isFloat() {
          return false;
        }
        /**
         * Valueの種類が文字列ならtrue
         */
        isString() {
          return false;
        }
        /**
         * Valueの種類が配列ならtrue
         */
        isArray() {
          return false;
        }
        /**
         * Valueの種類がマップ型ならtrue
         */
        isMap() {
          return false;
        }
        equals(value) {
          return false;
        }
        /**
         * Valueの値が静的ならtrue、静的なら解放しない
         */
        isStatic() {
          return false;
        }
        /**
         * Valueにエラー値をセットする
         */
        setErrorNotForClientCall(errorStr) {
          return JsonError.errorValue;
        }
        /**
         * 初期化用メソッド
         */
        static staticInitializeNotForClientCall() {
          JsonBoolean.trueValue = new JsonBoolean(true);
          JsonBoolean.falseValue = new JsonBoolean(false);
          _Value.errorValue = new JsonError("ERROR", true);
          _Value.nullValue = new JsonNullvalue();
          _Value.dummyKeys = new csmvector_1.csmVector();
        }
        /**
         * リリース用メソッド
         */
        static staticReleaseNotForClientCall() {
          JsonBoolean.trueValue = null;
          JsonBoolean.falseValue = null;
          _Value.errorValue = null;
          _Value.nullValue = null;
          _Value.dummyKeys = null;
        }
      };
      exports.Value = Value;
      var CubismJson = class _CubismJson {
        /**
         * コンストラクタ
         */
        constructor(buffer, length) {
          this._parseCallback = cubismjsonextension_1.CubismJsonExtension.parseJsonObject;
          this._error = null;
          this._lineCount = 0;
          this._root = null;
          if (buffer != void 0) {
            this.parseBytes(buffer, length, this._parseCallback);
          }
        }
        /**
         * バイトデータから直接ロードしてパースする
         *
         * @param buffer バッファ
         * @param size バッファサイズ
         * @return CubismJsonクラスのインスタンス。失敗したらNULL
         */
        static create(buffer, size) {
          const json = new _CubismJson();
          const succeeded = json.parseBytes(buffer, size, json._parseCallback);
          if (!succeeded) {
            _CubismJson.delete(json);
            return null;
          } else {
            return json;
          }
        }
        /**
         * パースしたJSONオブジェクトの解放処理
         *
         * @param instance CubismJsonクラスのインスタンス
         */
        static delete(instance) {
          instance = null;
        }
        /**
         * パースしたJSONのルート要素を返す
         */
        getRoot() {
          return this._root;
        }
        /**
         *  UnicodeのバイナリをStringに変換
         *
         * @param buffer 変換するバイナリデータ
         * @return 変換後の文字列
         */
        static arrayBufferToString(buffer) {
          const uint8Array = new Uint8Array(buffer);
          let str = "";
          for (let i = 0, len = uint8Array.length; i < len; ++i) {
            str += "%" + this.pad(uint8Array[i].toString(16));
          }
          str = decodeURIComponent(str);
          return str;
        }
        /**
         * エンコード、パディング
         */
        static pad(n) {
          return n.length < 2 ? "0" + n : n;
        }
        /**
         * JSONのパースを実行する
         * @param buffer    パース対象のデータバイト
         * @param size      データバイトのサイズ
         * return true : 成功
         * return false: 失敗
         */
        parseBytes(buffer, size, parseCallback) {
          const endPos = new Array(1);
          const decodeBuffer = _CubismJson.arrayBufferToString(buffer);
          if (parseCallback == void 0) {
            this._root = this.parseValue(decodeBuffer, size, 0, endPos);
          } else {
            this._root = parseCallback(JSON.parse(decodeBuffer), new JsonMap());
          }
          if (this._error) {
            let strbuf = "\0";
            strbuf = "Json parse error : @line " + (this._lineCount + 1) + "\n";
            this._root = new JsonString(strbuf);
            (0, cubismdebug_1.CubismLogInfo)("{0}", this._root.getRawString());
            return false;
          } else if (this._root == null) {
            this._root = new JsonError(new csmstring_1.csmString(this._error), false);
            return false;
          }
          return true;
        }
        /**
         * パース時のエラー値を返す
         */
        getParseError() {
          return this._error;
        }
        /**
         * ルート要素の次の要素がファイルの終端だったらtrueを返す
         */
        checkEndOfFile() {
          return this._root.getArray()[1].equals("EOF");
        }
        /**
         * JSONエレメントからValue(float,String,Value*,Array,null,true,false)をパースする
         * エレメントの書式に応じて内部でParseString(), ParseObject(), ParseArray()を呼ぶ
         *
         * @param   buffer      JSONエレメントのバッファ
         * @param   length      パースする長さ
         * @param   begin       パースを開始する位置
         * @param   outEndPos   パース終了時の位置
         * @return      パースから取得したValueオブジェクト
         */
        parseValue(buffer, length, begin, outEndPos) {
          if (this._error)
            return null;
          let o = null;
          let i = begin;
          let f;
          for (; i < length; i++) {
            const c = buffer[i];
            switch (c) {
              case "-":
              case ".":
              case "0":
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9": {
                const afterString = new Array(1);
                f = (0, live2dcubismframework_1.strtod)(buffer.slice(i), afterString);
                outEndPos[0] = buffer.indexOf(afterString[0]);
                return new JsonFloat(f);
              }
              case '"':
                return new JsonString(this.parseString(buffer, length, i + 1, outEndPos));
              // \"の次の文字から
              case "[":
                o = this.parseArray(buffer, length, i + 1, outEndPos);
                return o;
              case "{":
                o = this.parseObject(buffer, length, i + 1, outEndPos);
                return o;
              case "n":
                if (i + 3 < length) {
                  o = new JsonNullvalue();
                  outEndPos[0] = i + 4;
                } else {
                  this._error = "parse null";
                }
                return o;
              case "t":
                if (i + 3 < length) {
                  o = JsonBoolean.trueValue;
                  outEndPos[0] = i + 4;
                } else {
                  this._error = "parse true";
                }
                return o;
              case "f":
                if (i + 4 < length) {
                  o = JsonBoolean.falseValue;
                  outEndPos[0] = i + 5;
                } else {
                  this._error = "illegal ',' position";
                }
                return o;
              case ",":
                this._error = "illegal ',' position";
                return null;
              case "]":
                outEndPos[0] = i;
                return null;
              case "\n":
                this._lineCount++;
              // falls through
              case " ":
              case "	":
              case "\r":
              default:
                break;
            }
          }
          this._error = "illegal end of value";
          return null;
        }
        /**
         * 次の「"」までの文字列をパースする。
         *
         * @param   string  ->  パース対象の文字列
         * @param   length  ->  パースする長さ
         * @param   begin   ->  パースを開始する位置
         * @param  outEndPos   ->  パース終了時の位置
         * @return      パースした文F字列要素
         */
        parseString(string, length, begin, outEndPos) {
          if (this._error) {
            return null;
          }
          if (!string) {
            this._error = "string is null";
            return null;
          }
          let i = begin;
          let c, c2;
          const ret = new csmstring_1.csmString("");
          let bufStart = begin;
          for (; i < length; i++) {
            c = string[i];
            switch (c) {
              case '"': {
                outEndPos[0] = i + 1;
                ret.append(string.slice(bufStart), i - bufStart);
                return ret.s;
              }
              // falls through
              case "//": {
                i++;
                if (i - 1 > bufStart) {
                  ret.append(string.slice(bufStart), i - bufStart);
                }
                bufStart = i + 1;
                if (i < length) {
                  c2 = string[i];
                  switch (c2) {
                    case "\\":
                      ret.expansion(1, "\\");
                      break;
                    case '"':
                      ret.expansion(1, '"');
                      break;
                    case "/":
                      ret.expansion(1, "/");
                      break;
                    case "b":
                      ret.expansion(1, "\b");
                      break;
                    case "f":
                      ret.expansion(1, "\f");
                      break;
                    case "n":
                      ret.expansion(1, "\n");
                      break;
                    case "r":
                      ret.expansion(1, "\r");
                      break;
                    case "t":
                      ret.expansion(1, "	");
                      break;
                    case "u":
                      this._error = "parse string/unicord escape not supported";
                      break;
                    default:
                      break;
                  }
                } else {
                  this._error = "parse string/escape error";
                }
              }
              // falls through
              default: {
                break;
              }
            }
          }
          this._error = "parse string/illegal end";
          return null;
        }
        /**
         * JSONのオブジェクトエレメントをパースしてValueオブジェクトを返す
         *
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        parseObject(buffer, length, begin, outEndPos) {
          if (this._error) {
            return null;
          }
          if (!buffer) {
            this._error = "buffer is null";
            return null;
          }
          const ret = new JsonMap();
          let key = "";
          let i = begin;
          let c = "";
          const localRetEndPos2 = Array(1);
          let ok = false;
          for (; i < length; i++) {
            FOR_LOOP: for (; i < length; i++) {
              c = buffer[i];
              switch (c) {
                case '"':
                  key = this.parseString(buffer, length, i + 1, localRetEndPos2);
                  if (this._error) {
                    return null;
                  }
                  i = localRetEndPos2[0];
                  ok = true;
                  break FOR_LOOP;
                //-- loopから出る
                case "}":
                  outEndPos[0] = i + 1;
                  return ret;
                // 空
                case ":":
                  this._error = "illegal ':' position";
                  break;
                case "\n":
                  this._lineCount++;
                // falls through
                default:
                  break;
              }
            }
            if (!ok) {
              this._error = "key not found";
              return null;
            }
            ok = false;
            FOR_LOOP2: for (; i < length; i++) {
              c = buffer[i];
              switch (c) {
                case ":":
                  ok = true;
                  i++;
                  break FOR_LOOP2;
                case "}":
                  this._error = "illegal '}' position";
                  break;
                // falls through
                case "\n":
                  this._lineCount++;
                // case ' ': case '\t' : case '\r':
                // falls through
                default:
                  break;
              }
            }
            if (!ok) {
              this._error = "':' not found";
              return null;
            }
            const value = this.parseValue(buffer, length, i, localRetEndPos2);
            if (this._error) {
              return null;
            }
            i = localRetEndPos2[0];
            ret.put(key, value);
            FOR_LOOP3: for (; i < length; i++) {
              c = buffer[i];
              switch (c) {
                case ",":
                  break FOR_LOOP3;
                case "}":
                  outEndPos[0] = i + 1;
                  return ret;
                // 正常終了
                case "\n":
                  this._lineCount++;
                // falls through
                default:
                  break;
              }
            }
          }
          this._error = "illegal end of perseObject";
          return null;
        }
        /**
         * 次の「"」までの文字列をパースする。
         * @param buffer    JSONエレメントのバッファ
         * @param length    パースする長さ
         * @param begin     パースを開始する位置
         * @param outEndPos パース終了時の位置
         * @return パースから取得したValueオブジェクト
         */
        parseArray(buffer, length, begin, outEndPos) {
          if (this._error) {
            return null;
          }
          if (!buffer) {
            this._error = "buffer is null";
            return null;
          }
          let ret = new JsonArray();
          let i = begin;
          let c;
          const localRetEndpos2 = new Array(1);
          for (; i < length; i++) {
            const value = this.parseValue(buffer, length, i, localRetEndpos2);
            if (this._error) {
              return null;
            }
            i = localRetEndpos2[0];
            if (value) {
              ret.add(value);
            }
            FOR_LOOP: for (; i < length; i++) {
              c = buffer[i];
              switch (c) {
                case ",":
                  break FOR_LOOP;
                case "]":
                  outEndPos[0] = i + 1;
                  return ret;
                // 終了
                case "\n":
                  ++this._lineCount;
                //case ' ': case '\t': case '\r':
                // falls through
                default:
                  break;
              }
            }
          }
          ret = void 0;
          this._error = "illegal end of parseObject";
          return null;
        }
      };
      exports.CubismJson = CubismJson;
      var JsonFloat = class extends Value {
        /**
         * コンストラクタ
         */
        constructor(v) {
          super();
          this._value = v;
        }
        /**
         * Valueの種類が数値型ならtrue
         */
        isFloat() {
          return true;
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
          const strbuf = "\0";
          this._value = parseFloat(strbuf);
          this._stringBuffer = strbuf;
          return this._stringBuffer;
        }
        /**
         * 要素を数値型で返す(number)
         */
        toInt(defaultValue = 0) {
          return parseInt(this._value.toString());
        }
        /**
         * 要素を数値型で返す(number)
         */
        toFloat(defaultValue = 0) {
          return this._value;
        }
        equals(value) {
          if ("number" === typeof value) {
            if (Math.round(value)) {
              return false;
            } else {
              return value == this._value;
            }
          }
          return false;
        }
      };
      exports.JsonFloat = JsonFloat;
      var JsonBoolean = class extends Value {
        /**
         * Valueの種類が真偽値ならtrue
         */
        isBool() {
          return true;
        }
        /**
         * 要素を真偽値で返す(boolean)
         */
        toBoolean(defaultValue = false) {
          return this._boolValue;
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
          this._stringBuffer = this._boolValue ? "true" : "false";
          return this._stringBuffer;
        }
        equals(value) {
          if ("boolean" === typeof value) {
            return value == this._boolValue;
          }
          return false;
        }
        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        isStatic() {
          return true;
        }
        /**
         * 引数付きコンストラクタ
         */
        constructor(v) {
          super();
          this._boolValue = v;
        }
      };
      exports.JsonBoolean = JsonBoolean;
      var JsonString = class extends Value {
        constructor(s) {
          super();
          if ("string" === typeof s) {
            this._stringBuffer = s;
          }
          if (s instanceof csmstring_1.csmString) {
            this._stringBuffer = s.s;
          }
        }
        /**
         * Valueの種類が文字列ならtrue
         */
        isString() {
          return true;
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
          return this._stringBuffer;
        }
        equals(value) {
          if ("string" === typeof value) {
            return this._stringBuffer == value;
          }
          if (value instanceof csmstring_1.csmString) {
            return this._stringBuffer == value.s;
          }
          return false;
        }
      };
      exports.JsonString = JsonString;
      var JsonError = class extends JsonString {
        /**
         * Valueの値が静的ならtrue、静的なら解放しない
         */
        isStatic() {
          return this._isStatic;
        }
        /**
         * エラー情報をセットする
         */
        setErrorNotForClientCall(s) {
          this._stringBuffer = s;
          return this;
        }
        /**
         * 引数付きコンストラクタ
         */
        constructor(s, isStatic) {
          if ("string" === typeof s) {
            super(s);
          } else {
            super(s);
          }
          this._isStatic = isStatic;
        }
        /**
         * Valueの種類がエラー値ならtrue
         */
        isError() {
          return true;
        }
      };
      exports.JsonError = JsonError;
      var JsonNullvalue = class extends Value {
        /**
         * Valueの種類がNULL値ならtrue
         */
        isNull() {
          return true;
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
          return this._stringBuffer;
        }
        /**
         * Valueの値が静的ならtrue, 静的なら解放しない
         */
        isStatic() {
          return true;
        }
        /**
         * Valueにエラー値をセットする
         */
        setErrorNotForClientCall(s) {
          this._stringBuffer = s;
          return JsonError.nullValue;
        }
        /**
         * コンストラクタ
         */
        constructor() {
          super();
          this._stringBuffer = "NullValue";
        }
      };
      exports.JsonNullvalue = JsonNullvalue;
      var JsonArray = class extends Value {
        /**
         * コンストラクタ
         */
        constructor() {
          super();
          this._array = new csmvector_1.csmVector();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          for (let ite = this._array.begin(); ite.notEqual(this._array.end()); ite.preIncrement()) {
            let v = ite.ptr();
            if (v && !v.isStatic()) {
              v = void 0;
              v = null;
            }
          }
        }
        /**
         * Valueの種類が配列ならtrue
         */
        isArray() {
          return true;
        }
        /**
         * 添字演算子[index]
         */
        getValueByIndex(index) {
          if (index < 0 || this._array.getSize() <= index) {
            return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_INDEX_OF_BOUNDS);
          }
          const v = this._array.at(index);
          if (v == null) {
            return Value.nullValue;
          }
          return v;
        }
        /**
         * 添字演算子[string | csmString]
         */
        getValueByString(s) {
          return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
          const stringBuffer = indent + "[\n";
          for (let ite = this._array.begin(); ite.notEqual(this._array.end()); ite.increment()) {
            const v = ite.ptr();
            this._stringBuffer += indent + "" + v.getString(indent + " ") + "\n";
          }
          this._stringBuffer = stringBuffer + indent + "]\n";
          return this._stringBuffer;
        }
        /**
         * 配列要素を追加する
         * @param v 追加する要素
         */
        add(v) {
          this._array.pushBack(v);
        }
        /**
         * 要素をコンテナで返す(csmVector<Value>)
         */
        getVector(defaultValue = null) {
          return this._array;
        }
        /**
         * 要素の数を返す
         */
        getSize() {
          return this._array.getSize();
        }
      };
      exports.JsonArray = JsonArray;
      var JsonMap = class extends Value {
        /**
         * コンストラクタ
         */
        constructor() {
          super();
          this._map = new csmmap_1.csmMap();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          const ite = this._map.begin();
          while (ite.notEqual(this._map.end())) {
            let v = ite.ptr().second;
            if (v && !v.isStatic()) {
              v = void 0;
              v = null;
            }
            ite.preIncrement();
          }
        }
        /**
         * Valueの値がMap型ならtrue
         */
        isMap() {
          return true;
        }
        /**
         * 添字演算子[string | csmString]
         */
        getValueByString(s) {
          if (s instanceof csmstring_1.csmString) {
            const ret = this._map.getValue(s.s);
            if (ret == null) {
              return Value.nullValue;
            }
            return ret;
          }
          for (let iter = this._map.begin(); iter.notEqual(this._map.end()); iter.preIncrement()) {
            if (iter.ptr().first == s) {
              if (iter.ptr().second == null) {
                return Value.nullValue;
              }
              return iter.ptr().second;
            }
          }
          return Value.nullValue;
        }
        /**
         * 添字演算子[index]
         */
        getValueByIndex(index) {
          return Value.errorValue.setErrorNotForClientCall(CSM_JSON_ERROR_TYPE_MISMATCH);
        }
        /**
         * 要素を文字列で返す(csmString型)
         */
        getString(defaultValue, indent) {
          this._stringBuffer = indent + "{\n";
          const ite = this._map.begin();
          while (ite.notEqual(this._map.end())) {
            const key = ite.ptr().first;
            const v = ite.ptr().second;
            this._stringBuffer += indent + " " + key + " : " + v.getString(indent + "   ") + " \n";
            ite.preIncrement();
          }
          this._stringBuffer += indent + "}\n";
          return this._stringBuffer;
        }
        /**
         * 要素をMap型で返す
         */
        getMap(defaultValue) {
          return this._map;
        }
        /**
         * Mapに要素を追加する
         */
        put(key, v) {
          this._map.setValue(key, v);
        }
        /**
         * Mapからキーのリストを取得する
         */
        getKeys() {
          if (!this._keys) {
            this._keys = new csmvector_1.csmVector();
            const ite = this._map.begin();
            while (ite.notEqual(this._map.end())) {
              const key = ite.ptr().first;
              this._keys.pushBack(key);
              ite.preIncrement();
            }
          }
          return this._keys;
        }
        /**
         * Mapの要素数を取得する
         */
        getSize() {
          return this._keys.getSize();
        }
      };
      exports.JsonMap = JsonMap;
      var $ = __importStar(require_cubismjson());
      var cubismjsonextension_1 = require_cubismjsonextension();
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismJson = $.CubismJson;
        Live2DCubismFramework2.JsonArray = $.JsonArray;
        Live2DCubismFramework2.JsonBoolean = $.JsonBoolean;
        Live2DCubismFramework2.JsonError = $.JsonError;
        Live2DCubismFramework2.JsonFloat = $.JsonFloat;
        Live2DCubismFramework2.JsonMap = $.JsonMap;
        Live2DCubismFramework2.JsonNullvalue = $.JsonNullvalue;
        Live2DCubismFramework2.JsonString = $.JsonString;
        Live2DCubismFramework2.Value = $.Value;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/live2dcubismframework.js
  var require_live2dcubismframework = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/live2dcubismframework.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.LogLevel = exports.Option = exports.CubismFramework = exports.Constant = void 0;
      exports.strtod = strtod;
      exports.csmDelete = csmDelete;
      var cubismidmanager_1 = require_cubismidmanager();
      var cubismrenderer_1 = require_cubismrenderer();
      var cubismdebug_1 = require_cubismdebug();
      var cubismjson_1 = require_cubismjson();
      function strtod(s, endPtr) {
        let index = 0;
        for (let i = 1; ; i++) {
          const testC = s.slice(i - 1, i);
          if (testC == "e" || testC == "-" || testC == "E") {
            continue;
          }
          const test = s.substring(0, i);
          const number = Number(test);
          if (isNaN(number)) {
            break;
          }
          index = i;
        }
        let d = parseFloat(s);
        if (isNaN(d)) {
          d = NaN;
        }
        endPtr[0] = s.slice(index);
        return d;
      }
      var s_isStarted = false;
      var s_isInitialized = false;
      var s_option = null;
      var s_cubismIdManager = null;
      exports.Constant = Object.freeze({
        vertexOffset: 0,
        // メッシュ頂点のオフセット値
        vertexStep: 2
        // メッシュ頂点のステップ値
      });
      function csmDelete(address) {
        if (!address) {
          return;
        }
        address = void 0;
      }
      var CubismFramework = class {
        /**
         * Cubism FrameworkのAPIを使用可能にする。
         *  APIを実行する前に必ずこの関数を実行すること。
         *  一度準備が完了して以降は、再び実行しても内部処理がスキップされます。
         *
         * @param    option      Optionクラスのインスタンス
         *
         * @return   準備処理が完了したらtrueが返ります。
         */
        static startUp(option = null) {
          if (s_isStarted) {
            (0, cubismdebug_1.CubismLogInfo)("CubismFramework.startUp() is already done.");
            return s_isStarted;
          }
          s_option = option;
          if (s_option != null) {
            Live2DCubismCore.Logging.csmSetLogFunction(s_option.logFunction);
          }
          s_isStarted = true;
          if (s_isStarted) {
            const version = Live2DCubismCore.Version.csmGetVersion();
            const major = (version & 4278190080) >> 24;
            const minor = (version & 16711680) >> 16;
            const patch = version & 65535;
            const versionNumber = version;
            (0, cubismdebug_1.CubismLogInfo)(`Live2D Cubism Core version: {0}.{1}.{2} ({3})`, ("00" + major).slice(-2), ("00" + minor).slice(-2), ("0000" + patch).slice(-4), versionNumber);
          }
          (0, cubismdebug_1.CubismLogInfo)("CubismFramework.startUp() is complete.");
          return s_isStarted;
        }
        /**
         * StartUp()で初期化したCubismFrameworkの各パラメータをクリアします。
         * Dispose()したCubismFrameworkを再利用する際に利用してください。
         */
        static cleanUp() {
          s_isStarted = false;
          s_isInitialized = false;
          s_option = null;
          s_cubismIdManager = null;
        }
        /**
         * Cubism Framework内のリソースを初期化してモデルを表示可能な状態にします。<br>
         *     再度Initialize()するには先にDispose()を実行する必要があります。
         *
         * @param memorySize 初期化時メモリ量 [byte(s)]
         *    複数モデル表示時などにモデルが更新されない際に使用してください。
         *    指定する際は必ず1024*1024*16 byte(16MB)以上の値を指定してください。
         *    それ以外はすべて1024*1024*16 byteに丸めます。
         */
        static initialize(memorySize = 0) {
          (0, cubismdebug_1.CSM_ASSERT)(s_isStarted);
          if (!s_isStarted) {
            (0, cubismdebug_1.CubismLogWarning)("CubismFramework is not started.");
            return;
          }
          if (s_isInitialized) {
            (0, cubismdebug_1.CubismLogWarning)("CubismFramework.initialize() skipped, already initialized.");
            return;
          }
          cubismjson_1.Value.staticInitializeNotForClientCall();
          s_cubismIdManager = new cubismidmanager_1.CubismIdManager();
          Live2DCubismCore.Memory.initializeAmountOfMemory(memorySize);
          s_isInitialized = true;
          (0, cubismdebug_1.CubismLogInfo)("CubismFramework.initialize() is complete.");
        }
        /**
         * Cubism Framework内の全てのリソースを解放します。
         *      ただし、外部で確保されたリソースについては解放しません。
         *      外部で適切に破棄する必要があります。
         */
        static dispose() {
          (0, cubismdebug_1.CSM_ASSERT)(s_isStarted);
          if (!s_isStarted) {
            (0, cubismdebug_1.CubismLogWarning)("CubismFramework is not started.");
            return;
          }
          if (!s_isInitialized) {
            (0, cubismdebug_1.CubismLogWarning)("CubismFramework.dispose() skipped, not initialized.");
            return;
          }
          cubismjson_1.Value.staticReleaseNotForClientCall();
          s_cubismIdManager.release();
          s_cubismIdManager = null;
          cubismrenderer_1.CubismRenderer.staticRelease();
          s_isInitialized = false;
          (0, cubismdebug_1.CubismLogInfo)("CubismFramework.dispose() is complete.");
        }
        /**
         * Cubism FrameworkのAPIを使用する準備が完了したかどうか
         * @return APIを使用する準備が完了していればtrueが返ります。
         */
        static isStarted() {
          return s_isStarted;
        }
        /**
         * Cubism Frameworkのリソース初期化がすでに行われているかどうか
         * @return リソース確保が完了していればtrueが返ります
         */
        static isInitialized() {
          return s_isInitialized;
        }
        /**
         * Core APIにバインドしたログ関数を実行する
         *
         * @praram message ログメッセージ
         */
        static coreLogFunction(message) {
          if (!Live2DCubismCore.Logging.csmGetLogFunction()) {
            return;
          }
          Live2DCubismCore.Logging.csmGetLogFunction()(message);
        }
        /**
         * 現在のログ出力レベル設定の値を返す。
         *
         * @return  現在のログ出力レベル設定の値
         */
        static getLoggingLevel() {
          if (s_option != null) {
            return s_option.loggingLevel;
          }
          return LogLevel.LogLevel_Off;
        }
        /**
         * IDマネージャのインスタンスを取得する
         * @return CubismManagerクラスのインスタンス
         */
        static getIdManager() {
          return s_cubismIdManager;
        }
        /**
         * 静的クラスとして使用する
         * インスタンス化させない
         */
        constructor() {
        }
      };
      exports.CubismFramework = CubismFramework;
      var Option = class {
      };
      exports.Option = Option;
      var LogLevel;
      (function(LogLevel2) {
        LogLevel2[LogLevel2["LogLevel_Verbose"] = 0] = "LogLevel_Verbose";
        LogLevel2[LogLevel2["LogLevel_Debug"] = 1] = "LogLevel_Debug";
        LogLevel2[LogLevel2["LogLevel_Info"] = 2] = "LogLevel_Info";
        LogLevel2[LogLevel2["LogLevel_Warning"] = 3] = "LogLevel_Warning";
        LogLevel2[LogLevel2["LogLevel_Error"] = 4] = "LogLevel_Error";
        LogLevel2[LogLevel2["LogLevel_Off"] = 5] = "LogLevel_Off";
      })(LogLevel || (exports.LogLevel = LogLevel = {}));
      var $ = __importStar(require_live2dcubismframework());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.Constant = $.Constant;
        Live2DCubismFramework2.csmDelete = $.csmDelete;
        Live2DCubismFramework2.CubismFramework = $.CubismFramework;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/cubismmodelsettingjson.js
  var require_cubismmodelsettingjson = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/cubismmodelsettingjson.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismModelSettingJson = exports.FrequestNode = void 0;
      var icubismmodelsetting_1 = require_icubismmodelsetting();
      var live2dcubismframework_1 = require_live2dcubismframework();
      var csmvector_1 = require_csmvector();
      var cubismjson_1 = require_cubismjson();
      var FrequestNode;
      (function(FrequestNode2) {
        FrequestNode2[FrequestNode2["FrequestNode_Groups"] = 0] = "FrequestNode_Groups";
        FrequestNode2[FrequestNode2["FrequestNode_Moc"] = 1] = "FrequestNode_Moc";
        FrequestNode2[FrequestNode2["FrequestNode_Motions"] = 2] = "FrequestNode_Motions";
        FrequestNode2[FrequestNode2["FrequestNode_Expressions"] = 3] = "FrequestNode_Expressions";
        FrequestNode2[FrequestNode2["FrequestNode_Textures"] = 4] = "FrequestNode_Textures";
        FrequestNode2[FrequestNode2["FrequestNode_Physics"] = 5] = "FrequestNode_Physics";
        FrequestNode2[FrequestNode2["FrequestNode_Pose"] = 6] = "FrequestNode_Pose";
        FrequestNode2[FrequestNode2["FrequestNode_HitAreas"] = 7] = "FrequestNode_HitAreas";
      })(FrequestNode || (exports.FrequestNode = FrequestNode = {}));
      var CubismModelSettingJson = class extends icubismmodelsetting_1.ICubismModelSetting {
        /**
         * 引数付きコンストラクタ
         *
         * @param buffer    Model3Jsonをバイト配列として読み込んだデータバッファ
         * @param size      Model3Jsonのデータサイズ
         */
        constructor(buffer, size) {
          super();
          this.version = "Version";
          this.fileReferences = "FileReferences";
          this.groups = "Groups";
          this.layout = "Layout";
          this.hitAreas = "HitAreas";
          this.moc = "Moc";
          this.textures = "Textures";
          this.physics = "Physics";
          this.pose = "Pose";
          this.expressions = "Expressions";
          this.motions = "Motions";
          this.userData = "UserData";
          this.name = "Name";
          this.filePath = "File";
          this.id = "Id";
          this.ids = "Ids";
          this.target = "Target";
          this.idle = "Idle";
          this.tapBody = "TapBody";
          this.pinchIn = "PinchIn";
          this.pinchOut = "PinchOut";
          this.shake = "Shake";
          this.flickHead = "FlickHead";
          this.parameter = "Parameter";
          this.soundPath = "Sound";
          this.fadeInTime = "FadeInTime";
          this.fadeOutTime = "FadeOutTime";
          this.centerX = "CenterX";
          this.centerY = "CenterY";
          this.x = "X";
          this.y = "Y";
          this.width = "Width";
          this.height = "Height";
          this.lipSync = "LipSync";
          this.eyeBlink = "EyeBlink";
          this.initParameter = "init_param";
          this.initPartsVisible = "init_parts_visible";
          this.val = "val";
          this._json = cubismjson_1.CubismJson.create(buffer, size);
          if (this.getJson()) {
            this._jsonValue = new csmvector_1.csmVector();
            this._jsonValue.pushBack(this.getJson().getRoot().getValueByString(this.groups));
            this._jsonValue.pushBack(this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.moc));
            this._jsonValue.pushBack(this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.motions));
            this._jsonValue.pushBack(this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.expressions));
            this._jsonValue.pushBack(this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.textures));
            this._jsonValue.pushBack(this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.physics));
            this._jsonValue.pushBack(this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.pose));
            this._jsonValue.pushBack(this.getJson().getRoot().getValueByString(this.hitAreas));
          }
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          cubismjson_1.CubismJson.delete(this._json);
          this._jsonValue = null;
        }
        /**
         * CubismJsonオブジェクトを取得する
         *
         * @return CubismJson
         */
        getJson() {
          return this._json;
        }
        /**
         * Mocファイルの名前を取得する
         * @return Mocファイルの名前
         */
        getModelFileName() {
          if (!this.isExistModelFile()) {
            return "";
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Moc).getRawString();
        }
        /**
         * モデルが使用するテクスチャの数を取得する
         * テクスチャの数
         */
        getTextureCount() {
          if (!this.isExistTextureFiles()) {
            return 0;
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getSize();
        }
        /**
         * テクスチャが配置されたディレクトリの名前を取得する
         * @return テクスチャが配置されたディレクトリの名前
         */
        getTextureDirectory() {
          const texturePath = this._jsonValue.at(FrequestNode.FrequestNode_Textures).getValueByIndex(0).getRawString();
          const pathArray = texturePath.split("/");
          const arrayLength = pathArray.length - 1;
          let textureDirectoryStr = "";
          for (let i = 0; i < arrayLength; i++) {
            textureDirectoryStr += pathArray[i];
            if (i < arrayLength - 1) {
              textureDirectoryStr += "/";
            }
          }
          return textureDirectoryStr;
        }
        /**
         * モデルが使用するテクスチャの名前を取得する
         * @param index 配列のインデックス値
         * @return テクスチャの名前
         */
        getTextureFileName(index) {
          return this._jsonValue.at(FrequestNode.FrequestNode_Textures).getValueByIndex(index).getRawString();
        }
        /**
         * モデルに設定された当たり判定の数を取得する
         * @return モデルに設定された当たり判定の数
         */
        getHitAreasCount() {
          if (!this.isExistHitAreas()) {
            return 0;
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getSize();
        }
        /**
         * 当たり判定に設定されたIDを取得する
         *
         * @param index 配列のindex
         * @return 当たり判定に設定されたID
         */
        getHitAreaId(index) {
          return live2dcubismframework_1.CubismFramework.getIdManager().getId(this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getValueByIndex(index).getValueByString(this.id).getRawString());
        }
        /**
         * 当たり判定に設定された名前を取得する
         * @param index 配列のインデックス値
         * @return 当たり判定に設定された名前
         */
        getHitAreaName(index) {
          return this._jsonValue.at(FrequestNode.FrequestNode_HitAreas).getValueByIndex(index).getValueByString(this.name).getRawString();
        }
        /**
         * 物理演算設定ファイルの名前を取得する
         * @return 物理演算設定ファイルの名前
         */
        getPhysicsFileName() {
          if (!this.isExistPhysicsFile()) {
            return "";
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Physics).getRawString();
        }
        /**
         * パーツ切り替え設定ファイルの名前を取得する
         * @return パーツ切り替え設定ファイルの名前
         */
        getPoseFileName() {
          if (!this.isExistPoseFile()) {
            return "";
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Pose).getRawString();
        }
        /**
         * 表情設定ファイルの数を取得する
         * @return 表情設定ファイルの数
         */
        getExpressionCount() {
          if (!this.isExistExpressionFile()) {
            return 0;
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getSize();
        }
        /**
         * 表情設定ファイルを識別する名前（別名）を取得する
         * @param index 配列のインデックス値
         * @return 表情の名前
         */
        getExpressionName(index) {
          return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getValueByIndex(index).getValueByString(this.name).getRawString();
        }
        /**
         * 表情設定ファイルの名前を取得する
         * @param index 配列のインデックス値
         * @return 表情設定ファイルの名前
         */
        getExpressionFileName(index) {
          return this._jsonValue.at(FrequestNode.FrequestNode_Expressions).getValueByIndex(index).getValueByString(this.filePath).getRawString();
        }
        /**
         * モーショングループの数を取得する
         * @return モーショングループの数
         */
        getMotionGroupCount() {
          if (!this.isExistMotionGroups()) {
            return 0;
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getKeys().getSize();
        }
        /**
         * モーショングループの名前を取得する
         * @param index 配列のインデックス値
         * @return モーショングループの名前
         */
        getMotionGroupName(index) {
          if (!this.isExistMotionGroups()) {
            return null;
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getKeys().at(index);
        }
        /**
         * モーショングループに含まれるモーションの数を取得する
         * @param groupName モーショングループの名前
         * @return モーショングループの数
         */
        getMotionCount(groupName) {
          if (!this.isExistMotionGroupName(groupName)) {
            return 0;
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getSize();
        }
        /**
         * グループ名とインデックス値からモーションファイル名を取得する
         * @param groupName モーショングループの名前
         * @param index     配列のインデックス値
         * @return モーションファイルの名前
         */
        getMotionFileName(groupName, index) {
          if (!this.isExistMotionGroupName(groupName)) {
            return "";
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(this.filePath).getRawString();
        }
        /**
         * モーションに対応するサウンドファイルの名前を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return サウンドファイルの名前
         */
        getMotionSoundFileName(groupName, index) {
          if (!this.isExistMotionSoundFile(groupName, index)) {
            return "";
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(this.soundPath).getRawString();
        }
        /**
         * モーション開始時のフェードイン処理時間を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return フェードイン処理時間[秒]
         */
        getMotionFadeInTimeValue(groupName, index) {
          if (!this.isExistMotionFadeIn(groupName, index)) {
            return -1;
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(this.fadeInTime).toFloat();
        }
        /**
         * モーション終了時のフェードアウト処理時間を取得する
         * @param groupName モーショングループの名前
         * @param index 配列のインデックス値
         * @return フェードアウト処理時間[秒]
         */
        getMotionFadeOutTimeValue(groupName, index) {
          if (!this.isExistMotionFadeOut(groupName, index)) {
            return -1;
          }
          return this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(this.fadeOutTime).toFloat();
        }
        /**
         * ユーザーデータのファイル名を取得する
         * @return ユーザーデータのファイル名
         */
        getUserDataFile() {
          if (!this.isExistUserDataFile()) {
            return "";
          }
          return this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.userData).getRawString();
        }
        /**
         * レイアウト情報を取得する
         * @param outLayoutMap csmMapクラスのインスタンス
         * @return true レイアウト情報が存在する
         * @return false レイアウト情報が存在しない
         */
        getLayoutMap(outLayoutMap) {
          const map = this.getJson().getRoot().getValueByString(this.layout).getMap();
          if (map == null) {
            return false;
          }
          let ret = false;
          for (const ite = map.begin(); ite.notEqual(map.end()); ite.preIncrement()) {
            outLayoutMap.setValue(ite.ptr().first, ite.ptr().second.toFloat());
            ret = true;
          }
          return ret;
        }
        /**
         * 目パチに関連付けられたパラメータの数を取得する
         * @return 目パチに関連付けられたパラメータの数
         */
        getEyeBlinkParameterCount() {
          if (!this.isExistEyeBlinkParameters()) {
            return 0;
          }
          let num = 0;
          for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            const refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
              continue;
            }
            if (refI.getValueByString(this.name).getRawString() == this.eyeBlink) {
              num = refI.getValueByString(this.ids).getVector().getSize();
              break;
            }
          }
          return num;
        }
        /**
         * 目パチに関連付けられたパラメータのIDを取得する
         * @param index 配列のインデックス値
         * @return パラメータID
         */
        getEyeBlinkParameterId(index) {
          if (!this.isExistEyeBlinkParameters()) {
            return null;
          }
          for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            const refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
              continue;
            }
            if (refI.getValueByString(this.name).getRawString() == this.eyeBlink) {
              return live2dcubismframework_1.CubismFramework.getIdManager().getId(refI.getValueByString(this.ids).getValueByIndex(index).getRawString());
            }
          }
          return null;
        }
        /**
         * リップシンクに関連付けられたパラメータの数を取得する
         * @return リップシンクに関連付けられたパラメータの数
         */
        getLipSyncParameterCount() {
          if (!this.isExistLipSyncParameters()) {
            return 0;
          }
          let num = 0;
          for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            const refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
              continue;
            }
            if (refI.getValueByString(this.name).getRawString() == this.lipSync) {
              num = refI.getValueByString(this.ids).getVector().getSize();
              break;
            }
          }
          return num;
        }
        /**
         * リップシンクに関連付けられたパラメータの数を取得する
         * @param index 配列のインデックス値
         * @return パラメータID
         */
        getLipSyncParameterId(index) {
          if (!this.isExistLipSyncParameters()) {
            return null;
          }
          for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); i++) {
            const refI = this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i);
            if (refI.isNull() || refI.isError()) {
              continue;
            }
            if (refI.getValueByString(this.name).getRawString() == this.lipSync) {
              return live2dcubismframework_1.CubismFramework.getIdManager().getId(refI.getValueByString(this.ids).getValueByIndex(index).getRawString());
            }
          }
          return null;
        }
        /**
         * モデルファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistModelFile() {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_Moc);
          return !node.isNull() && !node.isError();
        }
        /**
         * テクスチャファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistTextureFiles() {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_Textures);
          return !node.isNull() && !node.isError();
        }
        /**
         * 当たり判定のキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistHitAreas() {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_HitAreas);
          return !node.isNull() && !node.isError();
        }
        /**
         * 物理演算ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistPhysicsFile() {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_Physics);
          return !node.isNull() && !node.isError();
        }
        /**
         * ポーズ設定ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistPoseFile() {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_Pose);
          return !node.isNull() && !node.isError();
        }
        /**
         * 表情設定ファイルのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistExpressionFile() {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_Expressions);
          return !node.isNull() && !node.isError();
        }
        /**
         * モーショングループのキーが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistMotionGroups() {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_Motions);
          return !node.isNull() && !node.isError();
        }
        /**
         * 引数で指定したモーショングループのキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistMotionGroupName(groupName) {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName);
          return !node.isNull() && !node.isError();
        }
        /**
         * 引数で指定したモーションに対応するサウンドファイルのキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistMotionSoundFile(groupName, index) {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(this.soundPath);
          return !node.isNull() && !node.isError();
        }
        /**
         * 引数で指定したモーションに対応するフェードイン時間のキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistMotionFadeIn(groupName, index) {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(this.fadeInTime);
          return !node.isNull() && !node.isError();
        }
        /**
         * 引数で指定したモーションに対応するフェードアウト時間のキーが存在するかどうかを確認する
         * @param groupName  グループ名
         * @param index 配列のインデックス値
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistMotionFadeOut(groupName, index) {
          const node = this._jsonValue.at(FrequestNode.FrequestNode_Motions).getValueByString(groupName).getValueByIndex(index).getValueByString(this.fadeOutTime);
          return !node.isNull() && !node.isError();
        }
        /**
         * UserDataのファイル名が存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistUserDataFile() {
          const node = this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.userData);
          return !node.isNull() && !node.isError();
        }
        /**
         * 目ぱちに対応付けられたパラメータが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistEyeBlinkParameters() {
          if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() || this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
            return false;
          }
          for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
            if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i).getValueByString(this.name).getRawString() == this.eyeBlink) {
              return true;
            }
          }
          return false;
        }
        /**
         * リップシンクに対応付けられたパラメータが存在するかどうかを確認する
         * @return true キーが存在する
         * @return false キーが存在しない
         */
        isExistLipSyncParameters() {
          if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).isNull() || this._jsonValue.at(FrequestNode.FrequestNode_Groups).isError()) {
            return false;
          }
          for (let i = 0; i < this._jsonValue.at(FrequestNode.FrequestNode_Groups).getSize(); ++i) {
            if (this._jsonValue.at(FrequestNode.FrequestNode_Groups).getValueByIndex(i).getValueByString(this.name).getRawString() == this.lipSync) {
              return true;
            }
          }
          return false;
        }
      };
      exports.CubismModelSettingJson = CubismModelSettingJson;
      var $ = __importStar(require_cubismmodelsettingjson());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismModelSettingJson = $.CubismModelSettingJson;
        Live2DCubismFramework2.FrequestNode = $.FrequestNode;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/cubismdefaultparameterid.js
  var require_cubismdefaultparameterid = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/cubismdefaultparameterid.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismDefaultParameterId = void 0;
      exports.CubismDefaultParameterId = Object.freeze({
        // パーツID
        HitAreaPrefix: "HitArea",
        HitAreaHead: "Head",
        HitAreaBody: "Body",
        PartsIdCore: "Parts01Core",
        PartsArmPrefix: "Parts01Arm_",
        PartsArmLPrefix: "Parts01ArmL_",
        PartsArmRPrefix: "Parts01ArmR_",
        // パラメータID
        ParamAngleX: "ParamAngleX",
        ParamAngleY: "ParamAngleY",
        ParamAngleZ: "ParamAngleZ",
        ParamEyeLOpen: "ParamEyeLOpen",
        ParamEyeLSmile: "ParamEyeLSmile",
        ParamEyeROpen: "ParamEyeROpen",
        ParamEyeRSmile: "ParamEyeRSmile",
        ParamEyeBallX: "ParamEyeBallX",
        ParamEyeBallY: "ParamEyeBallY",
        ParamEyeBallForm: "ParamEyeBallForm",
        ParamBrowLY: "ParamBrowLY",
        ParamBrowRY: "ParamBrowRY",
        ParamBrowLX: "ParamBrowLX",
        ParamBrowRX: "ParamBrowRX",
        ParamBrowLAngle: "ParamBrowLAngle",
        ParamBrowRAngle: "ParamBrowRAngle",
        ParamBrowLForm: "ParamBrowLForm",
        ParamBrowRForm: "ParamBrowRForm",
        ParamMouthForm: "ParamMouthForm",
        ParamMouthOpenY: "ParamMouthOpenY",
        ParamCheek: "ParamCheek",
        ParamBodyAngleX: "ParamBodyAngleX",
        ParamBodyAngleY: "ParamBodyAngleY",
        ParamBodyAngleZ: "ParamBodyAngleZ",
        ParamBreath: "ParamBreath",
        ParamArmLA: "ParamArmLA",
        ParamArmRA: "ParamArmRA",
        ParamArmLB: "ParamArmLB",
        ParamArmRB: "ParamArmRB",
        ParamHandL: "ParamHandL",
        ParamHandR: "ParamHandR",
        ParamHairFront: "ParamHairFront",
        ParamHairSide: "ParamHairSide",
        ParamHairBack: "ParamHairBack",
        ParamHairFluffy: "ParamHairFluffy",
        ParamShoulderY: "ParamShoulderY",
        ParamBustX: "ParamBustX",
        ParamBustY: "ParamBustY",
        ParamBaseX: "ParamBaseX",
        ParamBaseY: "ParamBaseY",
        ParamNONE: "NONE:"
      });
      var $ = __importStar(require_cubismdefaultparameterid());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.HitAreaBody = $.CubismDefaultParameterId.HitAreaBody;
        Live2DCubismFramework2.HitAreaHead = $.CubismDefaultParameterId.HitAreaHead;
        Live2DCubismFramework2.HitAreaPrefix = $.CubismDefaultParameterId.HitAreaPrefix;
        Live2DCubismFramework2.ParamAngleX = $.CubismDefaultParameterId.ParamAngleX;
        Live2DCubismFramework2.ParamAngleY = $.CubismDefaultParameterId.ParamAngleY;
        Live2DCubismFramework2.ParamAngleZ = $.CubismDefaultParameterId.ParamAngleZ;
        Live2DCubismFramework2.ParamArmLA = $.CubismDefaultParameterId.ParamArmLA;
        Live2DCubismFramework2.ParamArmLB = $.CubismDefaultParameterId.ParamArmLB;
        Live2DCubismFramework2.ParamArmRA = $.CubismDefaultParameterId.ParamArmRA;
        Live2DCubismFramework2.ParamArmRB = $.CubismDefaultParameterId.ParamArmRB;
        Live2DCubismFramework2.ParamBaseX = $.CubismDefaultParameterId.ParamBaseX;
        Live2DCubismFramework2.ParamBaseY = $.CubismDefaultParameterId.ParamBaseY;
        Live2DCubismFramework2.ParamBodyAngleX = $.CubismDefaultParameterId.ParamBodyAngleX;
        Live2DCubismFramework2.ParamBodyAngleY = $.CubismDefaultParameterId.ParamBodyAngleY;
        Live2DCubismFramework2.ParamBodyAngleZ = $.CubismDefaultParameterId.ParamBodyAngleZ;
        Live2DCubismFramework2.ParamBreath = $.CubismDefaultParameterId.ParamBreath;
        Live2DCubismFramework2.ParamBrowLAngle = $.CubismDefaultParameterId.ParamBrowLAngle;
        Live2DCubismFramework2.ParamBrowLForm = $.CubismDefaultParameterId.ParamBrowLForm;
        Live2DCubismFramework2.ParamBrowLX = $.CubismDefaultParameterId.ParamBrowLX;
        Live2DCubismFramework2.ParamBrowLY = $.CubismDefaultParameterId.ParamBrowLY;
        Live2DCubismFramework2.ParamBrowRAngle = $.CubismDefaultParameterId.ParamBrowRAngle;
        Live2DCubismFramework2.ParamBrowRForm = $.CubismDefaultParameterId.ParamBrowRForm;
        Live2DCubismFramework2.ParamBrowRX = $.CubismDefaultParameterId.ParamBrowRX;
        Live2DCubismFramework2.ParamBrowRY = $.CubismDefaultParameterId.ParamBrowRY;
        Live2DCubismFramework2.ParamBustX = $.CubismDefaultParameterId.ParamBustX;
        Live2DCubismFramework2.ParamBustY = $.CubismDefaultParameterId.ParamBustY;
        Live2DCubismFramework2.ParamCheek = $.CubismDefaultParameterId.ParamCheek;
        Live2DCubismFramework2.ParamEyeBallForm = $.CubismDefaultParameterId.ParamEyeBallForm;
        Live2DCubismFramework2.ParamEyeBallX = $.CubismDefaultParameterId.ParamEyeBallX;
        Live2DCubismFramework2.ParamEyeBallY = $.CubismDefaultParameterId.ParamEyeBallY;
        Live2DCubismFramework2.ParamEyeLOpen = $.CubismDefaultParameterId.ParamEyeLOpen;
        Live2DCubismFramework2.ParamEyeLSmile = $.CubismDefaultParameterId.ParamEyeLSmile;
        Live2DCubismFramework2.ParamEyeROpen = $.CubismDefaultParameterId.ParamEyeROpen;
        Live2DCubismFramework2.ParamEyeRSmile = $.CubismDefaultParameterId.ParamEyeRSmile;
        Live2DCubismFramework2.ParamHairBack = $.CubismDefaultParameterId.ParamHairBack;
        Live2DCubismFramework2.ParamHairFluffy = $.CubismDefaultParameterId.ParamHairFluffy;
        Live2DCubismFramework2.ParamHairFront = $.CubismDefaultParameterId.ParamHairFront;
        Live2DCubismFramework2.ParamHairSide = $.CubismDefaultParameterId.ParamHairSide;
        Live2DCubismFramework2.ParamHandL = $.CubismDefaultParameterId.ParamHandL;
        Live2DCubismFramework2.ParamHandR = $.CubismDefaultParameterId.ParamHandR;
        Live2DCubismFramework2.ParamMouthForm = $.CubismDefaultParameterId.ParamMouthForm;
        Live2DCubismFramework2.ParamMouthOpenY = $.CubismDefaultParameterId.ParamMouthOpenY;
        Live2DCubismFramework2.ParamNONE = $.CubismDefaultParameterId.ParamNONE;
        Live2DCubismFramework2.ParamShoulderY = $.CubismDefaultParameterId.ParamShoulderY;
        Live2DCubismFramework2.PartsArmLPrefix = $.CubismDefaultParameterId.PartsArmLPrefix;
        Live2DCubismFramework2.PartsArmPrefix = $.CubismDefaultParameterId.PartsArmPrefix;
        Live2DCubismFramework2.PartsArmRPrefix = $.CubismDefaultParameterId.PartsArmRPrefix;
        Live2DCubismFramework2.PartsIdCore = $.CubismDefaultParameterId.PartsIdCore;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/effect/cubismeyeblink.js
  var require_cubismeyeblink = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/effect/cubismeyeblink.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.EyeState = exports.CubismEyeBlink = void 0;
      var csmvector_1 = require_csmvector();
      var CubismEyeBlink = class _CubismEyeBlink {
        /**
         * インスタンスを作成する
         * @param modelSetting モデルの設定情報
         * @return 作成されたインスタンス
         * @note 引数がNULLの場合、パラメータIDが設定されていない空のインスタンスを作成する。
         */
        static create(modelSetting = null) {
          return new _CubismEyeBlink(modelSetting);
        }
        /**
         * インスタンスの破棄
         * @param eyeBlink 対象のCubismEyeBlink
         */
        static delete(eyeBlink) {
          if (eyeBlink != null) {
            eyeBlink = null;
          }
        }
        /**
         * まばたきの間隔の設定
         * @param blinkingInterval まばたきの間隔の時間[秒]
         */
        setBlinkingInterval(blinkingInterval) {
          this._blinkingIntervalSeconds = blinkingInterval;
        }
        /**
         * まばたきのモーションの詳細設定
         * @param closing   まぶたを閉じる動作の所要時間[秒]
         * @param closed    まぶたを閉じている動作の所要時間[秒]
         * @param opening   まぶたを開く動作の所要時間[秒]
         */
        setBlinkingSetting(closing, closed, opening) {
          this._closingSeconds = closing;
          this._closedSeconds = closed;
          this._openingSeconds = opening;
        }
        /**
         * まばたきさせるパラメータIDのリストの設定
         * @param parameterIds パラメータのIDのリスト
         */
        setParameterIds(parameterIds) {
          this._parameterIds = parameterIds;
        }
        /**
         * まばたきさせるパラメータIDのリストの取得
         * @return パラメータIDのリスト
         */
        getParameterIds() {
          return this._parameterIds;
        }
        /**
         * モデルのパラメータの更新
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        updateParameters(model, deltaTimeSeconds) {
          this._userTimeSeconds += deltaTimeSeconds;
          let parameterValue;
          let t = 0;
          const blinkingState = this._blinkingState;
          switch (blinkingState) {
            case EyeState.EyeState_Closing:
              t = (this._userTimeSeconds - this._stateStartTimeSeconds) / this._closingSeconds;
              if (t >= 1) {
                t = 1;
                this._blinkingState = EyeState.EyeState_Closed;
                this._stateStartTimeSeconds = this._userTimeSeconds;
              }
              parameterValue = 1 - t;
              break;
            case EyeState.EyeState_Closed:
              t = (this._userTimeSeconds - this._stateStartTimeSeconds) / this._closedSeconds;
              if (t >= 1) {
                this._blinkingState = EyeState.EyeState_Opening;
                this._stateStartTimeSeconds = this._userTimeSeconds;
              }
              parameterValue = 0;
              break;
            case EyeState.EyeState_Opening:
              t = (this._userTimeSeconds - this._stateStartTimeSeconds) / this._openingSeconds;
              if (t >= 1) {
                t = 1;
                this._blinkingState = EyeState.EyeState_Interval;
                this._nextBlinkingTime = this.determinNextBlinkingTiming();
              }
              parameterValue = t;
              break;
            case EyeState.EyeState_Interval:
              if (this._nextBlinkingTime < this._userTimeSeconds) {
                this._blinkingState = EyeState.EyeState_Closing;
                this._stateStartTimeSeconds = this._userTimeSeconds;
              }
              parameterValue = 1;
              break;
            case EyeState.EyeState_First:
            default:
              this._blinkingState = EyeState.EyeState_Interval;
              this._nextBlinkingTime = this.determinNextBlinkingTiming();
              parameterValue = 1;
              break;
          }
          if (!_CubismEyeBlink.CloseIfZero) {
            parameterValue = -parameterValue;
          }
          for (let i = 0; i < this._parameterIds.getSize(); ++i) {
            model.setParameterValueById(this._parameterIds.at(i), parameterValue);
          }
        }
        /**
         * コンストラクタ
         * @param modelSetting モデルの設定情報
         */
        constructor(modelSetting) {
          this._blinkingState = EyeState.EyeState_First;
          this._nextBlinkingTime = 0;
          this._stateStartTimeSeconds = 0;
          this._blinkingIntervalSeconds = 4;
          this._closingSeconds = 0.1;
          this._closedSeconds = 0.05;
          this._openingSeconds = 0.15;
          this._userTimeSeconds = 0;
          this._parameterIds = new csmvector_1.csmVector();
          if (modelSetting == null) {
            return;
          }
          for (let i = 0; i < modelSetting.getEyeBlinkParameterCount(); ++i) {
            this._parameterIds.pushBack(modelSetting.getEyeBlinkParameterId(i));
          }
        }
        /**
         * 次の瞬きのタイミングの決定
         *
         * @return 次のまばたきを行う時刻[秒]
         */
        determinNextBlinkingTiming() {
          const r = Math.random();
          return this._userTimeSeconds + r * (2 * this._blinkingIntervalSeconds - 1);
        }
      };
      exports.CubismEyeBlink = CubismEyeBlink;
      CubismEyeBlink.CloseIfZero = true;
      var EyeState;
      (function(EyeState2) {
        EyeState2[EyeState2["EyeState_First"] = 0] = "EyeState_First";
        EyeState2[EyeState2["EyeState_Interval"] = 1] = "EyeState_Interval";
        EyeState2[EyeState2["EyeState_Closing"] = 2] = "EyeState_Closing";
        EyeState2[EyeState2["EyeState_Closed"] = 3] = "EyeState_Closed";
        EyeState2[EyeState2["EyeState_Opening"] = 4] = "EyeState_Opening";
      })(EyeState || (exports.EyeState = EyeState = {}));
      var $ = __importStar(require_cubismeyeblink());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismEyeBlink = $.CubismEyeBlink;
        Live2DCubismFramework2.EyeState = $.EyeState;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/effect/cubismbreath.js
  var require_cubismbreath = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/effect/cubismbreath.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.BreathParameterData = exports.CubismBreath = void 0;
      var CubismBreath = class _CubismBreath {
        /**
         * インスタンスの作成
         */
        static create() {
          return new _CubismBreath();
        }
        /**
         * インスタンスの破棄
         * @param instance 対象のCubismBreath
         */
        static delete(instance) {
          if (instance != null) {
            instance = null;
          }
        }
        /**
         * 呼吸のパラメータの紐づけ
         * @param breathParameters 呼吸を紐づけたいパラメータのリスト
         */
        setParameters(breathParameters) {
          this._breathParameters = breathParameters;
        }
        /**
         * 呼吸に紐づいているパラメータの取得
         * @return 呼吸に紐づいているパラメータのリスト
         */
        getParameters() {
          return this._breathParameters;
        }
        /**
         * モデルのパラメータの更新
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        updateParameters(model, deltaTimeSeconds) {
          this._currentTime += deltaTimeSeconds;
          const t = this._currentTime * 2 * Math.PI;
          for (let i = 0; i < this._breathParameters.getSize(); ++i) {
            const data = this._breathParameters.at(i);
            model.addParameterValueById(data.parameterId, data.offset + data.peak * Math.sin(t / data.cycle), data.weight);
          }
        }
        /**
         * コンストラクタ
         */
        constructor() {
          this._currentTime = 0;
        }
      };
      exports.CubismBreath = CubismBreath;
      var BreathParameterData = class {
        /**
         * コンストラクタ
         * @param parameterId   呼吸をひもづけるパラメータID
         * @param offset        呼吸を正弦波としたときの、波のオフセット
         * @param peak          呼吸を正弦波としたときの、波の高さ
         * @param cycle         呼吸を正弦波としたときの、波の周期
         * @param weight        パラメータへの重み
         */
        constructor(parameterId, offset, peak, cycle, weight) {
          this.parameterId = parameterId == void 0 ? null : parameterId;
          this.offset = offset == void 0 ? 0 : offset;
          this.peak = peak == void 0 ? 0 : peak;
          this.cycle = cycle == void 0 ? 0 : cycle;
          this.weight = weight == void 0 ? 0 : weight;
        }
      };
      exports.BreathParameterData = BreathParameterData;
      var $ = __importStar(require_cubismbreath());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.BreathParameterData = $.BreathParameterData;
        Live2DCubismFramework2.CubismBreath = $.CubismBreath;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/math/cubismvector2.js
  var require_cubismvector2 = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/math/cubismvector2.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismVector2 = void 0;
      var CubismVector2 = class _CubismVector2 {
        /**
         * コンストラクタ
         */
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.x = x == void 0 ? 0 : x;
          this.y = y == void 0 ? 0 : y;
        }
        /**
         * ベクトルの加算
         *
         * @param vector2 加算するベクトル値
         * @return 加算結果 ベクトル値
         */
        add(vector2) {
          const ret = new _CubismVector2(0, 0);
          ret.x = this.x + vector2.x;
          ret.y = this.y + vector2.y;
          return ret;
        }
        /**
         * ベクトルの減算
         *
         * @param vector2 減算するベクトル値
         * @return 減算結果 ベクトル値
         */
        substract(vector2) {
          const ret = new _CubismVector2(0, 0);
          ret.x = this.x - vector2.x;
          ret.y = this.y - vector2.y;
          return ret;
        }
        /**
         * ベクトルの乗算
         *
         * @param vector2 乗算するベクトル値
         * @return 乗算結果 ベクトル値
         */
        multiply(vector2) {
          const ret = new _CubismVector2(0, 0);
          ret.x = this.x * vector2.x;
          ret.y = this.y * vector2.y;
          return ret;
        }
        /**
         * ベクトルの乗算(スカラー)
         *
         * @param scalar 乗算するスカラー値
         * @return 乗算結果 ベクトル値
         */
        multiplyByScaler(scalar) {
          return this.multiply(new _CubismVector2(scalar, scalar));
        }
        /**
         * ベクトルの除算
         *
         * @param vector2 除算するベクトル値
         * @return 除算結果 ベクトル値
         */
        division(vector2) {
          const ret = new _CubismVector2(0, 0);
          ret.x = this.x / vector2.x;
          ret.y = this.y / vector2.y;
          return ret;
        }
        /**
         * ベクトルの除算(スカラー)
         *
         * @param scalar 除算するスカラー値
         * @return 除算結果 ベクトル値
         */
        divisionByScalar(scalar) {
          return this.division(new _CubismVector2(scalar, scalar));
        }
        /**
         * ベクトルの長さを取得する
         *
         * @return ベクトルの長さ
         */
        getLength() {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        /**
         * ベクトルの距離の取得
         *
         * @param a 点
         * @return ベクトルの距離
         */
        getDistanceWith(a) {
          return Math.sqrt((this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y));
        }
        /**
         * ドット積の計算
         *
         * @param a 値
         * @return 結果
         */
        dot(a) {
          return this.x * a.x + this.y * a.y;
        }
        /**
         * 正規化の適用
         */
        normalize() {
          const length = Math.pow(this.x * this.x + this.y * this.y, 0.5);
          this.x = this.x / length;
          this.y = this.y / length;
        }
        /**
         * 等しさの確認（等しいか？）
         *
         * 値が等しいか？
         *
         * @param rhs 確認する値
         * @return true 値は等しい
         * @return false 値は等しくない
         */
        isEqual(rhs) {
          return this.x == rhs.x && this.y == rhs.y;
        }
        /**
         * 等しさの確認（等しくないか？）
         *
         * 値が等しくないか？
         *
         * @param rhs 確認する値
         * @return true 値は等しくない
         * @return false 値は等しい
         */
        isNotEqual(rhs) {
          return !this.isEqual(rhs);
        }
      };
      exports.CubismVector2 = CubismVector2;
      var $ = __importStar(require_cubismvector2());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismVector2 = $.CubismVector2;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/math/cubismmath.js
  var require_cubismmath = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/math/cubismmath.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismMath = void 0;
      var cubismvector2_1 = require_cubismvector2();
      var CubismMath = class _CubismMath {
        /**
         * 第一引数の値を最小値と最大値の範囲に収めた値を返す
         *
         * @param value 収められる値
         * @param min   範囲の最小値
         * @param max   範囲の最大値
         * @return 最小値と最大値の範囲に収めた値
         */
        static range(value, min, max) {
          if (value < min) {
            value = min;
          } else if (value > max) {
            value = max;
          }
          return value;
        }
        /**
         * サイン関数の値を求める
         *
         * @param x 角度値（ラジアン）
         * @return サイン関数sin(x)の値
         */
        static sin(x) {
          return Math.sin(x);
        }
        /**
         * コサイン関数の値を求める
         *
         * @param x 角度値(ラジアン)
         * @return コサイン関数cos(x)の値
         */
        static cos(x) {
          return Math.cos(x);
        }
        /**
         * 値の絶対値を求める
         *
         * @param x 絶対値を求める値
         * @return 値の絶対値
         */
        static abs(x) {
          return Math.abs(x);
        }
        /**
         * 平方根(ルート)を求める
         * @param x -> 平方根を求める値
         * @return 値の平方根
         */
        static sqrt(x) {
          return Math.sqrt(x);
        }
        /**
         * 立方根を求める
         * @param x -> 立方根を求める値
         * @return 値の立方根
         */
        static cbrt(x) {
          if (x === 0) {
            return x;
          }
          let cx = x;
          const isNegativeNumber = cx < 0;
          if (isNegativeNumber) {
            cx = -cx;
          }
          let ret;
          if (cx === Infinity) {
            ret = Infinity;
          } else {
            ret = Math.exp(Math.log(cx) / 3);
            ret = (cx / (ret * ret) + 2 * ret) / 3;
          }
          return isNegativeNumber ? -ret : ret;
        }
        /**
         * イージング処理されたサインを求める
         * フェードイン・アウト時のイージングに利用できる
         *
         * @param value イージングを行う値
         * @return イージング処理されたサイン値
         */
        static getEasingSine(value) {
          if (value < 0) {
            return 0;
          } else if (value > 1) {
            return 1;
          }
          return 0.5 - 0.5 * this.cos(value * Math.PI);
        }
        /**
         * 大きい方の値を返す
         *
         * @param left 左辺の値
         * @param right 右辺の値
         * @return 大きい方の値
         */
        static max(left, right) {
          return left > right ? left : right;
        }
        /**
         * 小さい方の値を返す
         *
         * @param left  左辺の値
         * @param right 右辺の値
         * @return 小さい方の値
         */
        static min(left, right) {
          return left > right ? right : left;
        }
        static clamp(val, min, max) {
          if (val < min) {
            return min;
          } else if (max < val) {
            return max;
          }
          return val;
        }
        /**
         * 角度値をラジアン値に変換する
         *
         * @param degrees   角度値
         * @return 角度値から変換したラジアン値
         */
        static degreesToRadian(degrees) {
          return degrees / 180 * Math.PI;
        }
        /**
         * ラジアン値を角度値に変換する
         *
         * @param radian    ラジアン値
         * @return ラジアン値から変換した角度値
         */
        static radianToDegrees(radian) {
          return radian * 180 / Math.PI;
        }
        /**
         * ２つのベクトルからラジアン値を求める
         *
         * @param from  始点ベクトル
         * @param to    終点ベクトル
         * @return ラジアン値から求めた方向ベクトル
         */
        static directionToRadian(from, to) {
          const q1 = Math.atan2(to.y, to.x);
          const q2 = Math.atan2(from.y, from.x);
          let ret = q1 - q2;
          while (ret < -Math.PI) {
            ret += Math.PI * 2;
          }
          while (ret > Math.PI) {
            ret -= Math.PI * 2;
          }
          return ret;
        }
        /**
         * ２つのベクトルから角度値を求める
         *
         * @param from  始点ベクトル
         * @param to    終点ベクトル
         * @return 角度値から求めた方向ベクトル
         */
        static directionToDegrees(from, to) {
          const radian = this.directionToRadian(from, to);
          let degree = this.radianToDegrees(radian);
          if (to.x - from.x > 0) {
            degree = -degree;
          }
          return degree;
        }
        /**
         * ラジアン値を方向ベクトルに変換する。
         *
         * @param totalAngle    ラジアン値
         * @return ラジアン値から変換した方向ベクトル
         */
        static radianToDirection(totalAngle) {
          const ret = new cubismvector2_1.CubismVector2();
          ret.x = this.sin(totalAngle);
          ret.y = this.cos(totalAngle);
          return ret;
        }
        /**
         * 三次方程式の三次項の係数が0になったときに補欠的に二次方程式の解をもとめる。
         * a * x^2 + b * x + c = 0
         *
         * @param   a -> 二次項の係数値
         * @param   b -> 一次項の係数値
         * @param   c -> 定数項の値
         * @return  二次方程式の解
         */
        static quadraticEquation(a, b, c) {
          if (this.abs(a) < _CubismMath.Epsilon) {
            if (this.abs(b) < _CubismMath.Epsilon) {
              return -c;
            }
            return -c / b;
          }
          return -(b + this.sqrt(b * b - 4 * a * c)) / (2 * a);
        }
        /**
         * カルダノの公式によってベジェのt値に該当する３次方程式の解を求める。
         * 重解になったときには0.0～1.0の値になる解を返す。
         *
         * a * x^3 + b * x^2 + c * x + d = 0
         *
         * @param   a -> 三次項の係数値
         * @param   b -> 二次項の係数値
         * @param   c -> 一次項の係数値
         * @param   d -> 定数項の値
         * @return  0.0～1.0の間にある解
         */
        static cardanoAlgorithmForBezier(a, b, c, d) {
          if (this.abs(a) < _CubismMath.Epsilon) {
            return this.range(this.quadraticEquation(b, c, d), 0, 1);
          }
          const ba = b / a;
          const ca = c / a;
          const da = d / a;
          const p = (3 * ca - ba * ba) / 3;
          const p3 = p / 3;
          const q = (2 * ba * ba * ba - 9 * ba * ca + 27 * da) / 27;
          const q2 = q / 2;
          const discriminant = q2 * q2 + p3 * p3 * p3;
          const center = 0.5;
          const threshold = center + 0.01;
          if (discriminant < 0) {
            const mp3 = -p / 3;
            const mp33 = mp3 * mp3 * mp3;
            const r = this.sqrt(mp33);
            const t = -q / (2 * r);
            const cosphi = this.range(t, -1, 1);
            const phi = Math.acos(cosphi);
            const crtr = this.cbrt(r);
            const t1 = 2 * crtr;
            const root12 = t1 * this.cos(phi / 3) - ba / 3;
            if (this.abs(root12 - center) < threshold) {
              return this.range(root12, 0, 1);
            }
            const root2 = t1 * this.cos((phi + 2 * Math.PI) / 3) - ba / 3;
            if (this.abs(root2 - center) < threshold) {
              return this.range(root2, 0, 1);
            }
            const root3 = t1 * this.cos((phi + 4 * Math.PI) / 3) - ba / 3;
            return this.range(root3, 0, 1);
          }
          if (discriminant == 0) {
            let u12;
            if (q2 < 0) {
              u12 = this.cbrt(-q2);
            } else {
              u12 = -this.cbrt(q2);
            }
            const root12 = 2 * u12 - ba / 3;
            if (this.abs(root12 - center) < threshold) {
              return this.range(root12, 0, 1);
            }
            const root2 = -u12 - ba / 3;
            return this.range(root2, 0, 1);
          }
          const sd = this.sqrt(discriminant);
          const u1 = this.cbrt(sd - q2);
          const v1 = this.cbrt(sd + q2);
          const root1 = u1 - v1 - ba / 3;
          return this.range(root1, 0, 1);
        }
        /**
         * 浮動小数点の余りを求める。
         *
         * @param dividend 被除数（割られる値）
         * @param divisor 除数（割る値）
         * @returns 余り
         */
        static mod(dividend, divisor) {
          if (!isFinite(dividend) || divisor === 0 || isNaN(dividend) || isNaN(divisor)) {
            console.warn(`divided: ${dividend}, divisor: ${divisor} mod() returns 'NaN'.`);
            return NaN;
          }
          const absDividend = Math.abs(dividend);
          const absDivisor = Math.abs(divisor);
          let result = absDividend - Math.floor(absDividend / absDivisor) * absDivisor;
          result *= Math.sign(dividend);
          return result;
        }
        /**
         * コンストラクタ
         */
        constructor() {
        }
      };
      exports.CubismMath = CubismMath;
      CubismMath.Epsilon = 1e-5;
      var $ = __importStar(require_cubismmath());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismMath = $.CubismMath;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/motion/acubismmotion.js
  var require_acubismmotion = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/motion/acubismmotion.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.ACubismMotion = void 0;
      var cubismmath_1 = require_cubismmath();
      var csmvector_1 = require_csmvector();
      var cubismdebug_1 = require_cubismdebug();
      var ACubismMotion = class {
        /**
         * インスタンスの破棄
         */
        static delete(motion) {
          motion.release();
          motion = null;
        }
        /**
         * コンストラクタ
         */
        constructor() {
          this.setBeganMotionHandler = (onBeganMotionHandler) => this._onBeganMotion = onBeganMotionHandler;
          this.getBeganMotionHandler = () => this._onBeganMotion;
          this.setFinishedMotionHandler = (onFinishedMotionHandler) => this._onFinishedMotion = onFinishedMotionHandler;
          this.getFinishedMotionHandler = () => this._onFinishedMotion;
          this._fadeInSeconds = -1;
          this._fadeOutSeconds = -1;
          this._weight = 1;
          this._offsetSeconds = 0;
          this._isLoop = false;
          this._isLoopFadeIn = true;
          this._previousLoopState = this._isLoop;
          this._firedEventValues = new csmvector_1.csmVector();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          this._weight = 0;
        }
        /**
         * モデルのパラメータ
         * @param model 対象のモデル
         * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
         * @param userTimeSeconds デルタ時間の積算値[秒]
         */
        updateParameters(model, motionQueueEntry, userTimeSeconds) {
          if (!motionQueueEntry.isAvailable() || motionQueueEntry.isFinished()) {
            return;
          }
          this.setupMotionQueueEntry(motionQueueEntry, userTimeSeconds);
          const fadeWeight = this.updateFadeWeight(motionQueueEntry, userTimeSeconds);
          this.doUpdateParameters(model, userTimeSeconds, fadeWeight, motionQueueEntry);
          if (motionQueueEntry.getEndTime() > 0 && motionQueueEntry.getEndTime() < userTimeSeconds) {
            motionQueueEntry.setIsFinished(true);
          }
        }
        /**
         * @brief モデルの再生開始処理
         *
         * モーションの再生を開始するためのセットアップを行う。
         *
         * @param[in]   motionQueueEntry    CubismMotionQueueManagerで管理されているモーション
         * @param[in]   userTimeSeconds     デルタ時間の積算値[秒]
         */
        setupMotionQueueEntry(motionQueueEntry, userTimeSeconds) {
          if (motionQueueEntry == null || motionQueueEntry.isStarted()) {
            return;
          }
          if (!motionQueueEntry.isAvailable()) {
            return;
          }
          motionQueueEntry.setIsStarted(true);
          motionQueueEntry.setStartTime(userTimeSeconds - this._offsetSeconds);
          motionQueueEntry.setFadeInStartTime(userTimeSeconds);
          if (motionQueueEntry.getEndTime() < 0) {
            this.adjustEndTime(motionQueueEntry);
          }
          if (motionQueueEntry._motion._onBeganMotion) {
            motionQueueEntry._motion._onBeganMotion(motionQueueEntry._motion);
          }
        }
        /**
         * @brief モデルのウェイト更新
         *
         * モーションのウェイトを更新する。
         *
         * @param[in]   motionQueueEntry    CubismMotionQueueManagerで管理されているモーション
         * @param[in]   userTimeSeconds     デルタ時間の積算値[秒]
         */
        updateFadeWeight(motionQueueEntry, userTimeSeconds) {
          if (motionQueueEntry == null) {
            cubismdebug_1.CubismDebug.print(live2dcubismframework_1.LogLevel.LogLevel_Error, "motionQueueEntry is null.");
          }
          let fadeWeight = this._weight;
          const fadeIn = this._fadeInSeconds == 0 ? 1 : cubismmath_1.CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / this._fadeInSeconds);
          const fadeOut = this._fadeOutSeconds == 0 || motionQueueEntry.getEndTime() < 0 ? 1 : cubismmath_1.CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) / this._fadeOutSeconds);
          fadeWeight = fadeWeight * fadeIn * fadeOut;
          motionQueueEntry.setState(userTimeSeconds, fadeWeight);
          (0, cubismdebug_1.CSM_ASSERT)(0 <= fadeWeight && fadeWeight <= 1);
          return fadeWeight;
        }
        /**
         * フェードインの時間を設定する
         * @param fadeInSeconds フェードインにかかる時間[秒]
         */
        setFadeInTime(fadeInSeconds) {
          this._fadeInSeconds = fadeInSeconds;
        }
        /**
         * フェードアウトの時間を設定する
         * @param fadeOutSeconds フェードアウトにかかる時間[秒]
         */
        setFadeOutTime(fadeOutSeconds) {
          this._fadeOutSeconds = fadeOutSeconds;
        }
        /**
         * フェードアウトにかかる時間の取得
         * @return フェードアウトにかかる時間[秒]
         */
        getFadeOutTime() {
          return this._fadeOutSeconds;
        }
        /**
         * フェードインにかかる時間の取得
         * @return フェードインにかかる時間[秒]
         */
        getFadeInTime() {
          return this._fadeInSeconds;
        }
        /**
         * モーション適用の重みの設定
         * @param weight 重み（0.0 - 1.0）
         */
        setWeight(weight) {
          this._weight = weight;
        }
        /**
         * モーション適用の重みの取得
         * @return 重み（0.0 - 1.0）
         */
        getWeight() {
          return this._weight;
        }
        /**
         * モーションの長さの取得
         * @return モーションの長さ[秒]
         *
         * @note ループの時は「-1」。
         *       ループでない場合は、オーバーライドする。
         *       正の値の時は取得される時間で終了する。
         *       「-1」の時は外部から停止命令がない限り終わらない処理となる。
         */
        getDuration() {
          return -1;
        }
        /**
         * モーションのループ1回分の長さの取得
         * @return モーションのループ一回分の長さ[秒]
         *
         * @note ループしない場合は、getDuration()と同じ値を返す
         *       ループ一回分の長さが定義できない場合(プログラム的に動き続けるサブクラスなど)の場合は「-1」を返す
         */
        getLoopDuration() {
          return -1;
        }
        /**
         * モーション再生の開始時刻の設定
         * @param offsetSeconds モーション再生の開始時刻[秒]
         */
        setOffsetTime(offsetSeconds) {
          this._offsetSeconds = offsetSeconds;
        }
        /**
         * ループ情報の設定
         * @param loop ループ情報
         */
        setLoop(loop) {
          this._isLoop = loop;
        }
        /**
         * ループ情報の取得
         * @return true ループする
         * @return false ループしない
         */
        getLoop() {
          return this._isLoop;
        }
        /**
         * ループ時のフェードイン情報の設定
         * @param loopFadeIn  ループ時のフェードイン情報
         */
        setLoopFadeIn(loopFadeIn) {
          this._isLoopFadeIn = loopFadeIn;
        }
        /**
         * ループ時のフェードイン情報の取得
         *
         * @return  true    する
         * @return  false   しない
         */
        getLoopFadeIn() {
          return this._isLoopFadeIn;
        }
        /**
         * モデルのパラメータ更新
         *
         * イベント発火のチェック。
         * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
         *
         * @param beforeCheckTimeSeconds 前回のイベントチェック時間[秒]
         * @param motionTimeSeconds 今回の再生時間[秒]
         */
        getFiredEvent(beforeCheckTimeSeconds, motionTimeSeconds) {
          return this._firedEventValues;
        }
        /**
         * 透明度のカーブが存在するかどうかを確認する
         *
         * @returns true  -> キーが存在する
         *          false -> キーが存在しない
         */
        isExistModelOpacity() {
          return false;
        }
        /**
         * 透明度のカーブのインデックスを返す
         *
         * @returns success:透明度のカーブのインデックス
         */
        getModelOpacityIndex() {
          return -1;
        }
        /**
         * 透明度のIdを返す
         *
         * @param index モーションカーブのインデックス
         * @returns success:透明度のId
         */
        getModelOpacityId(index) {
          return null;
        }
        /**
         * 指定時間の透明度の値を返す
         *
         * @returns success:モーションの現在時間におけるOpacityの値
         *
         * @note  更新後の値を取るにはUpdateParameters() の後に呼び出す。
         */
        getModelOpacityValue() {
          return 1;
        }
        /**
         * 終了時刻の調整
         * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
         */
        adjustEndTime(motionQueueEntry) {
          const duration = this.getDuration();
          const endTime = duration <= 0 ? -1 : motionQueueEntry.getStartTime() + duration;
          motionQueueEntry.setEndTime(endTime);
        }
      };
      exports.ACubismMotion = ACubismMotion;
      var $ = __importStar(require_acubismmotion());
      var live2dcubismframework_1 = require_live2dcubismframework();
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.ACubismMotion = $.ACubismMotion;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/motion/cubismmotionqueueentry.js
  var require_cubismmotionqueueentry = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/motion/cubismmotionqueueentry.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismMotionQueueEntry = void 0;
      var acubismmotion_1 = require_acubismmotion();
      var CubismMotionQueueEntry = class {
        /**
         * コンストラクタ
         */
        constructor() {
          this._autoDelete = false;
          this._motion = null;
          this._available = true;
          this._finished = false;
          this._started = false;
          this._startTimeSeconds = -1;
          this._fadeInStartTimeSeconds = 0;
          this._endTimeSeconds = -1;
          this._stateTimeSeconds = 0;
          this._stateWeight = 0;
          this._lastEventCheckSeconds = 0;
          this._motionQueueEntryHandle = this;
          this._fadeOutSeconds = 0;
          this._isTriggeredFadeOut = false;
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          if (this._autoDelete && this._motion) {
            acubismmotion_1.ACubismMotion.delete(this._motion);
          }
        }
        /**
         * フェードアウト時間と開始判定の設定
         * @param fadeOutSeconds フェードアウトにかかる時間[秒]
         */
        setFadeOut(fadeOutSeconds) {
          this._fadeOutSeconds = fadeOutSeconds;
          this._isTriggeredFadeOut = true;
        }
        /**
         * フェードアウトの開始
         * @param fadeOutSeconds フェードアウトにかかる時間[秒]
         * @param userTimeSeconds デルタ時間の積算値[秒]
         */
        startFadeOut(fadeOutSeconds, userTimeSeconds) {
          const newEndTimeSeconds = userTimeSeconds + fadeOutSeconds;
          this._isTriggeredFadeOut = true;
          if (this._endTimeSeconds < 0 || newEndTimeSeconds < this._endTimeSeconds) {
            this._endTimeSeconds = newEndTimeSeconds;
          }
        }
        /**
         * モーションの終了の確認
         *
         * @return true モーションが終了した
         * @return false 終了していない
         */
        isFinished() {
          return this._finished;
        }
        /**
         * モーションの開始の確認
         * @return true モーションが開始した
         * @return false 開始していない
         */
        isStarted() {
          return this._started;
        }
        /**
         * モーションの開始時刻の取得
         * @return モーションの開始時刻[秒]
         */
        getStartTime() {
          return this._startTimeSeconds;
        }
        /**
         * フェードインの開始時刻の取得
         * @return フェードインの開始時刻[秒]
         */
        getFadeInStartTime() {
          return this._fadeInStartTimeSeconds;
        }
        /**
         * フェードインの終了時刻の取得
         * @return フェードインの終了時刻の取得
         */
        getEndTime() {
          return this._endTimeSeconds;
        }
        /**
         * モーションの開始時刻の設定
         * @param startTime モーションの開始時刻
         */
        setStartTime(startTime) {
          this._startTimeSeconds = startTime;
        }
        /**
         * フェードインの開始時刻の設定
         * @param startTime フェードインの開始時刻[秒]
         */
        setFadeInStartTime(startTime) {
          this._fadeInStartTimeSeconds = startTime;
        }
        /**
         * フェードインの終了時刻の設定
         * @param endTime フェードインの終了時刻[秒]
         */
        setEndTime(endTime) {
          this._endTimeSeconds = endTime;
        }
        /**
         * モーションの終了の設定
         * @param f trueならモーションの終了
         */
        setIsFinished(f) {
          this._finished = f;
        }
        /**
         * モーション開始の設定
         * @param f trueならモーションの開始
         */
        setIsStarted(f) {
          this._started = f;
        }
        /**
         * モーションの有効性の確認
         * @return true モーションは有効
         * @return false モーションは無効
         */
        isAvailable() {
          return this._available;
        }
        /**
         * モーションの有効性の設定
         * @param v trueならモーションは有効
         */
        setIsAvailable(v) {
          this._available = v;
        }
        /**
         * モーションの状態の設定
         * @param timeSeconds 現在時刻[秒]
         * @param weight モーション尾重み
         */
        setState(timeSeconds, weight) {
          this._stateTimeSeconds = timeSeconds;
          this._stateWeight = weight;
        }
        /**
         * モーションの現在時刻の取得
         * @return モーションの現在時刻[秒]
         */
        getStateTime() {
          return this._stateTimeSeconds;
        }
        /**
         * モーションの重みの取得
         * @return モーションの重み
         */
        getStateWeight() {
          return this._stateWeight;
        }
        /**
         * 最後にイベントの発火をチェックした時間を取得
         *
         * @return 最後にイベントの発火をチェックした時間[秒]
         */
        getLastCheckEventSeconds() {
          return this._lastEventCheckSeconds;
        }
        /**
         * 最後にイベントをチェックした時間を設定
         * @param checkSeconds 最後にイベントをチェックした時間[秒]
         */
        setLastCheckEventSeconds(checkSeconds) {
          this._lastEventCheckSeconds = checkSeconds;
        }
        /**
         * フェードアウト開始判定の取得
         * @return フェードアウト開始するかどうか
         */
        isTriggeredFadeOut() {
          return this._isTriggeredFadeOut;
        }
        /**
         * フェードアウト時間の取得
         * @return フェードアウト時間[秒]
         */
        getFadeOutSeconds() {
          return this._fadeOutSeconds;
        }
        /**
         * モーションの取得
         *
         * @return モーション
         */
        getCubismMotion() {
          return this._motion;
        }
      };
      exports.CubismMotionQueueEntry = CubismMotionQueueEntry;
      var $ = __importStar(require_cubismmotionqueueentry());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismMotionQueueEntry = $.CubismMotionQueueEntry;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/motion/cubismmotionqueuemanager.js
  var require_cubismmotionqueuemanager = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/motion/cubismmotionqueuemanager.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.InvalidMotionQueueEntryHandleValue = exports.CubismMotionQueueManager = void 0;
      var cubismmotionqueueentry_1 = require_cubismmotionqueueentry();
      var csmvector_1 = require_csmvector();
      var CubismMotionQueueManager = class {
        /**
         * コンストラクタ
         */
        constructor() {
          this._userTimeSeconds = 0;
          this._eventCallBack = null;
          this._eventCustomData = null;
          this._motions = new csmvector_1.csmVector();
        }
        /**
         * デストラクタ
         */
        release() {
          for (let i = 0; i < this._motions.getSize(); ++i) {
            if (this._motions.at(i)) {
              this._motions.at(i).release();
              this._motions.set(i, null);
            }
          }
          this._motions = null;
        }
        /**
         * 指定したモーションの開始
         *
         * 指定したモーションを開始する。同じタイプのモーションが既にある場合は、既存のモーションに終了フラグを立て、フェードアウトを開始させる。
         *
         * @param   motion          開始するモーション
         * @param   autoDelete      再生が終了したモーションのインスタンスを削除するなら true
         * @param   userTimeSeconds Deprecated: デルタ時間の積算値[秒] 関数内で参照していないため使用は非推奨。
         * @return                      開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
         */
        startMotion(motion, autoDelete, userTimeSeconds) {
          if (motion == null) {
            return exports.InvalidMotionQueueEntryHandleValue;
          }
          let motionQueueEntry = null;
          for (let i = 0; i < this._motions.getSize(); ++i) {
            motionQueueEntry = this._motions.at(i);
            if (motionQueueEntry == null) {
              continue;
            }
            motionQueueEntry.setFadeOut(motionQueueEntry._motion.getFadeOutTime());
          }
          motionQueueEntry = new cubismmotionqueueentry_1.CubismMotionQueueEntry();
          motionQueueEntry._autoDelete = autoDelete;
          motionQueueEntry._motion = motion;
          this._motions.pushBack(motionQueueEntry);
          return motionQueueEntry._motionQueueEntryHandle;
        }
        /**
         * 全てのモーションの終了の確認
         * @return true 全て終了している
         * @return false 終了していない
         */
        isFinished() {
          for (let ite = this._motions.begin(); ite.notEqual(this._motions.end()); ) {
            let motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
              ite = this._motions.erase(ite);
              continue;
            }
            const motion = motionQueueEntry._motion;
            if (motion == null) {
              motionQueueEntry.release();
              motionQueueEntry = null;
              ite = this._motions.erase(ite);
              continue;
            }
            if (!motionQueueEntry.isFinished()) {
              return false;
            } else {
              ite.preIncrement();
            }
          }
          return true;
        }
        /**
         * 指定したモーションの終了の確認
         * @param motionQueueEntryNumber モーションの識別番号
         * @return true 全て終了している
         * @return false 終了していない
         */
        isFinishedByHandle(motionQueueEntryNumber) {
          for (let ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.increment()) {
            const motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
              continue;
            }
            if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber && !motionQueueEntry.isFinished()) {
              return false;
            }
          }
          return true;
        }
        /**
         * 全てのモーションを停止する
         */
        stopAllMotions() {
          for (let ite = this._motions.begin(); ite.notEqual(this._motions.end()); ) {
            let motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
              ite = this._motions.erase(ite);
              continue;
            }
            motionQueueEntry.release();
            motionQueueEntry = null;
            ite = this._motions.erase(ite);
          }
        }
        /**
         * @brief CubismMotionQueueEntryの配列の取得
         *
         * CubismMotionQueueEntryの配列を取得する。
         *
         * @return  CubismMotionQueueEntryの配列へのポインタ
         * @retval  NULL   見つからなかった
         */
        getCubismMotionQueueEntries() {
          return this._motions;
        }
        /**
           * 指定したCubismMotionQueueEntryの取得
        
           * @param   motionQueueEntryNumber  モーションの識別番号
           * @return  指定したCubismMotionQueueEntry
           * @return  null   見つからなかった
           */
        getCubismMotionQueueEntry(motionQueueEntryNumber) {
          for (let ite = this._motions.begin(); ite.notEqual(this._motions.end()); ite.preIncrement()) {
            const motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
              continue;
            }
            if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber) {
              return motionQueueEntry;
            }
          }
          return null;
        }
        /**
         * イベントを受け取るCallbackの登録
         *
         * @param callback コールバック関数
         * @param customData コールバックに返されるデータ
         */
        setEventCallback(callback, customData = null) {
          this._eventCallBack = callback;
          this._eventCustomData = customData;
        }
        /**
         * モーションを更新して、モデルにパラメータ値を反映する。
         *
         * @param   model   対象のモデル
         * @param   userTimeSeconds   デルタ時間の積算値[秒]
         * @return  true    モデルへパラメータ値の反映あり
         * @return  false   モデルへパラメータ値の反映なし(モーションの変化なし)
         */
        doUpdateMotion(model, userTimeSeconds) {
          let updated = false;
          for (let ite = this._motions.begin(); ite.notEqual(this._motions.end()); ) {
            let motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
              ite = this._motions.erase(ite);
              continue;
            }
            const motion = motionQueueEntry._motion;
            if (motion == null) {
              motionQueueEntry.release();
              motionQueueEntry = null;
              ite = this._motions.erase(ite);
              continue;
            }
            motion.updateParameters(model, motionQueueEntry, userTimeSeconds);
            updated = true;
            const firedList = motion.getFiredEvent(motionQueueEntry.getLastCheckEventSeconds() - motionQueueEntry.getStartTime(), userTimeSeconds - motionQueueEntry.getStartTime());
            for (let i = 0; i < firedList.getSize(); ++i) {
              this._eventCallBack(this, firedList.at(i), this._eventCustomData);
            }
            motionQueueEntry.setLastCheckEventSeconds(userTimeSeconds);
            if (motionQueueEntry.isFinished()) {
              motionQueueEntry.release();
              motionQueueEntry = null;
              ite = this._motions.erase(ite);
            } else {
              if (motionQueueEntry.isTriggeredFadeOut()) {
                motionQueueEntry.startFadeOut(motionQueueEntry.getFadeOutSeconds(), userTimeSeconds);
              }
              ite.preIncrement();
            }
          }
          return updated;
        }
      };
      exports.CubismMotionQueueManager = CubismMotionQueueManager;
      exports.InvalidMotionQueueEntryHandleValue = -1;
      var $ = __importStar(require_cubismmotionqueuemanager());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismMotionQueueManager = $.CubismMotionQueueManager;
        Live2DCubismFramework2.InvalidMotionQueueEntryHandleValue = $.InvalidMotionQueueEntryHandleValue;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/math/cubismviewmatrix.js
  var require_cubismviewmatrix = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/math/cubismviewmatrix.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismViewMatrix = void 0;
      var cubismmatrix44_1 = require_cubismmatrix44();
      var CubismViewMatrix = class extends cubismmatrix44_1.CubismMatrix44 {
        /**
         * コンストラクタ
         */
        constructor() {
          super();
          this._screenLeft = 0;
          this._screenRight = 0;
          this._screenTop = 0;
          this._screenBottom = 0;
          this._maxLeft = 0;
          this._maxRight = 0;
          this._maxTop = 0;
          this._maxBottom = 0;
          this._maxScale = 0;
          this._minScale = 0;
        }
        /**
         * 移動を調整
         *
         * @param x X軸の移動量
         * @param y Y軸の移動量
         */
        adjustTranslate(x, y) {
          if (this._tr[0] * this._maxLeft + (this._tr[12] + x) > this._screenLeft) {
            x = this._screenLeft - this._tr[0] * this._maxLeft - this._tr[12];
          }
          if (this._tr[0] * this._maxRight + (this._tr[12] + x) < this._screenRight) {
            x = this._screenRight - this._tr[0] * this._maxRight - this._tr[12];
          }
          if (this._tr[5] * this._maxTop + (this._tr[13] + y) < this._screenTop) {
            y = this._screenTop - this._tr[5] * this._maxTop - this._tr[13];
          }
          if (this._tr[5] * this._maxBottom + (this._tr[13] + y) > this._screenBottom) {
            y = this._screenBottom - this._tr[5] * this._maxBottom - this._tr[13];
          }
          const tr1 = new Float32Array([
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            x,
            y,
            0,
            1
          ]);
          cubismmatrix44_1.CubismMatrix44.multiply(tr1, this._tr, this._tr);
        }
        /**
         * 拡大率を調整
         *
         * @param cx 拡大を行うX軸の中心位置
         * @param cy 拡大を行うY軸の中心位置
         * @param scale 拡大率
         */
        adjustScale(cx, cy, scale) {
          const maxScale = this.getMaxScale();
          const minScale = this.getMinScale();
          const targetScale = scale * this._tr[0];
          if (targetScale < minScale) {
            if (this._tr[0] > 0) {
              scale = minScale / this._tr[0];
            }
          } else if (targetScale > maxScale) {
            if (this._tr[0] > 0) {
              scale = maxScale / this._tr[0];
            }
          }
          const tr1 = new Float32Array([
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            cx,
            cy,
            0,
            1
          ]);
          const tr2 = new Float32Array([
            scale,
            0,
            0,
            0,
            0,
            scale,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1
          ]);
          const tr3 = new Float32Array([
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            -cx,
            -cy,
            0,
            1
          ]);
          cubismmatrix44_1.CubismMatrix44.multiply(tr3, this._tr, this._tr);
          cubismmatrix44_1.CubismMatrix44.multiply(tr2, this._tr, this._tr);
          cubismmatrix44_1.CubismMatrix44.multiply(tr1, this._tr, this._tr);
        }
        /**
         * デバイスに対応する論理座養生の範囲の設定
         *
         * @param left      左辺のX軸の位置
         * @param right     右辺のX軸の位置
         * @param bottom    下辺のY軸の位置
         * @param top       上辺のY軸の位置
         */
        setScreenRect(left, right, bottom, top) {
          this._screenLeft = left;
          this._screenRight = right;
          this._screenBottom = bottom;
          this._screenTop = top;
        }
        /**
         * デバイスに対応する論理座標上の移動可能範囲の設定
         * @param left      左辺のX軸の位置
         * @param right     右辺のX軸の位置
         * @param bottom    下辺のY軸の位置
         * @param top       上辺のY軸の位置
         */
        setMaxScreenRect(left, right, bottom, top) {
          this._maxLeft = left;
          this._maxRight = right;
          this._maxTop = top;
          this._maxBottom = bottom;
        }
        /**
         * 最大拡大率の設定
         * @param maxScale 最大拡大率
         */
        setMaxScale(maxScale) {
          this._maxScale = maxScale;
        }
        /**
         * 最小拡大率の設定
         * @param minScale 最小拡大率
         */
        setMinScale(minScale) {
          this._minScale = minScale;
        }
        /**
         * 最大拡大率の取得
         * @return 最大拡大率
         */
        getMaxScale() {
          return this._maxScale;
        }
        /**
         * 最小拡大率の取得
         * @return 最小拡大率
         */
        getMinScale() {
          return this._minScale;
        }
        /**
         * 拡大率が最大になっているかを確認する
         *
         * @return true 拡大率は最大
         * @return false 拡大率は最大ではない
         */
        isMaxScale() {
          return this.getScaleX() >= this._maxScale;
        }
        /**
         * 拡大率が最小になっているかを確認する
         *
         * @return true 拡大率は最小
         * @return false 拡大率は最小ではない
         */
        isMinScale() {
          return this.getScaleX() <= this._minScale;
        }
        /**
         * デバイスに対応する論理座標の左辺のＸ軸位置を取得する
         * @return デバイスに対応する論理座標の左辺のX軸位置
         */
        getScreenLeft() {
          return this._screenLeft;
        }
        /**
         * デバイスに対応する論理座標の右辺のＸ軸位置を取得する
         * @return デバイスに対応する論理座標の右辺のX軸位置
         */
        getScreenRight() {
          return this._screenRight;
        }
        /**
         * デバイスに対応する論理座標の下辺のY軸位置を取得する
         * @return デバイスに対応する論理座標の下辺のY軸位置
         */
        getScreenBottom() {
          return this._screenBottom;
        }
        /**
         * デバイスに対応する論理座標の上辺のY軸位置を取得する
         * @return デバイスに対応する論理座標の上辺のY軸位置
         */
        getScreenTop() {
          return this._screenTop;
        }
        /**
         * 左辺のX軸位置の最大値の取得
         * @return 左辺のX軸位置の最大値
         */
        getMaxLeft() {
          return this._maxLeft;
        }
        /**
         * 右辺のX軸位置の最大値の取得
         * @return 右辺のX軸位置の最大値
         */
        getMaxRight() {
          return this._maxRight;
        }
        /**
         * 下辺のY軸位置の最大値の取得
         * @return 下辺のY軸位置の最大値
         */
        getMaxBottom() {
          return this._maxBottom;
        }
        /**
         * 上辺のY軸位置の最大値の取得
         * @return 上辺のY軸位置の最大値
         */
        getMaxTop() {
          return this._maxTop;
        }
      };
      exports.CubismViewMatrix = CubismViewMatrix;
      var $ = __importStar(require_cubismviewmatrix());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismViewMatrix = $.CubismViewMatrix;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/model/cubismmodel.js
  var require_cubismmodel = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/model/cubismmodel.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismModel = exports.DrawableCullingData = exports.PartColorData = exports.DrawableColorData = exports.ParameterRepeatData = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var cubismmath_1 = require_cubismmath();
      var cubismrenderer_1 = require_cubismrenderer();
      var csmmap_1 = require_csmmap();
      var csmvector_1 = require_csmvector();
      var cubismdebug_1 = require_cubismdebug();
      var ParameterRepeatData = class {
        /**
         * Constructor
         *
         * @param isOverridden whether to be overriden
         * @param isParameterRepeated override flag for settings
         */
        constructor(isOverridden = false, isParameterRepeated = false) {
          this.isOverridden = isOverridden;
          this.isParameterRepeated = isParameterRepeated;
        }
      };
      exports.ParameterRepeatData = ParameterRepeatData;
      var DrawableColorData = class {
        constructor(isOverridden = false, color = new cubismrenderer_1.CubismTextureColor()) {
          this.isOverridden = isOverridden;
          this.color = color;
        }
        get isOverwritten() {
          return this.isOverridden;
        }
      };
      exports.DrawableColorData = DrawableColorData;
      var PartColorData = class {
        constructor(isOverridden = false, color = new cubismrenderer_1.CubismTextureColor()) {
          this.isOverridden = isOverridden;
          this.color = color;
        }
        get isOverwritten() {
          return this.isOverridden;
        }
      };
      exports.PartColorData = PartColorData;
      var DrawableCullingData = class {
        /**
         * コンストラクタ
         *
         * @param isOverridden
         * @param isCulling
         */
        constructor(isOverridden = false, isCulling = false) {
          this.isOverridden = isOverridden;
          this.isCulling = isCulling;
        }
        get isOverwritten() {
          return this.isOverridden;
        }
      };
      exports.DrawableCullingData = DrawableCullingData;
      var CubismModel = class {
        /**
         * モデルのパラメータの更新
         */
        update() {
          this._model.update();
          this._model.drawables.resetDynamicFlags();
        }
        /**
         * PixelsPerUnitを取得する
         * @returns PixelsPerUnit
         */
        getPixelsPerUnit() {
          if (this._model == null) {
            return 0;
          }
          return this._model.canvasinfo.PixelsPerUnit;
        }
        /**
         * キャンバスの幅を取得する
         */
        getCanvasWidth() {
          if (this._model == null) {
            return 0;
          }
          return this._model.canvasinfo.CanvasWidth / this._model.canvasinfo.PixelsPerUnit;
        }
        /**
         * キャンバスの高さを取得する
         */
        getCanvasHeight() {
          if (this._model == null) {
            return 0;
          }
          return this._model.canvasinfo.CanvasHeight / this._model.canvasinfo.PixelsPerUnit;
        }
        /**
         * パラメータを保存する
         */
        saveParameters() {
          const parameterCount = this._model.parameters.count;
          const savedParameterCount = this._savedParameters.getSize();
          for (let i = 0; i < parameterCount; ++i) {
            if (i < savedParameterCount) {
              this._savedParameters.set(i, this._parameterValues[i]);
            } else {
              this._savedParameters.pushBack(this._parameterValues[i]);
            }
          }
        }
        /**
         * 乗算色を取得する
         * @param index Drawablesのインデックス
         * @returns 指定したdrawableの乗算色(RGBA)
         */
        getMultiplyColor(index) {
          if (this.getOverrideFlagForModelMultiplyColors() || this.getOverrideFlagForDrawableMultiplyColors(index)) {
            return this._userMultiplyColors.at(index).color;
          }
          const color = this.getDrawableMultiplyColor(index);
          return color;
        }
        /**
         * スクリーン色を取得する
         * @param index Drawablesのインデックス
         * @returns 指定したdrawableのスクリーン色(RGBA)
         */
        getScreenColor(index) {
          if (this.getOverrideFlagForModelScreenColors() || this.getOverrideFlagForDrawableScreenColors(index)) {
            return this._userScreenColors.at(index).color;
          }
          const color = this.getDrawableScreenColor(index);
          return color;
        }
        /**
         * 乗算色をセットする
         * @param index Drawablesのインデックス
         * @param color 設定する乗算色(CubismTextureColor)
         */
        setMultiplyColorByTextureColor(index, color) {
          this.setMultiplyColorByRGBA(index, color.r, color.g, color.b, color.a);
        }
        /**
         * 乗算色をセットする
         * @param index Drawablesのインデックス
         * @param r 設定する乗算色のR値
         * @param g 設定する乗算色のG値
         * @param b 設定する乗算色のB値
         * @param a 設定する乗算色のA値
         */
        setMultiplyColorByRGBA(index, r, g, b, a = 1) {
          this._userMultiplyColors.at(index).color.r = r;
          this._userMultiplyColors.at(index).color.g = g;
          this._userMultiplyColors.at(index).color.b = b;
          this._userMultiplyColors.at(index).color.a = a;
        }
        /**
         * スクリーン色をセットする
         * @param index Drawablesのインデックス
         * @param color 設定するスクリーン色(CubismTextureColor)
         */
        setScreenColorByTextureColor(index, color) {
          this.setScreenColorByRGBA(index, color.r, color.g, color.b, color.a);
        }
        /**
         * スクリーン色をセットする
         * @param index Drawablesのインデックス
         * @param r 設定するスクリーン色のR値
         * @param g 設定するスクリーン色のG値
         * @param b 設定するスクリーン色のB値
         * @param a 設定するスクリーン色のA値
         */
        setScreenColorByRGBA(index, r, g, b, a = 1) {
          this._userScreenColors.at(index).color.r = r;
          this._userScreenColors.at(index).color.g = g;
          this._userScreenColors.at(index).color.b = b;
          this._userScreenColors.at(index).color.a = a;
        }
        /**
         * partの乗算色を取得する
         * @param partIndex partのインデックス
         * @returns 指定したpartの乗算色
         */
        getPartMultiplyColor(partIndex) {
          return this._userPartMultiplyColors.at(partIndex).color;
        }
        /**
         * partのスクリーン色を取得する
         * @param partIndex partのインデックス
         * @returns 指定したpartのスクリーン色
         */
        getPartScreenColor(partIndex) {
          return this._userPartScreenColors.at(partIndex).color;
        }
        /**
         * partのOverrideColor setter関数
         * @param partIndex partのインデックス
         * @param r 設定する色のR値
         * @param g 設定する色のG値
         * @param b 設定する色のB値
         * @param a 設定する色のA値
         * @param partColors 設定するpartのカラーデータ配列
         * @param drawableColors partに関連するDrawableのカラーデータ配列
         */
        setPartColor(partIndex, r, g, b, a, partColors, drawableColors) {
          partColors.at(partIndex).color.r = r;
          partColors.at(partIndex).color.g = g;
          partColors.at(partIndex).color.b = b;
          partColors.at(partIndex).color.a = a;
          if (partColors.at(partIndex).isOverridden) {
            for (let i = 0; i < this._partChildDrawables.at(partIndex).getSize(); ++i) {
              const drawableIndex = this._partChildDrawables.at(partIndex).at(i);
              drawableColors.at(drawableIndex).color.r = r;
              drawableColors.at(drawableIndex).color.g = g;
              drawableColors.at(drawableIndex).color.b = b;
              drawableColors.at(drawableIndex).color.a = a;
            }
          }
        }
        /**
         * 乗算色をセットする
         * @param partIndex partのインデックス
         * @param color 設定する乗算色(CubismTextureColor)
         */
        setPartMultiplyColorByTextureColor(partIndex, color) {
          this.setPartMultiplyColorByRGBA(partIndex, color.r, color.g, color.b, color.a);
        }
        /**
         * 乗算色をセットする
         * @param partIndex partのインデックス
         * @param r 設定する乗算色のR値
         * @param g 設定する乗算色のG値
         * @param b 設定する乗算色のB値
         * @param a 設定する乗算色のA値
         */
        setPartMultiplyColorByRGBA(partIndex, r, g, b, a) {
          this.setPartColor(partIndex, r, g, b, a, this._userPartMultiplyColors, this._userMultiplyColors);
        }
        /**
         * スクリーン色をセットする
         * @param partIndex partのインデックス
         * @param color 設定するスクリーン色(CubismTextureColor)
         */
        setPartScreenColorByTextureColor(partIndex, color) {
          this.setPartScreenColorByRGBA(partIndex, color.r, color.g, color.b, color.a);
        }
        /**
         * スクリーン色をセットする
         * @param partIndex partのインデックス
         * @param r 設定するスクリーン色のR値
         * @param g 設定するスクリーン色のG値
         * @param b 設定するスクリーン色のB値
         * @param a 設定するスクリーン色のA値
         */
        setPartScreenColorByRGBA(partIndex, r, g, b, a) {
          this.setPartColor(partIndex, r, g, b, a, this._userPartScreenColors, this._userScreenColors);
        }
        /**
         * Checks whether parameter repetition is performed for the entire model.
         *
         * @return true if parameter repetition is performed for the entire model; otherwise returns false.
         */
        getOverrideFlagForModelParameterRepeat() {
          return this._isOverriddenParameterRepeat;
        }
        /**
         * Sets whether parameter repetition is performed for the entire model.
         * Use true to perform parameter repetition for the entire model, or false to not perform it.
         */
        setOverrideFlagForModelParameterRepeat(isRepeat) {
          this._isOverriddenParameterRepeat = isRepeat;
        }
        /**
         * Returns the flag indicating whether to override the parameter repeat.
         *
         * @param parameterIndex Parameter index
         *
         * @return true if the parameter repeat is overridden, false otherwise.
         */
        getOverrideFlagForParameterRepeat(parameterIndex) {
          return this._userParameterRepeatDataList.at(parameterIndex).isOverridden;
        }
        /**
         * Sets the flag indicating whether to override the parameter repeat.
         *
         * @param parameterIndex Parameter index
         * @param value true if it is to be overridden; otherwise, false.
         */
        setOverrideFlagForParameterRepeat(parameterIndex, value) {
          this._userParameterRepeatDataList.at(parameterIndex).isOverridden = value;
        }
        /**
         * Returns the repeat flag.
         *
         * @param parameterIndex Parameter index
         *
         * @return true if repeating, false otherwise.
         */
        getRepeatFlagForParameterRepeat(parameterIndex) {
          return this._userParameterRepeatDataList.at(parameterIndex).isParameterRepeated;
        }
        /**
         * Sets the repeat flag.
         *
         * @param parameterIndex Parameter index
         * @param value true to enable repeating, false otherwise.
         */
        setRepeatFlagForParameterRepeat(parameterIndex, value) {
          this._userParameterRepeatDataList.at(parameterIndex).isParameterRepeated = value;
        }
        /**
         * SDKから指定したモデルの乗算色を上書きするか
         *
         * @deprecated 名称変更のため非推奨 getOverrideFlagForModelMultiplyColors() に置き換え
         *
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverwriteFlagForModelMultiplyColors() {
          (0, cubismdebug_1.CubismLogWarning)("getOverwriteFlagForModelMultiplyColors() is a deprecated function. Please use getOverrideFlagForModelMultiplyColors().");
          return this.getOverrideFlagForModelMultiplyColors();
        }
        /**
         * SDKから指定したモデルの乗算色を上書きするか
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverrideFlagForModelMultiplyColors() {
          return this._isOverriddenModelMultiplyColors;
        }
        /**
         * SDKから指定したモデルのスクリーン色を上書きするか
         *
         * @deprecated 名称変更のため非推奨 getOverrideFlagForModelScreenColors() に置き換え
         *
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverwriteFlagForModelScreenColors() {
          (0, cubismdebug_1.CubismLogWarning)("getOverwriteFlagForModelScreenColors() is a deprecated function. Please use getOverrideFlagForModelScreenColors().");
          return this.getOverrideFlagForModelScreenColors();
        }
        /**
         * SDKから指定したモデルのスクリーン色を上書きするか
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverrideFlagForModelScreenColors() {
          return this._isOverriddenModelScreenColors;
        }
        /**
         * SDKから指定したモデルの乗算色を上書きするかセットする
         *
         * @deprecated 名称変更のため非推奨 setOverrideFlagForModelMultiplyColors(value: boolean) に置き換え
         *
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteFlagForModelMultiplyColors(value) {
          (0, cubismdebug_1.CubismLogWarning)("setOverwriteFlagForModelMultiplyColors(value: boolean) is a deprecated function. Please use setOverrideFlagForModelMultiplyColors(value: boolean).");
          this.setOverrideFlagForModelMultiplyColors(value);
        }
        /**
         * SDKから指定したモデルの乗算色を上書きするかセットする
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverrideFlagForModelMultiplyColors(value) {
          this._isOverriddenModelMultiplyColors = value;
        }
        /**
         * SDKから指定したモデルのスクリーン色を上書きするかセットする
         *
         * @deprecated 名称変更のため非推奨 setOverrideFlagForModelScreenColors(value: boolean) に置き換え
         *
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteFlagForModelScreenColors(value) {
          (0, cubismdebug_1.CubismLogWarning)("setOverwriteFlagForModelScreenColors(value: boolean) is a deprecated function. Please use setOverrideFlagForModelScreenColors(value: boolean).");
          this.setOverrideFlagForModelScreenColors(value);
        }
        /**
         * SDKから指定したモデルのスクリーン色を上書きするかセットする
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverrideFlagForModelScreenColors(value) {
          this._isOverriddenModelScreenColors = value;
        }
        /**
         * SDKから指定したDrawableIndexの乗算色を上書きするか
         *
         * @deprecated 名称変更のため非推奨 getOverrideFlagForDrawableMultiplyColors(drawableindex: number) に置き換え
         *
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverwriteFlagForDrawableMultiplyColors(drawableindex) {
          (0, cubismdebug_1.CubismLogWarning)("getOverwriteFlagForDrawableMultiplyColors(drawableindex: number) is a deprecated function. Please use getOverrideFlagForDrawableMultiplyColors(drawableindex: number).");
          return this.getOverrideFlagForDrawableMultiplyColors(drawableindex);
        }
        /**
         * SDKから指定したDrawableIndexの乗算色を上書きするか
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverrideFlagForDrawableMultiplyColors(drawableindex) {
          return this._userMultiplyColors.at(drawableindex).isOverridden;
        }
        /**
         * SDKから指定したDrawableIndexのスクリーン色を上書きするか
         *
         * @deprecated 名称変更のため非推奨 getOverrideFlagForDrawableScreenColors(drawableindex: number) に置き換え
         *
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverwriteFlagForDrawableScreenColors(drawableindex) {
          (0, cubismdebug_1.CubismLogWarning)("getOverwriteFlagForDrawableScreenColors(drawableindex: number) is a deprecated function. Please use getOverrideFlagForDrawableScreenColors(drawableindex: number).");
          return this.getOverrideFlagForDrawableScreenColors(drawableindex);
        }
        /**
         * SDKから指定したDrawableIndexのスクリーン色を上書きするか
         * @returns true -> SDKからの情報を優先する
         *          false -> モデルに設定されている色情報を使用
         */
        getOverrideFlagForDrawableScreenColors(drawableindex) {
          return this._userScreenColors.at(drawableindex).isOverridden;
        }
        /**
         * SDKから指定したDrawableIndexの乗算色を上書きするかセットする
         *
         * @deprecated 名称変更のため非推奨 setOverrideFlagForDrawableMultiplyColors(drawableindex: number, value: boolean) に置き換え
         *
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteFlagForDrawableMultiplyColors(drawableindex, value) {
          (0, cubismdebug_1.CubismLogWarning)("setOverwriteFlagForDrawableMultiplyColors(drawableindex: number, value: boolean) is a deprecated function. Please use setOverrideFlagForDrawableMultiplyColors(drawableindex: number, value: boolean).");
          this.setOverrideFlagForDrawableMultiplyColors(drawableindex, value);
        }
        /**
         * SDKから指定したDrawableIndexの乗算色を上書きするかセットする
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverrideFlagForDrawableMultiplyColors(drawableindex, value) {
          this._userMultiplyColors.at(drawableindex).isOverridden = value;
        }
        /**
         * SDKから指定したDrawableIndexのスクリーン色を上書きするかセットする
         *
         * @deprecated 名称変更のため非推奨 setOverrideFlagForDrawableScreenColors(drawableindex: number, value: boolean) に置き換え
         *
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteFlagForDrawableScreenColors(drawableindex, value) {
          (0, cubismdebug_1.CubismLogWarning)("setOverwriteFlagForDrawableScreenColors(drawableindex: number, value: boolean) is a deprecated function. Please use setOverrideFlagForDrawableScreenColors(drawableindex: number, value: boolean).");
          this.setOverrideFlagForDrawableScreenColors(drawableindex, value);
        }
        /**
         * SDKから指定したDrawableIndexのスクリーン色を上書きするかセットする
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverrideFlagForDrawableScreenColors(drawableindex, value) {
          this._userScreenColors.at(drawableindex).isOverridden = value;
        }
        /**
         * SDKからpartの乗算色を上書きするか
         *
         * @deprecated 名称変更のため非推奨 getOverrideColorForPartMultiplyColors(partIndex: number) に置き換え
         *
         * @param partIndex partのインデックス
         * @returns true    ->  SDKからの情報を優先する
         *          false   ->  モデルに設定されている色情報を使用
         */
        getOverwriteColorForPartMultiplyColors(partIndex) {
          (0, cubismdebug_1.CubismLogWarning)("getOverwriteColorForPartMultiplyColors(partIndex: number) is a deprecated function. Please use getOverrideColorForPartMultiplyColors(partIndex: number).");
          return this.getOverrideColorForPartMultiplyColors(partIndex);
        }
        /**
         * SDKからpartの乗算色を上書きするか
         * @param partIndex partのインデックス
         * @returns true    ->  SDKからの情報を優先する
         *          false   ->  モデルに設定されている色情報を使用
         */
        getOverrideColorForPartMultiplyColors(partIndex) {
          return this._userPartMultiplyColors.at(partIndex).isOverridden;
        }
        /**
         * SDKからpartのスクリーン色を上書きするか
         *
         * @deprecated 名称変更のため非推奨 getOverrideColorForPartScreenColors(partIndex: number) に置き換え
         *
         * @param partIndex partのインデックス
         * @returns true    ->  SDKからの情報を優先する
         *          false   ->  モデルに設定されている色情報を使用
         */
        getOverwriteColorForPartScreenColors(partIndex) {
          (0, cubismdebug_1.CubismLogWarning)("getOverwriteColorForPartScreenColors(partIndex: number) is a deprecated function. Please use getOverrideColorForPartScreenColors(partIndex: number).");
          return this.getOverrideColorForPartScreenColors(partIndex);
        }
        /**
         * SDKからpartのスクリーン色を上書きするか
         * @param partIndex partのインデックス
         * @returns true    ->  SDKからの情報を優先する
         *          false   ->  モデルに設定されている色情報を使用
         */
        getOverrideColorForPartScreenColors(partIndex) {
          return this._userPartScreenColors.at(partIndex).isOverridden;
        }
        /**
         * partのOverrideFlag setter関数
         *
         * @deprecated 名称変更のため非推奨 setOverrideColorForPartColors(
         * partIndex: number,
         * value: boolean,
         * partColors: csmVector<PartColorData>,
         * drawableColors: csmVector<DrawableColorData>) に置き換え
         *
         * @param partIndex partのインデックス
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         * @param partColors 設定するpartのカラーデータ配列
         * @param drawableColors partに関連するDrawableのカラーデータ配列
         */
        setOverwriteColorForPartColors(partIndex, value, partColors, drawableColors) {
          (0, cubismdebug_1.CubismLogWarning)("setOverwriteColorForPartColors(partIndex: number, value: boolean, partColors: csmVector<PartColorData>, drawableColors: csmVector<DrawableColorData>) is a deprecated function. Please use setOverrideColorForPartColors(partIndex: number, value: boolean, partColors: csmVector<PartColorData>, drawableColors: csmVector<DrawableColorData>).");
          this.setOverrideColorForPartColors(partIndex, value, partColors, drawableColors);
        }
        /**
         * partのOverrideFlag setter関数
         * @param partIndex partのインデックス
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         * @param partColors 設定するpartのカラーデータ配列
         * @param drawableColors partに関連するDrawableのカラーデータ配列
         */
        setOverrideColorForPartColors(partIndex, value, partColors, drawableColors) {
          partColors.at(partIndex).isOverridden = value;
          for (let i = 0; i < this._partChildDrawables.at(partIndex).getSize(); ++i) {
            const drawableIndex = this._partChildDrawables.at(partIndex).at(i);
            drawableColors.at(drawableIndex).isOverridden = value;
            if (value) {
              drawableColors.at(drawableIndex).color.r = partColors.at(partIndex).color.r;
              drawableColors.at(drawableIndex).color.g = partColors.at(partIndex).color.g;
              drawableColors.at(drawableIndex).color.b = partColors.at(partIndex).color.b;
              drawableColors.at(drawableIndex).color.a = partColors.at(partIndex).color.a;
            }
          }
        }
        /**
         * SDKからpartのスクリーン色を上書きするかをセットする
         *
         * @deprecated 名称変更のため非推奨 setOverrideColorForPartMultiplyColors(partIndex: number, value: boolean) に置き換え
         *
         * @param partIndex partのインデックス
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteColorForPartMultiplyColors(partIndex, value) {
          (0, cubismdebug_1.CubismLogWarning)("setOverwriteColorForPartMultiplyColors(partIndex: number, value: boolean) is a deprecated function. Please use setOverrideColorForPartMultiplyColors(partIndex: number, value: boolean).");
          this.setOverrideColorForPartMultiplyColors(partIndex, value);
        }
        /**
         * SDKからpartのスクリーン色を上書きするかをセットする
         * @param partIndex partのインデックス
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverrideColorForPartMultiplyColors(partIndex, value) {
          this._userPartMultiplyColors.at(partIndex).isOverridden = value;
          this.setOverrideColorForPartColors(partIndex, value, this._userPartMultiplyColors, this._userMultiplyColors);
        }
        /**
         * SDKからpartのスクリーン色を上書きするかをセットする
         *
         * @deprecated 名称変更のため非推奨 setOverrideColorForPartScreenColors(partIndex: number, value: boolean) に置き換え
         *
         * @param partIndex partのインデックス
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverwriteColorForPartScreenColors(partIndex, value) {
          (0, cubismdebug_1.CubismLogWarning)("setOverwriteColorForPartScreenColors(partIndex: number, value: boolean) is a deprecated function. Please use setOverrideColorForPartScreenColors(partIndex: number, value: boolean).");
          this.setOverrideColorForPartScreenColors(partIndex, value);
        }
        /**
         * SDKからpartのスクリーン色を上書きするかをセットする
         * @param partIndex partのインデックス
         * @param value true -> SDKからの情報を優先する
         *              false -> モデルに設定されている色情報を使用
         */
        setOverrideColorForPartScreenColors(partIndex, value) {
          this._userPartScreenColors.at(partIndex).isOverridden = value;
          this.setOverrideColorForPartColors(partIndex, value, this._userPartScreenColors, this._userScreenColors);
        }
        /**
         * Drawableのカリング情報を取得する。
         *
         * @param   drawableIndex   Drawableのインデックス
         * @return  Drawableのカリング情報
         */
        getDrawableCulling(drawableIndex) {
          if (this.getOverrideFlagForModelCullings() || this.getOverrideFlagForDrawableCullings(drawableIndex)) {
            return this._userCullings.at(drawableIndex).isCulling;
          }
          const constantFlags = this._model.drawables.constantFlags;
          return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(constantFlags[drawableIndex]);
        }
        /**
         * Drawableのカリング情報を設定する。
         *
         * @param drawableIndex Drawableのインデックス
         * @param isCulling カリング情報
         */
        setDrawableCulling(drawableIndex, isCulling) {
          this._userCullings.at(drawableIndex).isCulling = isCulling;
        }
        /**
         * SDKからモデル全体のカリング設定を上書きするか。
         *
         * @deprecated 名称変更のため非推奨 getOverrideFlagForModelCullings() に置き換え
         *
         * @retval  true    ->  SDK上のカリング設定を使用
         * @retval  false   ->  モデルのカリング設定を使用
         */
        getOverwriteFlagForModelCullings() {
          (0, cubismdebug_1.CubismLogWarning)("getOverwriteFlagForModelCullings() is a deprecated function. Please use getOverrideFlagForModelCullings().");
          return this.getOverrideFlagForModelCullings();
        }
        /**
         * SDKからモデル全体のカリング設定を上書きするか。
         *
         * @retval  true    ->  SDK上のカリング設定を使用
         * @retval  false   ->  モデルのカリング設定を使用
         */
        getOverrideFlagForModelCullings() {
          return this._isOverriddenCullings;
        }
        /**
         * SDKからモデル全体のカリング設定を上書きするかを設定する。
         *
         * @deprecated 名称変更のため非推奨 setOverrideFlagForModelCullings(isOverriddenCullings: boolean) に置き換え
         *
         * @param isOveriddenCullings SDK上のカリング設定を使うならtrue、モデルのカリング設定を使うならfalse
         */
        setOverwriteFlagForModelCullings(isOverriddenCullings) {
          (0, cubismdebug_1.CubismLogWarning)("setOverwriteFlagForModelCullings(isOverriddenCullings: boolean) is a deprecated function. Please use setOverrideFlagForModelCullings(isOverriddenCullings: boolean).");
          this.setOverrideFlagForModelCullings(isOverriddenCullings);
        }
        /**
         * SDKからモデル全体のカリング設定を上書きするかを設定する。
         *
         * @param isOverriddenCullings SDK上のカリング設定を使うならtrue、モデルのカリング設定を使うならfalse
         */
        setOverrideFlagForModelCullings(isOverriddenCullings) {
          this._isOverriddenCullings = isOverriddenCullings;
        }
        /**
         *
         * @deprecated 名称変更のため非推奨 getOverrideFlagForDrawableCullings(drawableIndex: number) に置き換え
         *
         * @param drawableIndex Drawableのインデックス
         * @retval  true    ->  SDK上のカリング設定を使用
         * @retval  false   ->  モデルのカリング設定を使用
         */
        getOverwriteFlagForDrawableCullings(drawableIndex) {
          (0, cubismdebug_1.CubismLogWarning)("getOverwriteFlagForDrawableCullings(drawableIndex: number) is a deprecated function. Please use getOverrideFlagForDrawableCullings(drawableIndex: number).");
          return this.getOverrideFlagForDrawableCullings(drawableIndex);
        }
        /**
         *
         * @param drawableIndex Drawableのインデックス
         * @retval  true    ->  SDK上のカリング設定を使用
         * @retval  false   ->  モデルのカリング設定を使用
         */
        getOverrideFlagForDrawableCullings(drawableIndex) {
          return this._userCullings.at(drawableIndex).isOverridden;
        }
        /**
         *
         * @deprecated 名称変更のため非推奨 setOverrideFlagForDrawableCullings(drawableIndex: number, isOverriddenCullings: bolean) に置き換え
         *
         * @param drawableIndex Drawableのインデックス
         * @param isOverriddenCullings SDK上のカリング設定を使うならtrue、モデルのカリング設定を使うならfalse
         */
        setOverwriteFlagForDrawableCullings(drawableIndex, isOverriddenCullings) {
          (0, cubismdebug_1.CubismLogWarning)("setOverwriteFlagForDrawableCullings(drawableIndex: number, isOverriddenCullings: boolean) is a deprecated function. Please use setOverrideFlagForDrawableCullings(drawableIndex: number, isOverriddenCullings: boolean).");
          this.setOverrideFlagForDrawableCullings(drawableIndex, isOverriddenCullings);
        }
        /**
         *
         * @param drawableIndex Drawableのインデックス
         * @param isOverriddenCullings SDK上のカリング設定を使うならtrue、モデルのカリング設定を使うならfalse
         */
        setOverrideFlagForDrawableCullings(drawableIndex, isOverriddenCullings) {
          this._userCullings.at(drawableIndex).isOverridden = isOverriddenCullings;
        }
        /**
         * モデルの不透明度を取得する
         *
         * @returns 不透明度の値
         */
        getModelOapcity() {
          return this._modelOpacity;
        }
        /**
         * モデルの不透明度を設定する
         *
         * @param value 不透明度の値
         */
        setModelOapcity(value) {
          this._modelOpacity = value;
        }
        /**
         * モデルを取得
         */
        getModel() {
          return this._model;
        }
        /**
         * パーツのインデックスを取得
         * @param partId パーツのID
         * @return パーツのインデックス
         */
        getPartIndex(partId) {
          let partIndex;
          const partCount = this._model.parts.count;
          for (partIndex = 0; partIndex < partCount; ++partIndex) {
            if (partId == this._partIds.at(partIndex)) {
              return partIndex;
            }
          }
          if (this._notExistPartId.isExist(partId)) {
            return this._notExistPartId.getValue(partId);
          }
          partIndex = partCount + this._notExistPartId.getSize();
          this._notExistPartId.setValue(partId, partIndex);
          this._notExistPartOpacities.appendKey(partIndex);
          return partIndex;
        }
        /**
         * パーツのIDを取得する。
         *
         * @param partIndex 取得するパーツのインデックス
         * @return パーツのID
         */
        getPartId(partIndex) {
          const partId = this._model.parts.ids[partIndex];
          return live2dcubismframework_1.CubismFramework.getIdManager().getId(partId);
        }
        /**
         * パーツの個数の取得
         * @return パーツの個数
         */
        getPartCount() {
          const partCount = this._model.parts.count;
          return partCount;
        }
        /**
         * パーツの親パーツインデックスのリストを取得
         *
         * @returns パーツの親パーツインデックスのリスト
         */
        getPartParentPartIndices() {
          const parentIndices = this._model.parts.parentIndices;
          return parentIndices;
        }
        /**
         * パーツの不透明度の設定(Index)
         * @param partIndex パーツのインデックス
         * @param opacity 不透明度
         */
        setPartOpacityByIndex(partIndex, opacity) {
          if (this._notExistPartOpacities.isExist(partIndex)) {
            this._notExistPartOpacities.setValue(partIndex, opacity);
            return;
          }
          (0, cubismdebug_1.CSM_ASSERT)(0 <= partIndex && partIndex < this.getPartCount());
          this._partOpacities[partIndex] = opacity;
        }
        /**
         * パーツの不透明度の設定(Id)
         * @param partId パーツのID
         * @param opacity パーツの不透明度
         */
        setPartOpacityById(partId, opacity) {
          const index = this.getPartIndex(partId);
          if (index < 0) {
            return;
          }
          this.setPartOpacityByIndex(index, opacity);
        }
        /**
         * パーツの不透明度の取得(index)
         * @param partIndex パーツのインデックス
         * @return パーツの不透明度
         */
        getPartOpacityByIndex(partIndex) {
          if (this._notExistPartOpacities.isExist(partIndex)) {
            return this._notExistPartOpacities.getValue(partIndex);
          }
          (0, cubismdebug_1.CSM_ASSERT)(0 <= partIndex && partIndex < this.getPartCount());
          return this._partOpacities[partIndex];
        }
        /**
         * パーツの不透明度の取得(id)
         * @param partId パーツのＩｄ
         * @return パーツの不透明度
         */
        getPartOpacityById(partId) {
          const index = this.getPartIndex(partId);
          if (index < 0) {
            return 0;
          }
          return this.getPartOpacityByIndex(index);
        }
        /**
         * パラメータのインデックスの取得
         * @param パラメータID
         * @return パラメータのインデックス
         */
        getParameterIndex(parameterId) {
          let parameterIndex;
          const idCount = this._model.parameters.count;
          for (parameterIndex = 0; parameterIndex < idCount; ++parameterIndex) {
            if (parameterId != this._parameterIds.at(parameterIndex)) {
              continue;
            }
            return parameterIndex;
          }
          if (this._notExistParameterId.isExist(parameterId)) {
            return this._notExistParameterId.getValue(parameterId);
          }
          parameterIndex = this._model.parameters.count + this._notExistParameterId.getSize();
          this._notExistParameterId.setValue(parameterId, parameterIndex);
          this._notExistParameterValues.appendKey(parameterIndex);
          return parameterIndex;
        }
        /**
         * パラメータの個数の取得
         * @return パラメータの個数
         */
        getParameterCount() {
          return this._model.parameters.count;
        }
        /**
         * パラメータの種類の取得
         * @param parameterIndex パラメータのインデックス
         * @return csmParameterType_Normal -> 通常のパラメータ
         *          csmParameterType_BlendShape -> ブレンドシェイプパラメータ
         */
        getParameterType(parameterIndex) {
          return this._model.parameters.types[parameterIndex];
        }
        /**
         * パラメータの最大値の取得
         * @param parameterIndex パラメータのインデックス
         * @return パラメータの最大値
         */
        getParameterMaximumValue(parameterIndex) {
          return this._model.parameters.maximumValues[parameterIndex];
        }
        /**
         * パラメータの最小値の取得
         * @param parameterIndex パラメータのインデックス
         * @return パラメータの最小値
         */
        getParameterMinimumValue(parameterIndex) {
          return this._model.parameters.minimumValues[parameterIndex];
        }
        /**
         * パラメータのデフォルト値の取得
         * @param parameterIndex パラメータのインデックス
         * @return パラメータのデフォルト値
         */
        getParameterDefaultValue(parameterIndex) {
          return this._model.parameters.defaultValues[parameterIndex];
        }
        /**
         * 指定したパラメータindexのIDを取得
         *
         * @param parameterIndex パラメータのインデックス
         * @returns パラメータID
         */
        getParameterId(parameterIndex) {
          return live2dcubismframework_1.CubismFramework.getIdManager().getId(this._model.parameters.ids[parameterIndex]);
        }
        /**
         * パラメータの値の取得
         * @param parameterIndex    パラメータのインデックス
         * @return パラメータの値
         */
        getParameterValueByIndex(parameterIndex) {
          if (this._notExistParameterValues.isExist(parameterIndex)) {
            return this._notExistParameterValues.getValue(parameterIndex);
          }
          (0, cubismdebug_1.CSM_ASSERT)(0 <= parameterIndex && parameterIndex < this.getParameterCount());
          return this._parameterValues[parameterIndex];
        }
        /**
         * パラメータの値の取得
         * @param parameterId    パラメータのID
         * @return パラメータの値
         */
        getParameterValueById(parameterId) {
          const parameterIndex = this.getParameterIndex(parameterId);
          return this.getParameterValueByIndex(parameterIndex);
        }
        /**
         * パラメータの値の設定
         * @param parameterIndex パラメータのインデックス
         * @param value パラメータの値
         * @param weight 重み
         */
        setParameterValueByIndex(parameterIndex, value, weight = 1) {
          if (this._notExistParameterValues.isExist(parameterIndex)) {
            this._notExistParameterValues.setValue(parameterIndex, weight == 1 ? value : this._notExistParameterValues.getValue(parameterIndex) * (1 - weight) + value * weight);
            return;
          }
          (0, cubismdebug_1.CSM_ASSERT)(0 <= parameterIndex && parameterIndex < this.getParameterCount());
          if (this.isRepeat(parameterIndex)) {
            value = this.getParameterRepeatValue(parameterIndex, value);
          } else {
            value = this.getParameterClampValue(parameterIndex, value);
          }
          this._parameterValues[parameterIndex] = weight == 1 ? value : this._parameterValues[parameterIndex] = this._parameterValues[parameterIndex] * (1 - weight) + value * weight;
        }
        /**
         * パラメータの値の設定
         * @param parameterId パラメータのID
         * @param value パラメータの値
         * @param weight 重み
         */
        setParameterValueById(parameterId, value, weight = 1) {
          const index = this.getParameterIndex(parameterId);
          this.setParameterValueByIndex(index, value, weight);
        }
        /**
         * パラメータの値の加算(index)
         * @param parameterIndex パラメータインデックス
         * @param value 加算する値
         * @param weight 重み
         */
        addParameterValueByIndex(parameterIndex, value, weight = 1) {
          this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) + value * weight);
        }
        /**
         * パラメータの値の加算(id)
         * @param parameterId パラメータＩＤ
         * @param value 加算する値
         * @param weight 重み
         */
        addParameterValueById(parameterId, value, weight = 1) {
          const index = this.getParameterIndex(parameterId);
          this.addParameterValueByIndex(index, value, weight);
        }
        /**
         * Gets whether the parameter has the repeat setting.
         *
         * @param parameterIndex Parameter index
         *
         * @return true if it is set, otherwise returns false.
         */
        isRepeat(parameterIndex) {
          if (this._notExistParameterValues.isExist(parameterIndex)) {
            return false;
          }
          (0, cubismdebug_1.CSM_ASSERT)(0 <= parameterIndex && parameterIndex < this.getParameterCount());
          let isRepeat;
          if (this._isOverriddenParameterRepeat || this._userParameterRepeatDataList.at(parameterIndex).isOverridden) {
            isRepeat = this._userParameterRepeatDataList.at(parameterIndex).isParameterRepeated;
          } else {
            isRepeat = this._model.parameters.repeats[parameterIndex] != 0;
          }
          return isRepeat;
        }
        /**
         * Returns the calculated result ensuring the value falls within the parameter's range.
         *
         * @param parameterIndex Parameter index
         * @param value Parameter value
         *
         * @return a value that falls within the parameter’s range. If the parameter does not exist, returns it as is.
         */
        getParameterRepeatValue(parameterIndex, value) {
          if (this._notExistParameterValues.isExist(parameterIndex)) {
            return value;
          }
          (0, cubismdebug_1.CSM_ASSERT)(0 <= parameterIndex && parameterIndex < this.getParameterCount());
          const maxValue = this._model.parameters.maximumValues[parameterIndex];
          const minValue = this._model.parameters.minimumValues[parameterIndex];
          const valueSize = maxValue - minValue;
          if (maxValue < value) {
            const overValue = cubismmath_1.CubismMath.mod(value - maxValue, valueSize);
            if (!Number.isNaN(overValue)) {
              value = minValue + overValue;
            } else {
              value = maxValue;
            }
          }
          if (value < minValue) {
            const overValue = cubismmath_1.CubismMath.mod(minValue - value, valueSize);
            if (!Number.isNaN(overValue)) {
              value = maxValue - overValue;
            } else {
              value = minValue;
            }
          }
          return value;
        }
        /**
         * Returns the result of clamping the value to ensure it falls within the parameter's range.
         *
         * @param parameterIndex Parameter index
         * @param value Parameter value
         *
         * @return the clamped value. If the parameter does not exist, returns it as is.
         */
        getParameterClampValue(parameterIndex, value) {
          if (this._notExistParameterValues.isExist(parameterIndex)) {
            return value;
          }
          (0, cubismdebug_1.CSM_ASSERT)(0 <= parameterIndex && parameterIndex < this.getParameterCount());
          const maxValue = this._model.parameters.maximumValues[parameterIndex];
          const minValue = this._model.parameters.minimumValues[parameterIndex];
          return cubismmath_1.CubismMath.clamp(value, minValue, maxValue);
        }
        /**
         * Returns the repeat of the parameter.
         *
         * @param parameterIndex Parameter index
         *
         * @return the raw data parameter repeat from the Cubism Core.
         */
        getParameterRepeats(parameterIndex) {
          return this._model.parameters.repeats[parameterIndex] != 0;
        }
        /**
         * パラメータの値の乗算
         * @param parameterId パラメータのID
         * @param value 乗算する値
         * @param weight 重み
         */
        multiplyParameterValueById(parameterId, value, weight = 1) {
          const index = this.getParameterIndex(parameterId);
          this.multiplyParameterValueByIndex(index, value, weight);
        }
        /**
         * パラメータの値の乗算
         * @param parameterIndex パラメータのインデックス
         * @param value 乗算する値
         * @param weight 重み
         */
        multiplyParameterValueByIndex(parameterIndex, value, weight = 1) {
          this.setParameterValueByIndex(parameterIndex, this.getParameterValueByIndex(parameterIndex) * (1 + (value - 1) * weight));
        }
        /**
         * Drawableのインデックスの取得
         * @param drawableId DrawableのID
         * @return Drawableのインデックス
         */
        getDrawableIndex(drawableId) {
          const drawableCount = this._model.drawables.count;
          for (let drawableIndex = 0; drawableIndex < drawableCount; ++drawableIndex) {
            if (this._drawableIds.at(drawableIndex) == drawableId) {
              return drawableIndex;
            }
          }
          return -1;
        }
        /**
         * Drawableの個数の取得
         * @return drawableの個数
         */
        getDrawableCount() {
          const drawableCount = this._model.drawables.count;
          return drawableCount;
        }
        /**
         * DrawableのIDを取得する
         * @param drawableIndex Drawableのインデックス
         * @return drawableのID
         */
        getDrawableId(drawableIndex) {
          const parameterIds = this._model.drawables.ids;
          return live2dcubismframework_1.CubismFramework.getIdManager().getId(parameterIds[drawableIndex]);
        }
        /**
         * Drawableの描画順リストの取得
         * @return Drawableの描画順リスト
         */
        getDrawableRenderOrders() {
          const renderOrders = this._model.drawables.renderOrders;
          return renderOrders;
        }
        /**
         * @deprecated
         * 関数名が誤っていたため、代替となる getDrawableTextureIndex を追加し、この関数は非推奨となりました。
         *
         * Drawableのテクスチャインデックスリストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのテクスチャインデックスリスト
         */
        getDrawableTextureIndices(drawableIndex) {
          return this.getDrawableTextureIndex(drawableIndex);
        }
        /**
         * Drawableのテクスチャインデックスの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのテクスチャインデックス
         */
        getDrawableTextureIndex(drawableIndex) {
          const textureIndices = this._model.drawables.textureIndices;
          return textureIndices[drawableIndex];
        }
        /**
         * DrawableのVertexPositionsの変化情報の取得
         *
         * 直近のCubismModel.update関数でDrawableの頂点情報が変化したかを取得する。
         *
         * @param   drawableIndex   Drawableのインデックス
         * @retval  true    Drawableの頂点情報が直近のCubismModel.update関数で変化した
         * @retval  false   Drawableの頂点情報が直近のCubismModel.update関数で変化していない
         */
        getDrawableDynamicFlagVertexPositionsDidChange(drawableIndex) {
          const dynamicFlags = this._model.drawables.dynamicFlags;
          return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(dynamicFlags[drawableIndex]);
        }
        /**
         * Drawableの頂点インデックスの個数の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点インデックスの個数
         */
        getDrawableVertexIndexCount(drawableIndex) {
          const indexCounts = this._model.drawables.indexCounts;
          return indexCounts[drawableIndex];
        }
        /**
         * Drawableの頂点の個数の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点の個数
         */
        getDrawableVertexCount(drawableIndex) {
          const vertexCounts = this._model.drawables.vertexCounts;
          return vertexCounts[drawableIndex];
        }
        /**
         * Drawableの頂点リストの取得
         * @param drawableIndex drawableのインデックス
         * @return drawableの頂点リスト
         */
        getDrawableVertices(drawableIndex) {
          return this.getDrawableVertexPositions(drawableIndex);
        }
        /**
         * Drawableの頂点インデックスリストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点インデックスリスト
         */
        getDrawableVertexIndices(drawableIndex) {
          const indicesArray = this._model.drawables.indices;
          return indicesArray[drawableIndex];
        }
        /**
         * Drawableの頂点リストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点リスト
         */
        getDrawableVertexPositions(drawableIndex) {
          const verticesArray = this._model.drawables.vertexPositions;
          return verticesArray[drawableIndex];
        }
        /**
         * Drawableの頂点のUVリストの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの頂点UVリスト
         */
        getDrawableVertexUvs(drawableIndex) {
          const uvsArray = this._model.drawables.vertexUvs;
          return uvsArray[drawableIndex];
        }
        /**
         * Drawableの不透明度の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの不透明度
         */
        getDrawableOpacity(drawableIndex) {
          const opacities = this._model.drawables.opacities;
          return opacities[drawableIndex];
        }
        /**
         * Drawableの乗算色の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの乗算色(RGBA)
         * スクリーン色はRGBAで取得されるが、Aは必ず0
         */
        getDrawableMultiplyColor(drawableIndex) {
          const multiplyColors = this._model.drawables.multiplyColors;
          const index = drawableIndex * 4;
          const multiplyColor = new cubismrenderer_1.CubismTextureColor();
          multiplyColor.r = multiplyColors[index];
          multiplyColor.g = multiplyColors[index + 1];
          multiplyColor.b = multiplyColors[index + 2];
          multiplyColor.a = multiplyColors[index + 3];
          return multiplyColor;
        }
        /**
         * Drawableのスクリーン色の取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのスクリーン色(RGBA)
         * スクリーン色はRGBAで取得されるが、Aは必ず0
         */
        getDrawableScreenColor(drawableIndex) {
          const screenColors = this._model.drawables.screenColors;
          const index = drawableIndex * 4;
          const screenColor = new cubismrenderer_1.CubismTextureColor();
          screenColor.r = screenColors[index];
          screenColor.g = screenColors[index + 1];
          screenColor.b = screenColors[index + 2];
          screenColor.a = screenColors[index + 3];
          return screenColor;
        }
        /**
         * Drawableの親パーツのインデックスの取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableの親パーツのインデックス
         */
        getDrawableParentPartIndex(drawableIndex) {
          return this._model.drawables.parentPartIndices[drawableIndex];
        }
        /**
         * Drawableのブレンドモードを取得
         * @param drawableIndex Drawableのインデックス
         * @return drawableのブレンドモード
         */
        getDrawableBlendMode(drawableIndex) {
          const constantFlags = this._model.drawables.constantFlags;
          return Live2DCubismCore.Utils.hasBlendAdditiveBit(constantFlags[drawableIndex]) ? cubismrenderer_1.CubismBlendMode.CubismBlendMode_Additive : Live2DCubismCore.Utils.hasBlendMultiplicativeBit(constantFlags[drawableIndex]) ? cubismrenderer_1.CubismBlendMode.CubismBlendMode_Multiplicative : cubismrenderer_1.CubismBlendMode.CubismBlendMode_Normal;
        }
        /**
         * Drawableのマスクの反転使用の取得
         *
         * Drawableのマスク使用時の反転設定を取得する。
         * マスクを使用しない場合は無視される。
         *
         * @param drawableIndex Drawableのインデックス
         * @return Drawableの反転設定
         */
        getDrawableInvertedMaskBit(drawableIndex) {
          const constantFlags = this._model.drawables.constantFlags;
          return Live2DCubismCore.Utils.hasIsInvertedMaskBit(constantFlags[drawableIndex]);
        }
        /**
         * Drawableのクリッピングマスクリストの取得
         * @return Drawableのクリッピングマスクリスト
         */
        getDrawableMasks() {
          const masks = this._model.drawables.masks;
          return masks;
        }
        /**
         * Drawableのクリッピングマスクの個数リストの取得
         * @return Drawableのクリッピングマスクの個数リスト
         */
        getDrawableMaskCounts() {
          const maskCounts = this._model.drawables.maskCounts;
          return maskCounts;
        }
        /**
         * クリッピングマスクの使用状態
         *
         * @return true クリッピングマスクを使用している
         * @return false クリッピングマスクを使用していない
         */
        isUsingMasking() {
          for (let d = 0; d < this._model.drawables.count; ++d) {
            if (this._model.drawables.maskCounts[d] <= 0) {
              continue;
            }
            return true;
          }
          return false;
        }
        /**
         * Drawableの表示情報を取得する
         *
         * @param drawableIndex Drawableのインデックス
         * @return true Drawableが表示
         * @return false Drawableが非表示
         */
        getDrawableDynamicFlagIsVisible(drawableIndex) {
          const dynamicFlags = this._model.drawables.dynamicFlags;
          return Live2DCubismCore.Utils.hasIsVisibleBit(dynamicFlags[drawableIndex]);
        }
        /**
         * DrawableのDrawOrderの変化情報の取得
         *
         * 直近のCubismModel.update関数でdrawableのdrawOrderが変化したかを取得する。
         * drawOrderはartMesh上で指定する0から1000の情報
         * @param drawableIndex drawableのインデックス
         * @return true drawableの不透明度が直近のCubismModel.update関数で変化した
         * @return false drawableの不透明度が直近のCubismModel.update関数で変化している
         */
        getDrawableDynamicFlagVisibilityDidChange(drawableIndex) {
          const dynamicFlags = this._model.drawables.dynamicFlags;
          return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(dynamicFlags[drawableIndex]);
        }
        /**
         * Drawableの不透明度の変化情報の取得
         *
         * 直近のCubismModel.update関数でdrawableの不透明度が変化したかを取得する。
         *
         * @param drawableIndex drawableのインデックス
         * @return true Drawableの不透明度が直近のCubismModel.update関数で変化した
         * @return false Drawableの不透明度が直近のCubismModel.update関数で変化してない
         */
        getDrawableDynamicFlagOpacityDidChange(drawableIndex) {
          const dynamicFlags = this._model.drawables.dynamicFlags;
          return Live2DCubismCore.Utils.hasOpacityDidChangeBit(dynamicFlags[drawableIndex]);
        }
        /**
         * Drawableの描画順序の変化情報の取得
         *
         * 直近のCubismModel.update関数でDrawableの描画の順序が変化したかを取得する。
         *
         * @param drawableIndex Drawableのインデックス
         * @return true Drawableの描画の順序が直近のCubismModel.update関数で変化した
         * @return false Drawableの描画の順序が直近のCubismModel.update関数で変化してない
         */
        getDrawableDynamicFlagRenderOrderDidChange(drawableIndex) {
          const dynamicFlags = this._model.drawables.dynamicFlags;
          return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(dynamicFlags[drawableIndex]);
        }
        /**
         * Drawableの乗算色・スクリーン色の変化情報の取得
         *
         * 直近のCubismModel.update関数でDrawableの乗算色・スクリーン色が変化したかを取得する。
         *
         * @param drawableIndex Drawableのインデックス
         * @return true Drawableの乗算色・スクリーン色が直近のCubismModel.update関数で変化した
         * @return false Drawableの乗算色・スクリーン色が直近のCubismModel.update関数で変化してない
         */
        getDrawableDynamicFlagBlendColorDidChange(drawableIndex) {
          const dynamicFlags = this._model.drawables.dynamicFlags;
          return Live2DCubismCore.Utils.hasBlendColorDidChangeBit(dynamicFlags[drawableIndex]);
        }
        /**
         * 保存されたパラメータの読み込み
         */
        loadParameters() {
          let parameterCount = this._model.parameters.count;
          const savedParameterCount = this._savedParameters.getSize();
          if (parameterCount > savedParameterCount) {
            parameterCount = savedParameterCount;
          }
          for (let i = 0; i < parameterCount; ++i) {
            this._parameterValues[i] = this._savedParameters.at(i);
          }
        }
        /**
         * 初期化する
         */
        initialize() {
          (0, cubismdebug_1.CSM_ASSERT)(this._model);
          this._parameterValues = this._model.parameters.values;
          this._partOpacities = this._model.parts.opacities;
          this._parameterMaximumValues = this._model.parameters.maximumValues;
          this._parameterMinimumValues = this._model.parameters.minimumValues;
          {
            const parameterIds = this._model.parameters.ids;
            const parameterCount = this._model.parameters.count;
            this._parameterIds.prepareCapacity(parameterCount);
            this._userParameterRepeatDataList.prepareCapacity(parameterCount);
            for (let i = 0; i < parameterCount; ++i) {
              this._parameterIds.pushBack(live2dcubismframework_1.CubismFramework.getIdManager().getId(parameterIds[i]));
              this._userParameterRepeatDataList.pushBack(new ParameterRepeatData(false, false));
            }
          }
          const partCount = this._model.parts.count;
          {
            const partIds = this._model.parts.ids;
            this._partIds.prepareCapacity(partCount);
            for (let i = 0; i < partCount; ++i) {
              this._partIds.pushBack(live2dcubismframework_1.CubismFramework.getIdManager().getId(partIds[i]));
            }
            this._userPartMultiplyColors.prepareCapacity(partCount);
            this._userPartScreenColors.prepareCapacity(partCount);
            this._partChildDrawables.prepareCapacity(partCount);
          }
          {
            const drawableIds = this._model.drawables.ids;
            const drawableCount = this._model.drawables.count;
            this._userMultiplyColors.prepareCapacity(drawableCount);
            this._userScreenColors.prepareCapacity(drawableCount);
            this._userCullings.prepareCapacity(drawableCount);
            const userCulling = new DrawableCullingData(false, false);
            {
              for (let i = 0; i < partCount; ++i) {
                const multiplyColor = new cubismrenderer_1.CubismTextureColor(1, 1, 1, 1);
                const screenColor = new cubismrenderer_1.CubismTextureColor(0, 0, 0, 1);
                const userMultiplyColor = new PartColorData(false, multiplyColor);
                const userScreenColor = new PartColorData(false, screenColor);
                this._userPartMultiplyColors.pushBack(userMultiplyColor);
                this._userPartScreenColors.pushBack(userScreenColor);
                this._partChildDrawables.pushBack(new csmvector_1.csmVector());
                this._partChildDrawables.at(i).prepareCapacity(drawableCount);
              }
            }
            {
              for (let i = 0; i < drawableCount; ++i) {
                const multiplyColor = new cubismrenderer_1.CubismTextureColor(1, 1, 1, 1);
                const screenColor = new cubismrenderer_1.CubismTextureColor(0, 0, 0, 1);
                const userMultiplyColor = new DrawableColorData(false, multiplyColor);
                const userScreenColor = new DrawableColorData(false, screenColor);
                this._drawableIds.pushBack(live2dcubismframework_1.CubismFramework.getIdManager().getId(drawableIds[i]));
                this._userMultiplyColors.pushBack(userMultiplyColor);
                this._userScreenColors.pushBack(userScreenColor);
                this._userCullings.pushBack(userCulling);
                const parentIndex = this.getDrawableParentPartIndex(i);
                if (parentIndex >= 0) {
                  this._partChildDrawables.at(parentIndex).pushBack(i);
                }
              }
            }
          }
        }
        /**
         * コンストラクタ
         * @param model モデル
         */
        constructor(model) {
          this._model = model;
          this._parameterValues = null;
          this._parameterMaximumValues = null;
          this._parameterMinimumValues = null;
          this._partOpacities = null;
          this._savedParameters = new csmvector_1.csmVector();
          this._parameterIds = new csmvector_1.csmVector();
          this._drawableIds = new csmvector_1.csmVector();
          this._partIds = new csmvector_1.csmVector();
          this._isOverriddenParameterRepeat = true;
          this._isOverriddenModelMultiplyColors = false;
          this._isOverriddenModelScreenColors = false;
          this._isOverriddenCullings = false;
          this._modelOpacity = 1;
          this._userParameterRepeatDataList = new csmvector_1.csmVector();
          this._userMultiplyColors = new csmvector_1.csmVector();
          this._userScreenColors = new csmvector_1.csmVector();
          this._userCullings = new csmvector_1.csmVector();
          this._userPartMultiplyColors = new csmvector_1.csmVector();
          this._userPartScreenColors = new csmvector_1.csmVector();
          this._partChildDrawables = new csmvector_1.csmVector();
          this._notExistPartId = new csmmap_1.csmMap();
          this._notExistParameterId = new csmmap_1.csmMap();
          this._notExistParameterValues = new csmmap_1.csmMap();
          this._notExistPartOpacities = new csmmap_1.csmMap();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          this._model.release();
          this._model = null;
        }
      };
      exports.CubismModel = CubismModel;
      var $ = __importStar(require_cubismmodel());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismModel = $.CubismModel;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/model/cubismmoc.js
  var require_cubismmoc = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/model/cubismmoc.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismMoc = void 0;
      var cubismdebug_1 = require_cubismdebug();
      var cubismmodel_1 = require_cubismmodel();
      var CubismMoc = class _CubismMoc {
        /**
         * Mocデータの作成
         */
        static create(mocBytes, shouldCheckMocConsistency) {
          let cubismMoc = null;
          if (shouldCheckMocConsistency) {
            const consistency = this.hasMocConsistency(mocBytes);
            if (!consistency) {
              (0, cubismdebug_1.CubismLogError)(`Inconsistent MOC3.`);
              return cubismMoc;
            }
          }
          const moc = Live2DCubismCore.Moc.fromArrayBuffer(mocBytes);
          if (moc) {
            cubismMoc = new _CubismMoc(moc);
            cubismMoc._mocVersion = Live2DCubismCore.Version.csmGetMocVersion(moc, mocBytes);
          }
          return cubismMoc;
        }
        /**
         * Mocデータを削除
         *
         * Mocデータを削除する
         */
        static delete(moc) {
          moc._moc._release();
          moc._moc = null;
          moc = null;
        }
        /**
         * モデルを作成する
         *
         * @return Mocデータから作成されたモデル
         */
        createModel() {
          let cubismModel = null;
          const model = Live2DCubismCore.Model.fromMoc(this._moc);
          if (model) {
            cubismModel = new cubismmodel_1.CubismModel(model);
            cubismModel.initialize();
            ++this._modelCount;
          }
          return cubismModel;
        }
        /**
         * モデルを削除する
         */
        deleteModel(model) {
          if (model != null) {
            model.release();
            model = null;
            --this._modelCount;
          }
        }
        /**
         * コンストラクタ
         */
        constructor(moc) {
          this._moc = moc;
          this._modelCount = 0;
          this._mocVersion = 0;
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          (0, cubismdebug_1.CSM_ASSERT)(this._modelCount == 0);
          this._moc._release();
          this._moc = null;
        }
        /**
         * 最新の.moc3 Versionを取得
         */
        getLatestMocVersion() {
          return Live2DCubismCore.Version.csmGetLatestMocVersion();
        }
        /**
         * 読み込んだモデルの.moc3 Versionを取得
         */
        getMocVersion() {
          return this._mocVersion;
        }
        /**
         * .moc3 の整合性を検証する
         */
        static hasMocConsistency(mocBytes) {
          const isConsistent = Live2DCubismCore.Moc.prototype.hasMocConsistency(mocBytes);
          return isConsistent === 1 ? true : false;
        }
      };
      exports.CubismMoc = CubismMoc;
      var $ = __importStar(require_cubismmoc());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismMoc = $.CubismMoc;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/effect/cubismpose.js
  var require_cubismpose = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/effect/cubismpose.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.PartData = exports.CubismPose = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var csmvector_1 = require_csmvector();
      var cubismjson_1 = require_cubismjson();
      var Epsilon = 1e-3;
      var DefaultFadeInSeconds = 0.5;
      var FadeIn = "FadeInTime";
      var Link = "Link";
      var Groups = "Groups";
      var Id = "Id";
      var CubismPose = class _CubismPose {
        /**
         * インスタンスの作成
         * @param pose3json pose3.jsonのデータ
         * @param size pose3.jsonのデータのサイズ[byte]
         * @return 作成されたインスタンス
         */
        static create(pose3json, size) {
          const json = cubismjson_1.CubismJson.create(pose3json, size);
          if (!json) {
            return null;
          }
          const ret = new _CubismPose();
          const root = json.getRoot();
          if (!root.getValueByString(FadeIn).isNull()) {
            ret._fadeTimeSeconds = root.getValueByString(FadeIn).toFloat(DefaultFadeInSeconds);
            if (ret._fadeTimeSeconds < 0) {
              ret._fadeTimeSeconds = DefaultFadeInSeconds;
            }
          }
          const poseListInfo = root.getValueByString(Groups);
          const poseCount = poseListInfo.getSize();
          for (let poseIndex = 0; poseIndex < poseCount; ++poseIndex) {
            const idListInfo = poseListInfo.getValueByIndex(poseIndex);
            const idCount = idListInfo.getSize();
            let groupCount = 0;
            for (let groupIndex = 0; groupIndex < idCount; ++groupIndex) {
              const partInfo = idListInfo.getValueByIndex(groupIndex);
              const partData = new PartData();
              const parameterId = live2dcubismframework_1.CubismFramework.getIdManager().getId(partInfo.getValueByString(Id).getRawString());
              partData.partId = parameterId;
              if (!partInfo.getValueByString(Link).isNull()) {
                const linkListInfo = partInfo.getValueByString(Link);
                const linkCount = linkListInfo.getSize();
                for (let linkIndex = 0; linkIndex < linkCount; ++linkIndex) {
                  const linkPart = new PartData();
                  const linkId = live2dcubismframework_1.CubismFramework.getIdManager().getId(linkListInfo.getValueByIndex(linkIndex).getString());
                  linkPart.partId = linkId;
                  partData.link.pushBack(linkPart);
                }
              }
              ret._partGroups.pushBack(partData.clone());
              ++groupCount;
            }
            ret._partGroupCounts.pushBack(groupCount);
          }
          cubismjson_1.CubismJson.delete(json);
          return ret;
        }
        /**
         * インスタンスを破棄する
         * @param pose 対象のCubismPose
         */
        static delete(pose) {
          if (pose != null) {
            pose = null;
          }
        }
        /**
         * モデルのパラメータの更新
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        updateParameters(model, deltaTimeSeconds) {
          if (model != this._lastModel) {
            this.reset(model);
          }
          this._lastModel = model;
          if (deltaTimeSeconds < 0) {
            deltaTimeSeconds = 0;
          }
          let beginIndex = 0;
          for (let i = 0; i < this._partGroupCounts.getSize(); i++) {
            const partGroupCount = this._partGroupCounts.at(i);
            this.doFade(model, deltaTimeSeconds, beginIndex, partGroupCount);
            beginIndex += partGroupCount;
          }
          this.copyPartOpacities(model);
        }
        /**
         * 表示を初期化
         * @param model 対象のモデル
         * @note 不透明度の初期値が0でないパラメータは、不透明度を１に設定する
         */
        reset(model) {
          let beginIndex = 0;
          for (let i = 0; i < this._partGroupCounts.getSize(); ++i) {
            const groupCount = this._partGroupCounts.at(i);
            for (let j = beginIndex; j < beginIndex + groupCount; ++j) {
              this._partGroups.at(j).initialize(model);
              const partsIndex = this._partGroups.at(j).partIndex;
              const paramIndex = this._partGroups.at(j).parameterIndex;
              if (partsIndex < 0) {
                continue;
              }
              model.setPartOpacityByIndex(partsIndex, j == beginIndex ? 1 : 0);
              model.setParameterValueByIndex(paramIndex, j == beginIndex ? 1 : 0);
              for (let k = 0; k < this._partGroups.at(j).link.getSize(); ++k) {
                this._partGroups.at(j).link.at(k).initialize(model);
              }
            }
            beginIndex += groupCount;
          }
        }
        /**
         * パーツの不透明度をコピー
         *
         * @param model 対象のモデル
         */
        copyPartOpacities(model) {
          for (let groupIndex = 0; groupIndex < this._partGroups.getSize(); ++groupIndex) {
            const partData = this._partGroups.at(groupIndex);
            if (partData.link.getSize() == 0) {
              continue;
            }
            const partIndex = this._partGroups.at(groupIndex).partIndex;
            const opacity = model.getPartOpacityByIndex(partIndex);
            for (let linkIndex = 0; linkIndex < partData.link.getSize(); ++linkIndex) {
              const linkPart = partData.link.at(linkIndex);
              const linkPartIndex = linkPart.partIndex;
              if (linkPartIndex < 0) {
                continue;
              }
              model.setPartOpacityByIndex(linkPartIndex, opacity);
            }
          }
        }
        /**
         * パーツのフェード操作を行う。
         * @param model 対象のモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         * @param beginIndex フェード操作を行うパーツグループの先頭インデックス
         * @param partGroupCount フェード操作を行うパーツグループの個数
         */
        doFade(model, deltaTimeSeconds, beginIndex, partGroupCount) {
          let visiblePartIndex = -1;
          let newOpacity = 1;
          const phi = 0.5;
          const backOpacityThreshold = 0.15;
          for (let i = beginIndex; i < beginIndex + partGroupCount; ++i) {
            const partIndex = this._partGroups.at(i).partIndex;
            const paramIndex = this._partGroups.at(i).parameterIndex;
            if (model.getParameterValueByIndex(paramIndex) > Epsilon) {
              if (visiblePartIndex >= 0) {
                break;
              }
              visiblePartIndex = i;
              if (this._fadeTimeSeconds == 0) {
                newOpacity = 1;
                continue;
              }
              newOpacity = model.getPartOpacityByIndex(partIndex);
              newOpacity += deltaTimeSeconds / this._fadeTimeSeconds;
              if (newOpacity > 1) {
                newOpacity = 1;
              }
            }
          }
          if (visiblePartIndex < 0) {
            visiblePartIndex = 0;
            newOpacity = 1;
          }
          for (let i = beginIndex; i < beginIndex + partGroupCount; ++i) {
            const partsIndex = this._partGroups.at(i).partIndex;
            if (visiblePartIndex == i) {
              model.setPartOpacityByIndex(partsIndex, newOpacity);
            } else {
              let opacity = model.getPartOpacityByIndex(partsIndex);
              let a1;
              if (newOpacity < phi) {
                a1 = newOpacity * (phi - 1) / phi + 1;
              } else {
                a1 = (1 - newOpacity) * phi / (1 - phi);
              }
              const backOpacity = (1 - a1) * (1 - newOpacity);
              if (backOpacity > backOpacityThreshold) {
                a1 = 1 - backOpacityThreshold / (1 - newOpacity);
              }
              if (opacity > a1) {
                opacity = a1;
              }
              model.setPartOpacityByIndex(partsIndex, opacity);
            }
          }
        }
        /**
         * コンストラクタ
         */
        constructor() {
          this._fadeTimeSeconds = DefaultFadeInSeconds;
          this._lastModel = null;
          this._partGroups = new csmvector_1.csmVector();
          this._partGroupCounts = new csmvector_1.csmVector();
        }
      };
      exports.CubismPose = CubismPose;
      var PartData = class _PartData {
        /**
         * コンストラクタ
         */
        constructor(v) {
          this.parameterIndex = 0;
          this.partIndex = 0;
          this.link = new csmvector_1.csmVector();
          if (v != void 0) {
            this.partId = v.partId;
            for (const ite = v.link.begin(); ite.notEqual(v.link.end()); ite.preIncrement()) {
              this.link.pushBack(ite.ptr().clone());
            }
          }
        }
        /**
         * =演算子のオーバーロード
         */
        assignment(v) {
          this.partId = v.partId;
          for (const ite = v.link.begin(); ite.notEqual(v.link.end()); ite.preIncrement()) {
            this.link.pushBack(ite.ptr().clone());
          }
          return this;
        }
        /**
         * 初期化
         * @param model 初期化に使用するモデル
         */
        initialize(model) {
          this.parameterIndex = model.getParameterIndex(this.partId);
          this.partIndex = model.getPartIndex(this.partId);
          model.setParameterValueByIndex(this.parameterIndex, 1);
        }
        /**
         * オブジェクトのコピーを生成する
         */
        clone() {
          const clonePartData = new _PartData();
          clonePartData.partId = this.partId;
          clonePartData.parameterIndex = this.parameterIndex;
          clonePartData.partIndex = this.partIndex;
          clonePartData.link = new csmvector_1.csmVector();
          for (let ite = this.link.begin(); ite.notEqual(this.link.end()); ite.increment()) {
            clonePartData.link.pushBack(ite.ptr().clone());
          }
          return clonePartData;
        }
      };
      exports.PartData = PartData;
      var $ = __importStar(require_cubismpose());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismPose = $.CubismPose;
        Live2DCubismFramework2.PartData = $.PartData;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/math/cubismmodelmatrix.js
  var require_cubismmodelmatrix = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/math/cubismmodelmatrix.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismModelMatrix = void 0;
      var cubismmatrix44_1 = require_cubismmatrix44();
      var CubismModelMatrix = class extends cubismmatrix44_1.CubismMatrix44 {
        /**
         * コンストラクタ
         *
         * @param w 横幅
         * @param h 縦幅
         */
        constructor(w, h) {
          super();
          this._width = w !== void 0 ? w : 0;
          this._height = h !== void 0 ? h : 0;
          this.setHeight(2);
        }
        /**
         * 横幅を設定
         *
         * @param w 横幅
         */
        setWidth(w) {
          const scaleX = w / this._width;
          const scaleY = scaleX;
          this.scale(scaleX, scaleY);
        }
        /**
         * 縦幅を設定
         * @param h 縦幅
         */
        setHeight(h) {
          const scaleX = h / this._height;
          const scaleY = scaleX;
          this.scale(scaleX, scaleY);
        }
        /**
         * 位置を設定
         *
         * @param x X軸の位置
         * @param y Y軸の位置
         */
        setPosition(x, y) {
          this.translate(x, y);
        }
        /**
         * 中心位置を設定
         *
         * @param x X軸の中心位置
         * @param y Y軸の中心位置
         *
         * @note widthかheightを設定したあとでないと、拡大率が正しく取得できないためずれる。
         */
        setCenterPosition(x, y) {
          this.centerX(x);
          this.centerY(y);
        }
        /**
         * 上辺の位置を設定する
         *
         * @param y 上辺のY軸位置
         */
        top(y) {
          this.setY(y);
        }
        /**
         * 下辺の位置を設定する
         *
         * @param y 下辺のY軸位置
         */
        bottom(y) {
          const h = this._height * this.getScaleY();
          this.translateY(y - h);
        }
        /**
         * 左辺の位置を設定
         *
         * @param x 左辺のX軸位置
         */
        left(x) {
          this.setX(x);
        }
        /**
         * 右辺の位置を設定
         *
         * @param x 右辺のX軸位置
         */
        right(x) {
          const w = this._width * this.getScaleX();
          this.translateX(x - w);
        }
        /**
         * X軸の中心位置を設定
         *
         * @param x X軸の中心位置
         */
        centerX(x) {
          const w = this._width * this.getScaleX();
          this.translateX(x - w / 2);
        }
        /**
         * X軸の位置を設定
         *
         * @param x X軸の位置
         */
        setX(x) {
          this.translateX(x);
        }
        /**
         * Y軸の中心位置を設定
         *
         * @param y Y軸の中心位置
         */
        centerY(y) {
          const h = this._height * this.getScaleY();
          this.translateY(y - h / 2);
        }
        /**
         * Y軸の位置を設定する
         *
         * @param y Y軸の位置
         */
        setY(y) {
          this.translateY(y);
        }
        /**
         * レイアウト情報から位置を設定
         *
         * @param layout レイアウト情報
         */
        setupFromLayout(layout) {
          const keyWidth = "width";
          const keyHeight = "height";
          const keyX = "x";
          const keyY = "y";
          const keyCenterX = "center_x";
          const keyCenterY = "center_y";
          const keyTop = "top";
          const keyBottom = "bottom";
          const keyLeft = "left";
          const keyRight = "right";
          for (const ite = layout.begin(); ite.notEqual(layout.end()); ite.preIncrement()) {
            const key = ite.ptr().first;
            const value = ite.ptr().second;
            if (key == keyWidth) {
              this.setWidth(value);
            } else if (key == keyHeight) {
              this.setHeight(value);
            }
          }
          for (const ite = layout.begin(); ite.notEqual(layout.end()); ite.preIncrement()) {
            const key = ite.ptr().first;
            const value = ite.ptr().second;
            if (key == keyX) {
              this.setX(value);
            } else if (key == keyY) {
              this.setY(value);
            } else if (key == keyCenterX) {
              this.centerX(value);
            } else if (key == keyCenterY) {
              this.centerY(value);
            } else if (key == keyTop) {
              this.top(value);
            } else if (key == keyBottom) {
              this.bottom(value);
            } else if (key == keyLeft) {
              this.left(value);
            } else if (key == keyRight) {
              this.right(value);
            }
          }
        }
      };
      exports.CubismModelMatrix = CubismModelMatrix;
      var $ = __importStar(require_cubismmodelmatrix());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismModelMatrix = $.CubismModelMatrix;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/math/cubismtargetpoint.js
  var require_cubismtargetpoint = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/math/cubismtargetpoint.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismTargetPoint = void 0;
      var cubismmath_1 = require_cubismmath();
      var FrameRate = 30;
      var Epsilon = 0.01;
      var CubismTargetPoint = class {
        /**
         * コンストラクタ
         */
        constructor() {
          this._faceTargetX = 0;
          this._faceTargetY = 0;
          this._faceX = 0;
          this._faceY = 0;
          this._faceVX = 0;
          this._faceVY = 0;
          this._lastTimeSeconds = 0;
          this._userTimeSeconds = 0;
        }
        /**
         * 更新処理
         */
        update(deltaTimeSeconds) {
          this._userTimeSeconds += deltaTimeSeconds;
          const faceParamMaxV = 40 / 10;
          const maxV = faceParamMaxV * 1 / FrameRate;
          if (this._lastTimeSeconds == 0) {
            this._lastTimeSeconds = this._userTimeSeconds;
            return;
          }
          const deltaTimeWeight = (this._userTimeSeconds - this._lastTimeSeconds) * FrameRate;
          this._lastTimeSeconds = this._userTimeSeconds;
          const timeToMaxSpeed = 0.15;
          const frameToMaxSpeed = timeToMaxSpeed * FrameRate;
          const maxA = deltaTimeWeight * maxV / frameToMaxSpeed;
          const dx = this._faceTargetX - this._faceX;
          const dy = this._faceTargetY - this._faceY;
          if (cubismmath_1.CubismMath.abs(dx) <= Epsilon && cubismmath_1.CubismMath.abs(dy) <= Epsilon) {
            return;
          }
          const d = cubismmath_1.CubismMath.sqrt(dx * dx + dy * dy);
          const vx = maxV * dx / d;
          const vy = maxV * dy / d;
          let ax = vx - this._faceVX;
          let ay = vy - this._faceVY;
          const a = cubismmath_1.CubismMath.sqrt(ax * ax + ay * ay);
          if (a < -maxA || a > maxA) {
            ax *= maxA / a;
            ay *= maxA / a;
          }
          this._faceVX += ax;
          this._faceVY += ay;
          {
            const maxV2 = 0.5 * (cubismmath_1.CubismMath.sqrt(maxA * maxA + 16 * maxA * d - 8 * maxA * d) - maxA);
            const curV = cubismmath_1.CubismMath.sqrt(this._faceVX * this._faceVX + this._faceVY * this._faceVY);
            if (curV > maxV2) {
              this._faceVX *= maxV2 / curV;
              this._faceVY *= maxV2 / curV;
            }
          }
          this._faceX += this._faceVX;
          this._faceY += this._faceVY;
        }
        /**
         * X軸の顔の向きの値を取得
         *
         * @return X軸の顔の向きの値（-1.0 ~ 1.0）
         */
        getX() {
          return this._faceX;
        }
        /**
         * Y軸の顔の向きの値を取得
         *
         * @return Y軸の顔の向きの値（-1.0 ~ 1.0）
         */
        getY() {
          return this._faceY;
        }
        /**
         * 顔の向きの目標値を設定
         *
         * @param x X軸の顔の向きの値（-1.0 ~ 1.0）
         * @param y Y軸の顔の向きの値（-1.0 ~ 1.0）
         */
        set(x, y) {
          this._faceTargetX = x;
          this._faceTargetY = y;
        }
      };
      exports.CubismTargetPoint = CubismTargetPoint;
      var $ = __importStar(require_cubismtargetpoint());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismTargetPoint = $.CubismTargetPoint;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/motion/cubismexpressionmotion.js
  var require_cubismexpressionmotion = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/motion/cubismexpressionmotion.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.ExpressionParameter = exports.ExpressionBlendType = exports.CubismExpressionMotion = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var csmvector_1 = require_csmvector();
      var cubismjson_1 = require_cubismjson();
      var acubismmotion_1 = require_acubismmotion();
      var ExpressionKeyFadeIn = "FadeInTime";
      var ExpressionKeyFadeOut = "FadeOutTime";
      var ExpressionKeyParameters = "Parameters";
      var ExpressionKeyId = "Id";
      var ExpressionKeyValue = "Value";
      var ExpressionKeyBlend = "Blend";
      var BlendValueAdd = "Add";
      var BlendValueMultiply = "Multiply";
      var BlendValueOverwrite = "Overwrite";
      var DefaultFadeTime = 1;
      var CubismExpressionMotion = class _CubismExpressionMotion extends acubismmotion_1.ACubismMotion {
        /**
         * インスタンスを作成する。
         * @param buffer expファイルが読み込まれているバッファ
         * @param size バッファのサイズ
         * @return 作成されたインスタンス
         */
        static create(buffer, size) {
          const expression = new _CubismExpressionMotion();
          expression.parse(buffer, size);
          return expression;
        }
        /**
         * モデルのパラメータの更新の実行
         * @param model 対象のモデル
         * @param userTimeSeconds デルタ時間の積算値[秒]
         * @param weight モーションの重み
         * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
         */
        doUpdateParameters(model, userTimeSeconds, weight, motionQueueEntry) {
          for (let i = 0; i < this._parameters.getSize(); ++i) {
            const parameter = this._parameters.at(i);
            switch (parameter.blendType) {
              case ExpressionBlendType.Additive: {
                model.addParameterValueById(parameter.parameterId, parameter.value, weight);
                break;
              }
              case ExpressionBlendType.Multiply: {
                model.multiplyParameterValueById(parameter.parameterId, parameter.value, weight);
                break;
              }
              case ExpressionBlendType.Overwrite: {
                model.setParameterValueById(parameter.parameterId, parameter.value, weight);
                break;
              }
              default:
                break;
            }
          }
        }
        /**
         * @brief 表情によるモデルのパラメータの計算
         *
         * モデルの表情に関するパラメータを計算する。
         *
         * @param[in]   model                        対象のモデル
         * @param[in]   userTimeSeconds              デルタ時間の積算値[秒]
         * @param[in]   motionQueueEntry             CubismMotionQueueManagerで管理されているモーション
         * @param[in]   expressionParameterValues    モデルに適用する各パラメータの値
         * @param[in]   expressionIndex              表情のインデックス
         * @param[in]   fadeWeight                   表情のウェイト
         */
        calculateExpressionParameters(model, userTimeSeconds, motionQueueEntry, expressionParameterValues, expressionIndex, fadeWeight) {
          if (motionQueueEntry == null || expressionParameterValues == null) {
            return;
          }
          if (!motionQueueEntry.isAvailable()) {
            return;
          }
          this._fadeWeight = this.updateFadeWeight(motionQueueEntry, userTimeSeconds);
          for (let i = 0; i < expressionParameterValues.getSize(); ++i) {
            const expressionParameterValue = expressionParameterValues.at(i);
            if (expressionParameterValue.parameterId == null) {
              continue;
            }
            const currentParameterValue = expressionParameterValue.overwriteValue = model.getParameterValueById(expressionParameterValue.parameterId);
            const expressionParameters = this.getExpressionParameters();
            let parameterIndex = -1;
            for (let j = 0; j < expressionParameters.getSize(); ++j) {
              if (expressionParameterValue.parameterId != expressionParameters.at(j).parameterId) {
                continue;
              }
              parameterIndex = j;
              break;
            }
            if (parameterIndex < 0) {
              if (expressionIndex == 0) {
                expressionParameterValue.additiveValue = _CubismExpressionMotion.DefaultAdditiveValue;
                expressionParameterValue.multiplyValue = _CubismExpressionMotion.DefaultMultiplyValue;
                expressionParameterValue.overwriteValue = currentParameterValue;
              } else {
                expressionParameterValue.additiveValue = this.calculateValue(expressionParameterValue.additiveValue, _CubismExpressionMotion.DefaultAdditiveValue, fadeWeight);
                expressionParameterValue.multiplyValue = this.calculateValue(expressionParameterValue.multiplyValue, _CubismExpressionMotion.DefaultMultiplyValue, fadeWeight);
                expressionParameterValue.overwriteValue = this.calculateValue(expressionParameterValue.overwriteValue, currentParameterValue, fadeWeight);
              }
              continue;
            }
            const value = expressionParameters.at(parameterIndex).value;
            let newAdditiveValue, newMultiplyValue, newOverwriteValue;
            switch (expressionParameters.at(parameterIndex).blendType) {
              case ExpressionBlendType.Additive:
                newAdditiveValue = value;
                newMultiplyValue = _CubismExpressionMotion.DefaultMultiplyValue;
                newOverwriteValue = currentParameterValue;
                break;
              case ExpressionBlendType.Multiply:
                newAdditiveValue = _CubismExpressionMotion.DefaultAdditiveValue;
                newMultiplyValue = value;
                newOverwriteValue = currentParameterValue;
                break;
              case ExpressionBlendType.Overwrite:
                newAdditiveValue = _CubismExpressionMotion.DefaultAdditiveValue;
                newMultiplyValue = _CubismExpressionMotion.DefaultMultiplyValue;
                newOverwriteValue = value;
                break;
              default:
                return;
            }
            if (expressionIndex == 0) {
              expressionParameterValue.additiveValue = newAdditiveValue;
              expressionParameterValue.multiplyValue = newMultiplyValue;
              expressionParameterValue.overwriteValue = newOverwriteValue;
            } else {
              expressionParameterValue.additiveValue = expressionParameterValue.additiveValue * (1 - fadeWeight) + newAdditiveValue * fadeWeight;
              expressionParameterValue.multiplyValue = expressionParameterValue.multiplyValue * (1 - fadeWeight) + newMultiplyValue * fadeWeight;
              expressionParameterValue.overwriteValue = expressionParameterValue.overwriteValue * (1 - fadeWeight) + newOverwriteValue * fadeWeight;
            }
          }
        }
        /**
         * @brief 表情が参照しているパラメータを取得
         *
         * 表情が参照しているパラメータを取得する
         *
         * @return 表情パラメータ
         */
        getExpressionParameters() {
          return this._parameters;
        }
        /**
         * @brief 表情のフェードの値を取得
         *
         * 現在の表情のフェードのウェイト値を取得する
         *
         * @returns 表情のフェードのウェイト値
         *
         * @deprecated CubismExpressionMotion.fadeWeightが削除予定のため非推奨。
         * CubismExpressionMotionManager.getFadeWeight(index: number): number を使用してください。
         * @see CubismExpressionMotionManager#getFadeWeight(index: number)
         */
        getFadeWeight() {
          return this._fadeWeight;
        }
        parse(buffer, size) {
          const json = cubismjson_1.CubismJson.create(buffer, size);
          if (!json) {
            return;
          }
          const root = json.getRoot();
          this.setFadeInTime(root.getValueByString(ExpressionKeyFadeIn).toFloat(DefaultFadeTime));
          this.setFadeOutTime(root.getValueByString(ExpressionKeyFadeOut).toFloat(DefaultFadeTime));
          const parameterCount = root.getValueByString(ExpressionKeyParameters).getSize();
          this._parameters.prepareCapacity(parameterCount);
          for (let i = 0; i < parameterCount; ++i) {
            const param = root.getValueByString(ExpressionKeyParameters).getValueByIndex(i);
            const parameterId = live2dcubismframework_1.CubismFramework.getIdManager().getId(param.getValueByString(ExpressionKeyId).getRawString());
            const value = param.getValueByString(ExpressionKeyValue).toFloat();
            let blendType;
            if (param.getValueByString(ExpressionKeyBlend).isNull() || param.getValueByString(ExpressionKeyBlend).getString() == BlendValueAdd) {
              blendType = ExpressionBlendType.Additive;
            } else if (param.getValueByString(ExpressionKeyBlend).getString() == BlendValueMultiply) {
              blendType = ExpressionBlendType.Multiply;
            } else if (param.getValueByString(ExpressionKeyBlend).getString() == BlendValueOverwrite) {
              blendType = ExpressionBlendType.Overwrite;
            } else {
              blendType = ExpressionBlendType.Additive;
            }
            const item = new ExpressionParameter();
            item.parameterId = parameterId;
            item.blendType = blendType;
            item.value = value;
            this._parameters.pushBack(item);
          }
          cubismjson_1.CubismJson.delete(json);
        }
        /**
         * @brief ブレンド計算
         *
         * 入力された値でブレンド計算をする。
         *
         * @param source 現在の値
         * @param destination 適用する値
         * @param weight ウェイト
         * @returns 計算結果
         */
        calculateValue(source, destination, fadeWeight) {
          return source * (1 - fadeWeight) + destination * fadeWeight;
        }
        /**
         * コンストラクタ
         */
        constructor() {
          super();
          this._parameters = new csmvector_1.csmVector();
          this._fadeWeight = 0;
        }
      };
      exports.CubismExpressionMotion = CubismExpressionMotion;
      CubismExpressionMotion.DefaultAdditiveValue = 0;
      CubismExpressionMotion.DefaultMultiplyValue = 1;
      var ExpressionBlendType;
      (function(ExpressionBlendType2) {
        ExpressionBlendType2[ExpressionBlendType2["Additive"] = 0] = "Additive";
        ExpressionBlendType2[ExpressionBlendType2["Multiply"] = 1] = "Multiply";
        ExpressionBlendType2[ExpressionBlendType2["Overwrite"] = 2] = "Overwrite";
      })(ExpressionBlendType || (exports.ExpressionBlendType = ExpressionBlendType = {}));
      var ExpressionParameter = class {
      };
      exports.ExpressionParameter = ExpressionParameter;
      var $ = __importStar(require_cubismexpressionmotion());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismExpressionMotion = $.CubismExpressionMotion;
        Live2DCubismFramework2.ExpressionBlendType = $.ExpressionBlendType;
        Live2DCubismFramework2.ExpressionParameter = $.ExpressionParameter;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/motion/cubismexpressionmotionmanager.js
  var require_cubismexpressionmotionmanager = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/motion/cubismexpressionmotionmanager.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismExpressionMotionManager = exports.ExpressionParameterValue = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var csmvector_1 = require_csmvector();
      var cubismexpressionmotion_1 = require_cubismexpressionmotion();
      var cubismmotionqueuemanager_1 = require_cubismmotionqueuemanager();
      var cubismdebug_1 = require_cubismdebug();
      var ExpressionParameterValue = class {
      };
      exports.ExpressionParameterValue = ExpressionParameterValue;
      var CubismExpressionMotionManager = class extends cubismmotionqueuemanager_1.CubismMotionQueueManager {
        /**
         * コンストラクタ
         */
        constructor() {
          super();
          this._currentPriority = 0;
          this._reservePriority = 0;
          this._expressionParameterValues = new csmvector_1.csmVector();
          this._fadeWeights = new csmvector_1.csmVector();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          if (this._expressionParameterValues) {
            (0, live2dcubismframework_1.csmDelete)(this._expressionParameterValues);
            this._expressionParameterValues = null;
          }
          if (this._fadeWeights) {
            (0, live2dcubismframework_1.csmDelete)(this._fadeWeights);
            this._fadeWeights = null;
          }
        }
        /**
         * @deprecated
         * ExpressionではPriorityを使用していないため、この関数は非推奨となりました。
         *
         * @brief 再生中のモーションの優先度の取得
         *
         * 再生中のモーションの優先度を取得する。
         *
         * @returns モーションの優先度
         */
        getCurrentPriority() {
          (0, cubismdebug_1.CubismLogInfo)("CubismExpressionMotionManager.getCurrentPriority() is deprecated because a priority value is not actually used during expression motion playback.");
          return this._currentPriority;
        }
        /**
         * @deprecated
         * ExpressionではPriorityを使用していないため、この関数は非推奨となりました。
         *
         * @brief 予約中のモーションの優先度の取得
         *
         * 予約中のモーションの優先度を取得する。
         *
         * @return  モーションの優先度
         */
        getReservePriority() {
          (0, cubismdebug_1.CubismLogInfo)("CubismExpressionMotionManager.getReservePriority() is deprecated because a priority value is not actually used during expression motion playback.");
          return this._reservePriority;
        }
        /**
         * @brief 再生中のモーションのウェイトを取得する。
         *
         * @param[in]    index    表情のインデックス
         * @returns               表情モーションのウェイト
         */
        getFadeWeight(index) {
          if (index < 0 || this._fadeWeights.getSize() < 1 || index >= this._fadeWeights.getSize()) {
            console.warn("Failed to get the fade weight value. The element at that index does not exist.");
            return -1;
          }
          return this._fadeWeights.at(index);
        }
        /**
         * @brief モーションのウェイトの設定。
         *
         * @param[in]    index    表情のインデックス
         * @param[in]    index    表情モーションのウェイト
         */
        setFadeWeight(index, expressionFadeWeight) {
          if (index < 0 || this._fadeWeights.getSize() < 1 || this._fadeWeights.getSize() <= index) {
            console.warn("Failed to set the fade weight value. The element at that index does not exist.");
            return;
          }
          this._fadeWeights.set(index, expressionFadeWeight);
        }
        /**
         * @deprecated
         * ExpressionではPriorityを使用していないため、この関数は非推奨となりました。
         *
         * @brief 予約中のモーションの優先度の設定
         *
         * 予約中のモーションの優先度を設定する。
         *
         * @param[in]   priority     優先度
         */
        setReservePriority(priority) {
          (0, cubismdebug_1.CubismLogInfo)("CubismExpressionMotionManager.setReservePriority() is deprecated because a priority value is not actually used during expression motion playback.");
          this._reservePriority = priority;
        }
        /**
         * @deprecated
         * ExpressionではPriorityを使用していないため、この関数は非推奨となりました。
         * CubismExpressionMotionManager.startMotion() を使用してください。
         *
         * @brief 優先度を設定してモーションの開始
         *
         * 優先度を設定してモーションを開始する。
         *
         * @param[in]   motion          モーション
         * @param[in]   autoDelete      再生が終了したモーションのインスタンスを削除するならtrue
         * @param[in]   priority        優先度
         * @return                      開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
         */
        startMotionPriority(motion, autoDelete, priority) {
          (0, cubismdebug_1.CubismLogInfo)("CubismExpressionMotionManager.startMotionPriority() is deprecated because a priority value is not actually used during expression motion playback.");
          if (priority == this.getReservePriority()) {
            this.setReservePriority(0);
          }
          this._currentPriority = priority;
          return this.startMotion(motion, autoDelete);
        }
        /**
         * @brief モーションの更新
         *
         * モーションを更新して、モデルにパラメータ値を反映する。
         *
         * @param[in]   model   対象のモデル
         * @param[in]   deltaTimeSeconds    デルタ時間[秒]
         * @retval  true    更新されている
         * @retval  false   更新されていない
         */
        updateMotion(model, deltaTimeSeconds) {
          this._userTimeSeconds += deltaTimeSeconds;
          let updated = false;
          const motions = this.getCubismMotionQueueEntries();
          let expressionWeight = 0;
          let expressionIndex = 0;
          if (this._fadeWeights.getSize() !== motions.getSize()) {
            const difference = motions.getSize() - this._fadeWeights.getSize();
            for (let i = 0; i < difference; i++) {
              this._fadeWeights.pushBack(0);
            }
          }
          for (let ite = this._motions.begin(); ite.notEqual(this._motions.end()); ) {
            const motionQueueEntry = ite.ptr();
            if (motionQueueEntry == null) {
              ite = motions.erase(ite);
              continue;
            }
            const expressionMotion = motionQueueEntry.getCubismMotion();
            if (expressionMotion == null) {
              (0, live2dcubismframework_1.csmDelete)(motionQueueEntry);
              ite = motions.erase(ite);
              continue;
            }
            const expressionParameters = expressionMotion.getExpressionParameters();
            if (motionQueueEntry.isAvailable()) {
              for (let i = 0; i < expressionParameters.getSize(); ++i) {
                if (expressionParameters.at(i).parameterId == null) {
                  continue;
                }
                let index = -1;
                for (let j = 0; j < this._expressionParameterValues.getSize(); ++j) {
                  if (this._expressionParameterValues.at(j).parameterId != expressionParameters.at(i).parameterId) {
                    continue;
                  }
                  index = j;
                  break;
                }
                if (index >= 0) {
                  continue;
                }
                const item = new ExpressionParameterValue();
                item.parameterId = expressionParameters.at(i).parameterId;
                item.additiveValue = cubismexpressionmotion_1.CubismExpressionMotion.DefaultAdditiveValue;
                item.multiplyValue = cubismexpressionmotion_1.CubismExpressionMotion.DefaultMultiplyValue;
                item.overwriteValue = model.getParameterValueById(item.parameterId);
                this._expressionParameterValues.pushBack(item);
              }
            }
            expressionMotion.setupMotionQueueEntry(motionQueueEntry, this._userTimeSeconds);
            this.setFadeWeight(expressionIndex, expressionMotion.updateFadeWeight(motionQueueEntry, this._userTimeSeconds));
            expressionMotion.calculateExpressionParameters(model, this._userTimeSeconds, motionQueueEntry, this._expressionParameterValues, expressionIndex, this.getFadeWeight(expressionIndex));
            expressionWeight += expressionMotion.getFadeInTime() == 0 ? 1 : cubismmath_1.CubismMath.getEasingSine((this._userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / expressionMotion.getFadeInTime());
            updated = true;
            if (motionQueueEntry.isTriggeredFadeOut()) {
              motionQueueEntry.startFadeOut(motionQueueEntry.getFadeOutSeconds(), this._userTimeSeconds);
            }
            ite.preIncrement();
            ++expressionIndex;
          }
          if (motions.getSize() > 1) {
            const latestFadeWeight = this.getFadeWeight(this._fadeWeights.getSize() - 1);
            if (latestFadeWeight >= 1) {
              for (let i = motions.getSize() - 2; i >= 0; --i) {
                const motionQueueEntry = motions.at(i);
                (0, live2dcubismframework_1.csmDelete)(motionQueueEntry);
                motions.remove(i);
                this._fadeWeights.remove(i);
              }
            }
          }
          if (expressionWeight > 1) {
            expressionWeight = 1;
          }
          for (let i = 0; i < this._expressionParameterValues.getSize(); ++i) {
            const expressionParameterValue = this._expressionParameterValues.at(i);
            model.setParameterValueById(expressionParameterValue.parameterId, (expressionParameterValue.overwriteValue + expressionParameterValue.additiveValue) * expressionParameterValue.multiplyValue, expressionWeight);
            expressionParameterValue.additiveValue = cubismexpressionmotion_1.CubismExpressionMotion.DefaultAdditiveValue;
            expressionParameterValue.multiplyValue = cubismexpressionmotion_1.CubismExpressionMotion.DefaultMultiplyValue;
          }
          return updated;
        }
      };
      exports.CubismExpressionMotionManager = CubismExpressionMotionManager;
      var $ = __importStar(require_cubismexpressionmotionmanager());
      var cubismmath_1 = require_cubismmath();
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismExpressionMotionManager = $.CubismExpressionMotionManager;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/motion/cubismmotioninternal.js
  var require_cubismmotioninternal = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/motion/cubismmotioninternal.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismMotionData = exports.CubismMotionEvent = exports.CubismMotionCurve = exports.CubismMotionSegment = exports.CubismMotionPoint = exports.CubismMotionSegmentType = exports.CubismMotionCurveTarget = void 0;
      var csmvector_1 = require_csmvector();
      var CubismMotionCurveTarget;
      (function(CubismMotionCurveTarget2) {
        CubismMotionCurveTarget2[CubismMotionCurveTarget2["CubismMotionCurveTarget_Model"] = 0] = "CubismMotionCurveTarget_Model";
        CubismMotionCurveTarget2[CubismMotionCurveTarget2["CubismMotionCurveTarget_Parameter"] = 1] = "CubismMotionCurveTarget_Parameter";
        CubismMotionCurveTarget2[CubismMotionCurveTarget2["CubismMotionCurveTarget_PartOpacity"] = 2] = "CubismMotionCurveTarget_PartOpacity";
      })(CubismMotionCurveTarget || (exports.CubismMotionCurveTarget = CubismMotionCurveTarget = {}));
      var CubismMotionSegmentType;
      (function(CubismMotionSegmentType2) {
        CubismMotionSegmentType2[CubismMotionSegmentType2["CubismMotionSegmentType_Linear"] = 0] = "CubismMotionSegmentType_Linear";
        CubismMotionSegmentType2[CubismMotionSegmentType2["CubismMotionSegmentType_Bezier"] = 1] = "CubismMotionSegmentType_Bezier";
        CubismMotionSegmentType2[CubismMotionSegmentType2["CubismMotionSegmentType_Stepped"] = 2] = "CubismMotionSegmentType_Stepped";
        CubismMotionSegmentType2[CubismMotionSegmentType2["CubismMotionSegmentType_InverseStepped"] = 3] = "CubismMotionSegmentType_InverseStepped";
      })(CubismMotionSegmentType || (exports.CubismMotionSegmentType = CubismMotionSegmentType = {}));
      var CubismMotionPoint = class {
        constructor() {
          this.time = 0;
          this.value = 0;
        }
      };
      exports.CubismMotionPoint = CubismMotionPoint;
      var CubismMotionSegment = class {
        /**
         * @brief コンストラクタ
         *
         * コンストラクタ。
         */
        constructor() {
          this.evaluate = null;
          this.basePointIndex = 0;
          this.segmentType = 0;
        }
      };
      exports.CubismMotionSegment = CubismMotionSegment;
      var CubismMotionCurve = class {
        constructor() {
          this.type = CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
          this.segmentCount = 0;
          this.baseSegmentIndex = 0;
          this.fadeInTime = 0;
          this.fadeOutTime = 0;
        }
      };
      exports.CubismMotionCurve = CubismMotionCurve;
      var CubismMotionEvent = class {
        constructor() {
          this.fireTime = 0;
        }
      };
      exports.CubismMotionEvent = CubismMotionEvent;
      var CubismMotionData = class {
        constructor() {
          this.duration = 0;
          this.loop = false;
          this.curveCount = 0;
          this.eventCount = 0;
          this.fps = 0;
          this.curves = new csmvector_1.csmVector();
          this.segments = new csmvector_1.csmVector();
          this.points = new csmvector_1.csmVector();
          this.events = new csmvector_1.csmVector();
        }
      };
      exports.CubismMotionData = CubismMotionData;
      var $ = __importStar(require_cubismmotioninternal());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismMotionCurve = $.CubismMotionCurve;
        Live2DCubismFramework2.CubismMotionCurveTarget = $.CubismMotionCurveTarget;
        Live2DCubismFramework2.CubismMotionData = $.CubismMotionData;
        Live2DCubismFramework2.CubismMotionEvent = $.CubismMotionEvent;
        Live2DCubismFramework2.CubismMotionPoint = $.CubismMotionPoint;
        Live2DCubismFramework2.CubismMotionSegment = $.CubismMotionSegment;
        Live2DCubismFramework2.CubismMotionSegmentType = $.CubismMotionSegmentType;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/motion/cubismmotionjson.js
  var require_cubismmotionjson = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/motion/cubismmotionjson.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.EvaluationOptionFlag = exports.CubismMotionJson = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var csmstring_1 = require_csmstring();
      var cubismdebug_1 = require_cubismdebug();
      var cubismjson_1 = require_cubismjson();
      var cubismmotioninternal_1 = require_cubismmotioninternal();
      var Meta = "Meta";
      var Duration = "Duration";
      var Loop = "Loop";
      var AreBeziersRestricted = "AreBeziersRestricted";
      var CurveCount = "CurveCount";
      var Fps = "Fps";
      var TotalSegmentCount = "TotalSegmentCount";
      var TotalPointCount = "TotalPointCount";
      var Curves = "Curves";
      var Target = "Target";
      var Id = "Id";
      var FadeInTime = "FadeInTime";
      var FadeOutTime = "FadeOutTime";
      var Segments = "Segments";
      var UserData = "UserData";
      var UserDataCount = "UserDataCount";
      var TotalUserDataSize = "TotalUserDataSize";
      var Time = "Time";
      var Value = "Value";
      var CubismMotionJson = class {
        /**
         * コンストラクタ
         * @param buffer motion3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        constructor(buffer, size) {
          this._json = cubismjson_1.CubismJson.create(buffer, size);
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          cubismjson_1.CubismJson.delete(this._json);
        }
        /**
         * モーションの長さを取得する
         * @return モーションの長さ[秒]
         */
        getMotionDuration() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(Duration).toFloat();
        }
        /**
         * モーションのループ情報の取得
         * @return true ループする
         * @return false ループしない
         */
        isMotionLoop() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(Loop).toBoolean();
        }
        /**
         *  motion3.jsonファイルの整合性チェック
         *
         * @return 正常なファイルの場合はtrueを返す。
         */
        hasConsistency() {
          let result = true;
          if (!this._json || !this._json.getRoot()) {
            return false;
          }
          const actualCurveListSize = this._json.getRoot().getValueByString(Curves).getVector().getSize();
          let actualTotalSegmentCount = 0;
          let actualTotalPointCount = 0;
          for (let curvePosition = 0; curvePosition < actualCurveListSize; ++curvePosition) {
            for (let segmentPosition = 0; segmentPosition < this.getMotionCurveSegmentCount(curvePosition); ) {
              if (segmentPosition == 0) {
                actualTotalPointCount += 1;
                segmentPosition += 2;
              }
              const segment = this.getMotionCurveSegment(curvePosition, segmentPosition);
              switch (segment) {
                case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Linear:
                  actualTotalPointCount += 1;
                  segmentPosition += 3;
                  break;
                case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Bezier:
                  actualTotalPointCount += 3;
                  segmentPosition += 7;
                  break;
                case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Stepped:
                  actualTotalPointCount += 1;
                  segmentPosition += 3;
                  break;
                case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped:
                  actualTotalPointCount += 1;
                  segmentPosition += 3;
                  break;
                default:
                  (0, cubismdebug_1.CSM_ASSERT)(0);
                  break;
              }
              ++actualTotalSegmentCount;
            }
          }
          if (actualCurveListSize != this.getMotionCurveCount()) {
            (0, cubismdebug_1.CubismLogWarning)("The number of curves does not match the metadata.");
            result = false;
          }
          if (actualTotalSegmentCount != this.getMotionTotalSegmentCount()) {
            (0, cubismdebug_1.CubismLogWarning)("The number of segment does not match the metadata.");
            result = false;
          }
          if (actualTotalPointCount != this.getMotionTotalPointCount()) {
            (0, cubismdebug_1.CubismLogWarning)("The number of point does not match the metadata.");
            result = false;
          }
          return result;
        }
        getEvaluationOptionFlag(flagType) {
          if (EvaluationOptionFlag.EvaluationOptionFlag_AreBeziersRistricted == flagType) {
            return this._json.getRoot().getValueByString(Meta).getValueByString(AreBeziersRestricted).toBoolean();
          }
          return false;
        }
        /**
         * モーションカーブの個数の取得
         * @return モーションカーブの個数
         */
        getMotionCurveCount() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(CurveCount).toInt();
        }
        /**
         * モーションのフレームレートの取得
         * @return フレームレート[FPS]
         */
        getMotionFps() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(Fps).toFloat();
        }
        /**
         * モーションのセグメントの総合計の取得
         * @return モーションのセグメントの取得
         */
        getMotionTotalSegmentCount() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(TotalSegmentCount).toInt();
        }
        /**
         * モーションのカーブの制御店の総合計の取得
         * @return モーションのカーブの制御点の総合計
         */
        getMotionTotalPointCount() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(TotalPointCount).toInt();
        }
        /**
         * モーションのフェードイン時間の存在
         * @return true 存在する
         * @return false 存在しない
         */
        isExistMotionFadeInTime() {
          return !this._json.getRoot().getValueByString(Meta).getValueByString(FadeInTime).isNull();
        }
        /**
         * モーションのフェードアウト時間の存在
         * @return true 存在する
         * @return false 存在しない
         */
        isExistMotionFadeOutTime() {
          return !this._json.getRoot().getValueByString(Meta).getValueByString(FadeOutTime).isNull();
        }
        /**
         * モーションのフェードイン時間の取得
         * @return フェードイン時間[秒]
         */
        getMotionFadeInTime() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(FadeInTime).toFloat();
        }
        /**
         * モーションのフェードアウト時間の取得
         * @return フェードアウト時間[秒]
         */
        getMotionFadeOutTime() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(FadeOutTime).toFloat();
        }
        /**
         * モーションのカーブの種類の取得
         * @param curveIndex カーブのインデックス
         * @return カーブの種類
         */
        getMotionCurveTarget(curveIndex) {
          return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Target).getRawString();
        }
        /**
         * モーションのカーブのIDの取得
         * @param curveIndex カーブのインデックス
         * @return カーブのID
         */
        getMotionCurveId(curveIndex) {
          return live2dcubismframework_1.CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Id).getRawString());
        }
        /**
         * モーションのカーブのフェードイン時間の存在
         * @param curveIndex カーブのインデックス
         * @return true 存在する
         * @return false 存在しない
         */
        isExistMotionCurveFadeInTime(curveIndex) {
          return !this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeInTime).isNull();
        }
        /**
         * モーションのカーブのフェードアウト時間の存在
         * @param curveIndex カーブのインデックス
         * @return true 存在する
         * @return false 存在しない
         */
        isExistMotionCurveFadeOutTime(curveIndex) {
          return !this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeOutTime).isNull();
        }
        /**
         * モーションのカーブのフェードイン時間の取得
         * @param curveIndex カーブのインデックス
         * @return フェードイン時間[秒]
         */
        getMotionCurveFadeInTime(curveIndex) {
          return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeInTime).toFloat();
        }
        /**
         * モーションのカーブのフェードアウト時間の取得
         * @param curveIndex カーブのインデックス
         * @return フェードアウト時間[秒]
         */
        getMotionCurveFadeOutTime(curveIndex) {
          return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeOutTime).toFloat();
        }
        /**
         * モーションのカーブのセグメントの個数を取得する
         * @param curveIndex カーブのインデックス
         * @return モーションのカーブのセグメントの個数
         */
        getMotionCurveSegmentCount(curveIndex) {
          return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Segments).getVector().getSize();
        }
        /**
         * モーションのカーブのセグメントの値の取得
         * @param curveIndex カーブのインデックス
         * @param segmentIndex セグメントのインデックス
         * @return セグメントの値
         */
        getMotionCurveSegment(curveIndex, segmentIndex) {
          return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Segments).getValueByIndex(segmentIndex).toFloat();
        }
        /**
         * イベントの個数の取得
         * @return イベントの個数
         */
        getEventCount() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(UserDataCount).toInt();
        }
        /**
         *  イベントの総文字数の取得
         * @return イベントの総文字数
         */
        getTotalEventValueSize() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(TotalUserDataSize).toInt();
        }
        /**
         * イベントの時間の取得
         * @param userDataIndex イベントのインデックス
         * @return イベントの時間[秒]
         */
        getEventTime(userDataIndex) {
          return this._json.getRoot().getValueByString(UserData).getValueByIndex(userDataIndex).getValueByString(Time).toFloat();
        }
        /**
         * イベントの取得
         * @param userDataIndex イベントのインデックス
         * @return イベントの文字列
         */
        getEventValue(userDataIndex) {
          return new csmstring_1.csmString(this._json.getRoot().getValueByString(UserData).getValueByIndex(userDataIndex).getValueByString(Value).getRawString());
        }
      };
      exports.CubismMotionJson = CubismMotionJson;
      var EvaluationOptionFlag;
      (function(EvaluationOptionFlag2) {
        EvaluationOptionFlag2[EvaluationOptionFlag2["EvaluationOptionFlag_AreBeziersRistricted"] = 0] = "EvaluationOptionFlag_AreBeziersRistricted";
      })(EvaluationOptionFlag || (exports.EvaluationOptionFlag = EvaluationOptionFlag = {}));
      var $ = __importStar(require_cubismmotionjson());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismMotionJson = $.CubismMotionJson;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/motion/cubismmotion.js
  var require_cubismmotion = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/motion/cubismmotion.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismMotion = exports.MotionBehavior = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var cubismmath_1 = require_cubismmath();
      var csmstring_1 = require_csmstring();
      var cubismdebug_1 = require_cubismdebug();
      var acubismmotion_1 = require_acubismmotion();
      var cubismmotioninternal_1 = require_cubismmotioninternal();
      var cubismmotionjson_1 = require_cubismmotionjson();
      var EffectNameEyeBlink = "EyeBlink";
      var EffectNameLipSync = "LipSync";
      var TargetNameModel = "Model";
      var TargetNameParameter = "Parameter";
      var TargetNamePartOpacity = "PartOpacity";
      var IdNameOpacity = "Opacity";
      var UseOldBeziersCurveMotion = false;
      function lerpPoints(a, b, t) {
        const result = new cubismmotioninternal_1.CubismMotionPoint();
        result.time = a.time + (b.time - a.time) * t;
        result.value = a.value + (b.value - a.value) * t;
        return result;
      }
      function linearEvaluate(points, time) {
        let t = (time - points[0].time) / (points[1].time - points[0].time);
        if (t < 0) {
          t = 0;
        }
        return points[0].value + (points[1].value - points[0].value) * t;
      }
      function bezierEvaluate(points, time) {
        let t = (time - points[0].time) / (points[3].time - points[0].time);
        if (t < 0) {
          t = 0;
        }
        const p01 = lerpPoints(points[0], points[1], t);
        const p12 = lerpPoints(points[1], points[2], t);
        const p23 = lerpPoints(points[2], points[3], t);
        const p012 = lerpPoints(p01, p12, t);
        const p123 = lerpPoints(p12, p23, t);
        return lerpPoints(p012, p123, t).value;
      }
      function bezierEvaluateCardanoInterpretation(points, time) {
        const x = time;
        const x1 = points[0].time;
        const x2 = points[3].time;
        const cx1 = points[1].time;
        const cx2 = points[2].time;
        const a = x2 - 3 * cx2 + 3 * cx1 - x1;
        const b = 3 * cx2 - 6 * cx1 + 3 * x1;
        const c = 3 * cx1 - 3 * x1;
        const d = x1 - x;
        const t = cubismmath_1.CubismMath.cardanoAlgorithmForBezier(a, b, c, d);
        const p01 = lerpPoints(points[0], points[1], t);
        const p12 = lerpPoints(points[1], points[2], t);
        const p23 = lerpPoints(points[2], points[3], t);
        const p012 = lerpPoints(p01, p12, t);
        const p123 = lerpPoints(p12, p23, t);
        return lerpPoints(p012, p123, t).value;
      }
      function steppedEvaluate(points, time) {
        return points[0].value;
      }
      function inverseSteppedEvaluate(points, time) {
        return points[1].value;
      }
      function evaluateCurve(motionData, index, time, isCorrection, endTime) {
        const curve = motionData.curves.at(index);
        let target = -1;
        const totalSegmentCount = curve.baseSegmentIndex + curve.segmentCount;
        let pointPosition = 0;
        for (let i = curve.baseSegmentIndex; i < totalSegmentCount; ++i) {
          pointPosition = motionData.segments.at(i).basePointIndex + (motionData.segments.at(i).segmentType == cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Bezier ? 3 : 1);
          if (motionData.points.at(pointPosition).time > time) {
            target = i;
            break;
          }
        }
        if (target == -1) {
          if (isCorrection && time < endTime) {
            return correctEndPoint(motionData, totalSegmentCount - 1, motionData.segments.at(curve.baseSegmentIndex).basePointIndex, pointPosition, time, endTime);
          }
          return motionData.points.at(pointPosition).value;
        }
        const segment = motionData.segments.at(target);
        return segment.evaluate(motionData.points.get(segment.basePointIndex), time);
      }
      function correctEndPoint(motionData, segmentIndex, beginIndex, endIndex, time, endTime) {
        const motionPoint = [
          new cubismmotioninternal_1.CubismMotionPoint(),
          new cubismmotioninternal_1.CubismMotionPoint()
        ];
        {
          const src = motionData.points.at(endIndex);
          motionPoint[0].time = src.time;
          motionPoint[0].value = src.value;
        }
        {
          const src = motionData.points.at(beginIndex);
          motionPoint[1].time = endTime;
          motionPoint[1].value = src.value;
        }
        switch (motionData.segments.at(segmentIndex).segmentType) {
          case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Linear:
          case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Bezier:
          default:
            return linearEvaluate(motionPoint, time);
          case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Stepped:
            return steppedEvaluate(motionPoint, time);
          case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped:
            return inverseSteppedEvaluate(motionPoint, time);
        }
      }
      var MotionBehavior;
      (function(MotionBehavior2) {
        MotionBehavior2[MotionBehavior2["MotionBehavior_V1"] = 0] = "MotionBehavior_V1";
        MotionBehavior2[MotionBehavior2["MotionBehavior_V2"] = 1] = "MotionBehavior_V2";
      })(MotionBehavior || (exports.MotionBehavior = MotionBehavior = {}));
      var CubismMotion = class _CubismMotion extends acubismmotion_1.ACubismMotion {
        /**
         * インスタンスを作成する
         *
         * @param buffer motion3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         * @param onFinishedMotionHandler モーション再生終了時に呼び出されるコールバック関数
         * @param onBeganMotionHandler モーション再生開始時に呼び出されるコールバック関数
         * @param shouldCheckMotionConsistency motion3.json整合性チェックするかどうか
         * @return 作成されたインスタンス
         */
        static create(buffer, size, onFinishedMotionHandler, onBeganMotionHandler, shouldCheckMotionConsistency = false) {
          const ret = new _CubismMotion();
          ret.parse(buffer, size, shouldCheckMotionConsistency);
          if (ret._motionData) {
            ret._sourceFrameRate = ret._motionData.fps;
            ret._loopDurationSeconds = ret._motionData.duration;
            ret._onFinishedMotion = onFinishedMotionHandler;
            ret._onBeganMotion = onBeganMotionHandler;
          } else {
            (0, live2dcubismframework_1.csmDelete)(ret);
            return null;
          }
          return ret;
        }
        /**
         * モデルのパラメータの更新の実行
         * @param model             対象のモデル
         * @param userTimeSeconds   現在の時刻[秒]
         * @param fadeWeight        モーションの重み
         * @param motionQueueEntry  CubismMotionQueueManagerで管理されているモーション
         */
        doUpdateParameters(model, userTimeSeconds, fadeWeight, motionQueueEntry) {
          if (this._modelCurveIdEyeBlink == null) {
            this._modelCurveIdEyeBlink = live2dcubismframework_1.CubismFramework.getIdManager().getId(EffectNameEyeBlink);
          }
          if (this._modelCurveIdLipSync == null) {
            this._modelCurveIdLipSync = live2dcubismframework_1.CubismFramework.getIdManager().getId(EffectNameLipSync);
          }
          if (this._modelCurveIdOpacity == null) {
            this._modelCurveIdOpacity = live2dcubismframework_1.CubismFramework.getIdManager().getId(IdNameOpacity);
          }
          if (this._motionBehavior === MotionBehavior.MotionBehavior_V2) {
            if (this._previousLoopState !== this._isLoop) {
              this.adjustEndTime(motionQueueEntry);
              this._previousLoopState = this._isLoop;
            }
          }
          let timeOffsetSeconds = userTimeSeconds - motionQueueEntry.getStartTime();
          if (timeOffsetSeconds < 0) {
            timeOffsetSeconds = 0;
          }
          let lipSyncValue = Number.MAX_VALUE;
          let eyeBlinkValue = Number.MAX_VALUE;
          const maxTargetSize = 64;
          let lipSyncFlags = 0;
          let eyeBlinkFlags = 0;
          if (this._eyeBlinkParameterIds.getSize() > maxTargetSize) {
            (0, cubismdebug_1.CubismLogDebug)("too many eye blink targets : {0}", this._eyeBlinkParameterIds.getSize());
          }
          if (this._lipSyncParameterIds.getSize() > maxTargetSize) {
            (0, cubismdebug_1.CubismLogDebug)("too many lip sync targets : {0}", this._lipSyncParameterIds.getSize());
          }
          const tmpFadeIn = this._fadeInSeconds <= 0 ? 1 : cubismmath_1.CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / this._fadeInSeconds);
          const tmpFadeOut = this._fadeOutSeconds <= 0 || motionQueueEntry.getEndTime() < 0 ? 1 : cubismmath_1.CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) / this._fadeOutSeconds);
          let value;
          let c, parameterIndex;
          let time = timeOffsetSeconds;
          let duration = this._motionData.duration;
          const isCorrection = this._motionBehavior === MotionBehavior.MotionBehavior_V2 && this._isLoop;
          if (this._isLoop) {
            if (this._motionBehavior === MotionBehavior.MotionBehavior_V2) {
              duration += 1 / this._motionData.fps;
            }
            while (time > duration) {
              time -= duration;
            }
          }
          const curves = this._motionData.curves;
          for (c = 0; c < this._motionData.curveCount && curves.at(c).type == cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Model; ++c) {
            value = evaluateCurve(this._motionData, c, time, isCorrection, duration);
            if (curves.at(c).id == this._modelCurveIdEyeBlink) {
              eyeBlinkValue = value;
            } else if (curves.at(c).id == this._modelCurveIdLipSync) {
              lipSyncValue = value;
            } else if (curves.at(c).id == this._modelCurveIdOpacity) {
              this._modelOpacity = value;
              model.setModelOapcity(this.getModelOpacityValue());
            }
          }
          let parameterMotionCurveCount = 0;
          for (; c < this._motionData.curveCount && curves.at(c).type == cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter; ++c) {
            parameterMotionCurveCount++;
            parameterIndex = model.getParameterIndex(curves.at(c).id);
            if (parameterIndex == -1) {
              continue;
            }
            const sourceValue = model.getParameterValueByIndex(parameterIndex);
            value = evaluateCurve(this._motionData, c, time, isCorrection, duration);
            if (eyeBlinkValue != Number.MAX_VALUE) {
              for (let i = 0; i < this._eyeBlinkParameterIds.getSize() && i < maxTargetSize; ++i) {
                if (this._eyeBlinkParameterIds.at(i) == curves.at(c).id) {
                  value *= eyeBlinkValue;
                  eyeBlinkFlags |= 1 << i;
                  break;
                }
              }
            }
            if (lipSyncValue != Number.MAX_VALUE) {
              for (let i = 0; i < this._lipSyncParameterIds.getSize() && i < maxTargetSize; ++i) {
                if (this._lipSyncParameterIds.at(i) == curves.at(c).id) {
                  value += lipSyncValue;
                  lipSyncFlags |= 1 << i;
                  break;
                }
              }
            }
            if (model.isRepeat(parameterIndex)) {
              value = model.getParameterRepeatValue(parameterIndex, value);
            }
            let v;
            if (curves.at(c).fadeInTime < 0 && curves.at(c).fadeOutTime < 0) {
              v = sourceValue + (value - sourceValue) * fadeWeight;
            } else {
              let fin;
              let fout;
              if (curves.at(c).fadeInTime < 0) {
                fin = tmpFadeIn;
              } else {
                fin = curves.at(c).fadeInTime == 0 ? 1 : cubismmath_1.CubismMath.getEasingSine((userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / curves.at(c).fadeInTime);
              }
              if (curves.at(c).fadeOutTime < 0) {
                fout = tmpFadeOut;
              } else {
                fout = curves.at(c).fadeOutTime == 0 || motionQueueEntry.getEndTime() < 0 ? 1 : cubismmath_1.CubismMath.getEasingSine((motionQueueEntry.getEndTime() - userTimeSeconds) / curves.at(c).fadeOutTime);
              }
              const paramWeight = this._weight * fin * fout;
              v = sourceValue + (value - sourceValue) * paramWeight;
            }
            model.setParameterValueByIndex(parameterIndex, v, 1);
          }
          {
            if (eyeBlinkValue != Number.MAX_VALUE) {
              for (let i = 0; i < this._eyeBlinkParameterIds.getSize() && i < maxTargetSize; ++i) {
                const sourceValue = model.getParameterValueById(this._eyeBlinkParameterIds.at(i));
                if (eyeBlinkFlags >> i & 1) {
                  continue;
                }
                const v = sourceValue + (eyeBlinkValue - sourceValue) * fadeWeight;
                model.setParameterValueById(this._eyeBlinkParameterIds.at(i), v);
              }
            }
            if (lipSyncValue != Number.MAX_VALUE) {
              for (let i = 0; i < this._lipSyncParameterIds.getSize() && i < maxTargetSize; ++i) {
                const sourceValue = model.getParameterValueById(this._lipSyncParameterIds.at(i));
                if (lipSyncFlags >> i & 1) {
                  continue;
                }
                const v = sourceValue + (lipSyncValue - sourceValue) * fadeWeight;
                model.setParameterValueById(this._lipSyncParameterIds.at(i), v);
              }
            }
          }
          for (; c < this._motionData.curveCount && curves.at(c).type == cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity; ++c) {
            parameterIndex = model.getParameterIndex(curves.at(c).id);
            if (parameterIndex == -1) {
              continue;
            }
            value = evaluateCurve(this._motionData, c, time, isCorrection, duration);
            model.setParameterValueByIndex(parameterIndex, value);
          }
          if (timeOffsetSeconds >= duration) {
            if (this._isLoop) {
              this.updateForNextLoop(motionQueueEntry, userTimeSeconds, time);
            } else {
              if (this._onFinishedMotion) {
                this._onFinishedMotion(this);
              }
              motionQueueEntry.setIsFinished(true);
            }
          }
          this._lastWeight = fadeWeight;
        }
        /**
         * ループ情報の設定
         * @param loop ループ情報
         */
        setIsLoop(loop) {
          (0, cubismdebug_1.CubismLogWarning)("setIsLoop() is a deprecated function. Please use setLoop().");
          this._isLoop = loop;
        }
        /**
         * ループ情報の取得
         * @return true ループする
         * @return false ループしない
         */
        isLoop() {
          (0, cubismdebug_1.CubismLogWarning)("isLoop() is a deprecated function. Please use getLoop().");
          return this._isLoop;
        }
        /**
         * ループ時のフェードイン情報の設定
         * @param loopFadeIn  ループ時のフェードイン情報
         */
        setIsLoopFadeIn(loopFadeIn) {
          (0, cubismdebug_1.CubismLogWarning)("setIsLoopFadeIn() is a deprecated function. Please use setLoopFadeIn().");
          this._isLoopFadeIn = loopFadeIn;
        }
        /**
         * ループ時のフェードイン情報の取得
         *
         * @return  true    する
         * @return  false   しない
         */
        isLoopFadeIn() {
          (0, cubismdebug_1.CubismLogWarning)("isLoopFadeIn() is a deprecated function. Please use getLoopFadeIn().");
          return this._isLoopFadeIn;
        }
        /**
         * Sets the version of the Motion Behavior.
         *
         * @param Specifies the version of the Motion Behavior.
         */
        setMotionBehavior(motionBehavior) {
          this._motionBehavior = motionBehavior;
        }
        /**
         * Gets the version of the Motion Behavior.
         *
         * @return Returns the version of the Motion Behavior.
         */
        getMotionBehavior() {
          return this._motionBehavior;
        }
        /**
         * モーションの長さを取得する。
         *
         * @return  モーションの長さ[秒]
         */
        getDuration() {
          return this._isLoop ? -1 : this._loopDurationSeconds;
        }
        /**
         * モーションのループ時の長さを取得する。
         *
         * @return  モーションのループ時の長さ[秒]
         */
        getLoopDuration() {
          return this._loopDurationSeconds;
        }
        /**
         * パラメータに対するフェードインの時間を設定する。
         *
         * @param parameterId     パラメータID
         * @param value           フェードインにかかる時間[秒]
         */
        setParameterFadeInTime(parameterId, value) {
          const curves = this._motionData.curves;
          for (let i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
              curves.at(i).fadeInTime = value;
              return;
            }
          }
        }
        /**
         * パラメータに対するフェードアウトの時間の設定
         * @param parameterId     パラメータID
         * @param value           フェードアウトにかかる時間[秒]
         */
        setParameterFadeOutTime(parameterId, value) {
          const curves = this._motionData.curves;
          for (let i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
              curves.at(i).fadeOutTime = value;
              return;
            }
          }
        }
        /**
         * パラメータに対するフェードインの時間の取得
         * @param    parameterId     パラメータID
         * @return   フェードインにかかる時間[秒]
         */
        getParameterFadeInTime(parameterId) {
          const curves = this._motionData.curves;
          for (let i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
              return curves.at(i).fadeInTime;
            }
          }
          return -1;
        }
        /**
         * パラメータに対するフェードアウトの時間を取得
         *
         * @param   parameterId     パラメータID
         * @return   フェードアウトにかかる時間[秒]
         */
        getParameterFadeOutTime(parameterId) {
          const curves = this._motionData.curves;
          for (let i = 0; i < this._motionData.curveCount; ++i) {
            if (parameterId == curves.at(i).id) {
              return curves.at(i).fadeOutTime;
            }
          }
          return -1;
        }
        /**
         * 自動エフェクトがかかっているパラメータIDリストの設定
         * @param eyeBlinkParameterIds    自動まばたきがかかっているパラメータIDのリスト
         * @param lipSyncParameterIds     リップシンクがかかっているパラメータIDのリスト
         */
        setEffectIds(eyeBlinkParameterIds, lipSyncParameterIds) {
          this._eyeBlinkParameterIds = eyeBlinkParameterIds;
          this._lipSyncParameterIds = lipSyncParameterIds;
        }
        /**
         * コンストラクタ
         */
        constructor() {
          super();
          this._motionBehavior = MotionBehavior.MotionBehavior_V2;
          this._sourceFrameRate = 30;
          this._loopDurationSeconds = -1;
          this._isLoop = false;
          this._isLoopFadeIn = true;
          this._lastWeight = 0;
          this._motionData = null;
          this._modelCurveIdEyeBlink = null;
          this._modelCurveIdLipSync = null;
          this._modelCurveIdOpacity = null;
          this._eyeBlinkParameterIds = null;
          this._lipSyncParameterIds = null;
          this._modelOpacity = 1;
          this._debugMode = false;
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          this._motionData = void 0;
          this._motionData = null;
        }
        /**
         *
         * @param motionQueueEntry
         * @param userTimeSeconds
         * @param time
         */
        updateForNextLoop(motionQueueEntry, userTimeSeconds, time) {
          switch (this._motionBehavior) {
            case MotionBehavior.MotionBehavior_V2:
            default:
              motionQueueEntry.setStartTime(userTimeSeconds - time);
              if (this._isLoopFadeIn) {
                motionQueueEntry.setFadeInStartTime(userTimeSeconds - time);
              }
              if (this._onFinishedMotion != null) {
                this._onFinishedMotion(this);
              }
              break;
            case MotionBehavior.MotionBehavior_V1:
              motionQueueEntry.setStartTime(userTimeSeconds);
              if (this._isLoopFadeIn) {
                motionQueueEntry.setFadeInStartTime(userTimeSeconds);
              }
              break;
          }
        }
        /**
         * motion3.jsonをパースする。
         *
         * @param motionJson  motion3.jsonが読み込まれているバッファ
         * @param size        バッファのサイズ
         * @param shouldCheckMotionConsistency motion3.json整合性チェックするかどうか
         */
        parse(motionJson, size, shouldCheckMotionConsistency = false) {
          let json = new cubismmotionjson_1.CubismMotionJson(motionJson, size);
          if (!json) {
            json.release();
            json = void 0;
            return;
          }
          if (shouldCheckMotionConsistency) {
            const consistency = json.hasConsistency();
            if (!consistency) {
              json.release();
              (0, cubismdebug_1.CubismLogError)("Inconsistent motion3.json.");
              return;
            }
          }
          this._motionData = new cubismmotioninternal_1.CubismMotionData();
          this._motionData.duration = json.getMotionDuration();
          this._motionData.loop = json.isMotionLoop();
          this._motionData.curveCount = json.getMotionCurveCount();
          this._motionData.fps = json.getMotionFps();
          this._motionData.eventCount = json.getEventCount();
          const areBeziersRestructed = json.getEvaluationOptionFlag(cubismmotionjson_1.EvaluationOptionFlag.EvaluationOptionFlag_AreBeziersRistricted);
          if (json.isExistMotionFadeInTime()) {
            this._fadeInSeconds = json.getMotionFadeInTime() < 0 ? 1 : json.getMotionFadeInTime();
          } else {
            this._fadeInSeconds = 1;
          }
          if (json.isExistMotionFadeOutTime()) {
            this._fadeOutSeconds = json.getMotionFadeOutTime() < 0 ? 1 : json.getMotionFadeOutTime();
          } else {
            this._fadeOutSeconds = 1;
          }
          this._motionData.curves.updateSize(this._motionData.curveCount, cubismmotioninternal_1.CubismMotionCurve, true);
          this._motionData.segments.updateSize(json.getMotionTotalSegmentCount(), cubismmotioninternal_1.CubismMotionSegment, true);
          this._motionData.points.updateSize(json.getMotionTotalPointCount(), cubismmotioninternal_1.CubismMotionPoint, true);
          this._motionData.events.updateSize(this._motionData.eventCount, cubismmotioninternal_1.CubismMotionEvent, true);
          let totalPointCount = 0;
          let totalSegmentCount = 0;
          for (let curveCount = 0; curveCount < this._motionData.curveCount; ++curveCount) {
            if (json.getMotionCurveTarget(curveCount) == TargetNameModel) {
              this._motionData.curves.at(curveCount).type = cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
            } else if (json.getMotionCurveTarget(curveCount) == TargetNameParameter) {
              this._motionData.curves.at(curveCount).type = cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Parameter;
            } else if (json.getMotionCurveTarget(curveCount) == TargetNamePartOpacity) {
              this._motionData.curves.at(curveCount).type = cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_PartOpacity;
            } else {
              (0, cubismdebug_1.CubismLogWarning)('Warning : Unable to get segment type from Curve! The number of "CurveCount" may be incorrect!');
            }
            this._motionData.curves.at(curveCount).id = json.getMotionCurveId(curveCount);
            this._motionData.curves.at(curveCount).baseSegmentIndex = totalSegmentCount;
            this._motionData.curves.at(curveCount).fadeInTime = json.isExistMotionCurveFadeInTime(curveCount) ? json.getMotionCurveFadeInTime(curveCount) : -1;
            this._motionData.curves.at(curveCount).fadeOutTime = json.isExistMotionCurveFadeOutTime(curveCount) ? json.getMotionCurveFadeOutTime(curveCount) : -1;
            for (let segmentPosition = 0; segmentPosition < json.getMotionCurveSegmentCount(curveCount); ) {
              if (segmentPosition == 0) {
                this._motionData.segments.at(totalSegmentCount).basePointIndex = totalPointCount;
                this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition);
                this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                totalPointCount += 1;
                segmentPosition += 2;
              } else {
                this._motionData.segments.at(totalSegmentCount).basePointIndex = totalPointCount - 1;
              }
              const segment = json.getMotionCurveSegment(curveCount, segmentPosition);
              const segmentType = segment;
              switch (segmentType) {
                case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Linear: {
                  this._motionData.segments.at(totalSegmentCount).segmentType = cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Linear;
                  this._motionData.segments.at(totalSegmentCount).evaluate = linearEvaluate;
                  this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                  this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                  totalPointCount += 1;
                  segmentPosition += 3;
                  break;
                }
                case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Bezier: {
                  this._motionData.segments.at(totalSegmentCount).segmentType = cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Bezier;
                  if (areBeziersRestructed || UseOldBeziersCurveMotion) {
                    this._motionData.segments.at(totalSegmentCount).evaluate = bezierEvaluate;
                  } else {
                    this._motionData.segments.at(totalSegmentCount).evaluate = bezierEvaluateCardanoInterpretation;
                  }
                  this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                  this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                  this._motionData.points.at(totalPointCount + 1).time = json.getMotionCurveSegment(curveCount, segmentPosition + 3);
                  this._motionData.points.at(totalPointCount + 1).value = json.getMotionCurveSegment(curveCount, segmentPosition + 4);
                  this._motionData.points.at(totalPointCount + 2).time = json.getMotionCurveSegment(curveCount, segmentPosition + 5);
                  this._motionData.points.at(totalPointCount + 2).value = json.getMotionCurveSegment(curveCount, segmentPosition + 6);
                  totalPointCount += 3;
                  segmentPosition += 7;
                  break;
                }
                case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Stepped: {
                  this._motionData.segments.at(totalSegmentCount).segmentType = cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_Stepped;
                  this._motionData.segments.at(totalSegmentCount).evaluate = steppedEvaluate;
                  this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                  this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                  totalPointCount += 1;
                  segmentPosition += 3;
                  break;
                }
                case cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped: {
                  this._motionData.segments.at(totalSegmentCount).segmentType = cubismmotioninternal_1.CubismMotionSegmentType.CubismMotionSegmentType_InverseStepped;
                  this._motionData.segments.at(totalSegmentCount).evaluate = inverseSteppedEvaluate;
                  this._motionData.points.at(totalPointCount).time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                  this._motionData.points.at(totalPointCount).value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                  totalPointCount += 1;
                  segmentPosition += 3;
                  break;
                }
                default: {
                  (0, cubismdebug_1.CSM_ASSERT)(0);
                  break;
                }
              }
              ++this._motionData.curves.at(curveCount).segmentCount;
              ++totalSegmentCount;
            }
          }
          for (let userdatacount = 0; userdatacount < json.getEventCount(); ++userdatacount) {
            this._motionData.events.at(userdatacount).fireTime = json.getEventTime(userdatacount);
            this._motionData.events.at(userdatacount).value = json.getEventValue(userdatacount);
          }
          json.release();
          json = void 0;
          json = null;
        }
        /**
         * モデルのパラメータ更新
         *
         * イベント発火のチェック。
         * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
         *
         * @param beforeCheckTimeSeconds   前回のイベントチェック時間[秒]
         * @param motionTimeSeconds        今回の再生時間[秒]
         */
        getFiredEvent(beforeCheckTimeSeconds, motionTimeSeconds) {
          this._firedEventValues.updateSize(0);
          for (let u = 0; u < this._motionData.eventCount; ++u) {
            if (this._motionData.events.at(u).fireTime > beforeCheckTimeSeconds && this._motionData.events.at(u).fireTime <= motionTimeSeconds) {
              this._firedEventValues.pushBack(new csmstring_1.csmString(this._motionData.events.at(u).value.s));
            }
          }
          return this._firedEventValues;
        }
        /**
         * 透明度のカーブが存在するかどうかを確認する
         *
         * @returns true  -> キーが存在する
         *          false -> キーが存在しない
         */
        isExistModelOpacity() {
          for (let i = 0; i < this._motionData.curveCount; i++) {
            const curve = this._motionData.curves.at(i);
            if (curve.type != cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Model) {
              continue;
            }
            if (curve.id.getString().s.localeCompare(IdNameOpacity) == 0) {
              return true;
            }
          }
          return false;
        }
        /**
         * 透明度のカーブのインデックスを返す
         *
         * @returns success:透明度のカーブのインデックス
         */
        getModelOpacityIndex() {
          if (this.isExistModelOpacity()) {
            for (let i = 0; i < this._motionData.curveCount; i++) {
              const curve = this._motionData.curves.at(i);
              if (curve.type != cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Model) {
                continue;
              }
              if (curve.id.getString().s.localeCompare(IdNameOpacity) == 0) {
                return i;
              }
            }
          }
          return -1;
        }
        /**
         * 透明度のIdを返す
         *
         * @param index モーションカーブのインデックス
         * @returns success:透明度のカーブのインデックス
         */
        getModelOpacityId(index) {
          if (index != -1) {
            const curve = this._motionData.curves.at(index);
            if (curve.type == cubismmotioninternal_1.CubismMotionCurveTarget.CubismMotionCurveTarget_Model) {
              if (curve.id.getString().s.localeCompare(IdNameOpacity) == 0) {
                return live2dcubismframework_1.CubismFramework.getIdManager().getId(curve.id.getString().s);
              }
            }
          }
          return null;
        }
        /**
         * 現在時間の透明度の値を返す
         *
         * @returns success:モーションの当該時間におけるOpacityの値
         */
        getModelOpacityValue() {
          return this._modelOpacity;
        }
        /**
         * デバッグ用フラグを設定する
         *
         * @param debugMode デバッグモードの有効・無効
         */
        setDebugMode(debugMode) {
          this._debugMode = debugMode;
        }
      };
      exports.CubismMotion = CubismMotion;
      var $ = __importStar(require_cubismmotion());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismMotion = $.CubismMotion;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/motion/cubismmotionmanager.js
  var require_cubismmotionmanager = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/motion/cubismmotionmanager.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismMotionManager = void 0;
      var cubismmotionqueuemanager_1 = require_cubismmotionqueuemanager();
      var CubismMotionManager = class extends cubismmotionqueuemanager_1.CubismMotionQueueManager {
        /**
         * コンストラクタ
         */
        constructor() {
          super();
          this._currentPriority = 0;
          this._reservePriority = 0;
        }
        /**
         * 再生中のモーションの優先度の取得
         * @return  モーションの優先度
         */
        getCurrentPriority() {
          return this._currentPriority;
        }
        /**
         * 予約中のモーションの優先度を取得する。
         * @return  モーションの優先度
         */
        getReservePriority() {
          return this._reservePriority;
        }
        /**
         * 予約中のモーションの優先度を設定する。
         * @param   val     優先度
         */
        setReservePriority(val) {
          this._reservePriority = val;
        }
        /**
         * 優先度を設定してモーションを開始する。
         *
         * @param motion          モーション
         * @param autoDelete      再生が狩猟したモーションのインスタンスを削除するならtrue
         * @param priority        優先度
         * @return                開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
         */
        startMotionPriority(motion, autoDelete, priority) {
          if (priority == this._reservePriority) {
            this._reservePriority = 0;
          }
          this._currentPriority = priority;
          return super.startMotion(motion, autoDelete);
        }
        /**
         * モーションを更新して、モデルにパラメータ値を反映する。
         *
         * @param model   対象のモデル
         * @param deltaTimeSeconds    デルタ時間[秒]
         * @return  true    更新されている
         * @return  false   更新されていない
         */
        updateMotion(model, deltaTimeSeconds) {
          this._userTimeSeconds += deltaTimeSeconds;
          const updated = super.doUpdateMotion(model, this._userTimeSeconds);
          if (this.isFinished()) {
            this._currentPriority = 0;
          }
          return updated;
        }
        /**
         * モーションを予約する。
         *
         * @param   priority    優先度
         * @return  true    予約できた
         * @return  false   予約できなかった
         */
        reserveMotion(priority) {
          if (priority <= this._reservePriority || priority <= this._currentPriority) {
            return false;
          }
          this._reservePriority = priority;
          return true;
        }
      };
      exports.CubismMotionManager = CubismMotionManager;
      var $ = __importStar(require_cubismmotionmanager());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismMotionManager = $.CubismMotionManager;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/physics/cubismphysicsinternal.js
  var require_cubismphysicsinternal = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/physics/cubismphysicsinternal.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismPhysicsRig = exports.CubismPhysicsOutput = exports.CubismPhysicsInput = exports.CubismPhysicsSubRig = exports.CubismPhysicsParticle = exports.CubismPhysicsNormalization = exports.CubismPhysicsParameter = exports.PhysicsJsonEffectiveForces = exports.CubismPhysicsSource = exports.CubismPhysicsTargetType = void 0;
      var cubismvector2_1 = require_cubismvector2();
      var csmvector_1 = require_csmvector();
      var CubismPhysicsTargetType;
      (function(CubismPhysicsTargetType2) {
        CubismPhysicsTargetType2[CubismPhysicsTargetType2["CubismPhysicsTargetType_Parameter"] = 0] = "CubismPhysicsTargetType_Parameter";
      })(CubismPhysicsTargetType || (exports.CubismPhysicsTargetType = CubismPhysicsTargetType = {}));
      var CubismPhysicsSource;
      (function(CubismPhysicsSource2) {
        CubismPhysicsSource2[CubismPhysicsSource2["CubismPhysicsSource_X"] = 0] = "CubismPhysicsSource_X";
        CubismPhysicsSource2[CubismPhysicsSource2["CubismPhysicsSource_Y"] = 1] = "CubismPhysicsSource_Y";
        CubismPhysicsSource2[CubismPhysicsSource2["CubismPhysicsSource_Angle"] = 2] = "CubismPhysicsSource_Angle";
      })(CubismPhysicsSource || (exports.CubismPhysicsSource = CubismPhysicsSource = {}));
      var PhysicsJsonEffectiveForces = class {
        constructor() {
          this.gravity = new cubismvector2_1.CubismVector2(0, 0);
          this.wind = new cubismvector2_1.CubismVector2(0, 0);
        }
      };
      exports.PhysicsJsonEffectiveForces = PhysicsJsonEffectiveForces;
      var CubismPhysicsParameter = class {
      };
      exports.CubismPhysicsParameter = CubismPhysicsParameter;
      var CubismPhysicsNormalization = class {
      };
      exports.CubismPhysicsNormalization = CubismPhysicsNormalization;
      var CubismPhysicsParticle = class {
        constructor() {
          this.initialPosition = new cubismvector2_1.CubismVector2(0, 0);
          this.position = new cubismvector2_1.CubismVector2(0, 0);
          this.lastPosition = new cubismvector2_1.CubismVector2(0, 0);
          this.lastGravity = new cubismvector2_1.CubismVector2(0, 0);
          this.force = new cubismvector2_1.CubismVector2(0, 0);
          this.velocity = new cubismvector2_1.CubismVector2(0, 0);
        }
      };
      exports.CubismPhysicsParticle = CubismPhysicsParticle;
      var CubismPhysicsSubRig = class {
        constructor() {
          this.normalizationPosition = new CubismPhysicsNormalization();
          this.normalizationAngle = new CubismPhysicsNormalization();
        }
      };
      exports.CubismPhysicsSubRig = CubismPhysicsSubRig;
      var CubismPhysicsInput = class {
        constructor() {
          this.source = new CubismPhysicsParameter();
        }
      };
      exports.CubismPhysicsInput = CubismPhysicsInput;
      var CubismPhysicsOutput = class {
        constructor() {
          this.destination = new CubismPhysicsParameter();
          this.translationScale = new cubismvector2_1.CubismVector2(0, 0);
        }
      };
      exports.CubismPhysicsOutput = CubismPhysicsOutput;
      var CubismPhysicsRig = class {
        constructor() {
          this.settings = new csmvector_1.csmVector();
          this.inputs = new csmvector_1.csmVector();
          this.outputs = new csmvector_1.csmVector();
          this.particles = new csmvector_1.csmVector();
          this.gravity = new cubismvector2_1.CubismVector2(0, 0);
          this.wind = new cubismvector2_1.CubismVector2(0, 0);
          this.fps = 0;
        }
      };
      exports.CubismPhysicsRig = CubismPhysicsRig;
      var $ = __importStar(require_cubismphysicsinternal());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismPhysicsInput = $.CubismPhysicsInput;
        Live2DCubismFramework2.CubismPhysicsNormalization = $.CubismPhysicsNormalization;
        Live2DCubismFramework2.CubismPhysicsOutput = $.CubismPhysicsOutput;
        Live2DCubismFramework2.CubismPhysicsParameter = $.CubismPhysicsParameter;
        Live2DCubismFramework2.CubismPhysicsParticle = $.CubismPhysicsParticle;
        Live2DCubismFramework2.CubismPhysicsRig = $.CubismPhysicsRig;
        Live2DCubismFramework2.CubismPhysicsSource = $.CubismPhysicsSource;
        Live2DCubismFramework2.CubismPhysicsSubRig = $.CubismPhysicsSubRig;
        Live2DCubismFramework2.CubismPhysicsTargetType = $.CubismPhysicsTargetType;
        Live2DCubismFramework2.PhysicsJsonEffectiveForces = $.PhysicsJsonEffectiveForces;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/physics/cubismphysicsjson.js
  var require_cubismphysicsjson = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/physics/cubismphysicsjson.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismPhysicsJson = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var cubismvector2_1 = require_cubismvector2();
      var cubismjson_1 = require_cubismjson();
      var Position = "Position";
      var X = "X";
      var Y = "Y";
      var Angle = "Angle";
      var Type = "Type";
      var Id = "Id";
      var Meta = "Meta";
      var EffectiveForces = "EffectiveForces";
      var TotalInputCount = "TotalInputCount";
      var TotalOutputCount = "TotalOutputCount";
      var PhysicsSettingCount = "PhysicsSettingCount";
      var Gravity = "Gravity";
      var Wind = "Wind";
      var VertexCount = "VertexCount";
      var Fps = "Fps";
      var PhysicsSettings = "PhysicsSettings";
      var Normalization = "Normalization";
      var Minimum = "Minimum";
      var Maximum = "Maximum";
      var Default = "Default";
      var Reflect2 = "Reflect";
      var Weight = "Weight";
      var Input = "Input";
      var Source = "Source";
      var Output = "Output";
      var Scale = "Scale";
      var VertexIndex = "VertexIndex";
      var Destination = "Destination";
      var Vertices = "Vertices";
      var Mobility = "Mobility";
      var Delay = "Delay";
      var Radius = "Radius";
      var Acceleration = "Acceleration";
      var CubismPhysicsJson = class {
        /**
         * コンストラクタ
         * @param buffer physics3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        constructor(buffer, size) {
          this._json = cubismjson_1.CubismJson.create(buffer, size);
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          cubismjson_1.CubismJson.delete(this._json);
        }
        /**
         * 重力の取得
         * @return 重力
         */
        getGravity() {
          const ret = new cubismvector2_1.CubismVector2(0, 0);
          ret.x = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Gravity).getValueByString(X).toFloat();
          ret.y = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Gravity).getValueByString(Y).toFloat();
          return ret;
        }
        /**
         * 風の取得
         * @return 風
         */
        getWind() {
          const ret = new cubismvector2_1.CubismVector2(0, 0);
          ret.x = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Wind).getValueByString(X).toFloat();
          ret.y = this._json.getRoot().getValueByString(Meta).getValueByString(EffectiveForces).getValueByString(Wind).getValueByString(Y).toFloat();
          return ret;
        }
        /**
         * 物理演算設定FPSの取得
         * @return 物理演算設定FPS
         */
        getFps() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(Fps).toFloat(0);
        }
        /**
         * 物理店の管理の個数の取得
         * @return 物理店の管理の個数
         */
        getSubRigCount() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(PhysicsSettingCount).toInt();
        }
        /**
         * 入力の総合計の取得
         * @return 入力の総合計
         */
        getTotalInputCount() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(TotalInputCount).toInt();
        }
        /**
         * 出力の総合計の取得
         * @return 出力の総合計
         */
        getTotalOutputCount() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(TotalOutputCount).toInt();
        }
        /**
         * 物理点の個数の取得
         * @return 物理点の個数
         */
        getVertexCount() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(VertexCount).toInt();
        }
        /**
         * 正規化された位置の最小値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置の最小値
         */
        getNormalizationPositionMinimumValue(physicsSettingIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Minimum).toFloat();
        }
        /**
         * 正規化された位置の最大値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置の最大値
         */
        getNormalizationPositionMaximumValue(physicsSettingIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Maximum).toFloat();
        }
        /**
         * 正規化された位置のデフォルト値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置のデフォルト値
         */
        getNormalizationPositionDefaultValue(physicsSettingIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Default).toFloat();
        }
        /**
         * 正規化された角度の最小値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された角度の最小値
         */
        getNormalizationAngleMinimumValue(physicsSettingIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Minimum).toFloat();
        }
        /**
         * 正規化された角度の最大値の取得
         * @param physicsSettingIndex
         * @return 正規化された角度の最大値
         */
        getNormalizationAngleMaximumValue(physicsSettingIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Maximum).toFloat();
        }
        /**
         * 正規化された角度のデフォルト値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された角度のデフォルト値
         */
        getNormalizationAngleDefaultValue(physicsSettingIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Default).toFloat();
        }
        /**
         * 入力の個数の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 入力の個数
         */
        getInputCount(physicsSettingIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getVector().getSize();
        }
        /**
         * 入力の重みの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の重み
         */
        getInputWeight(physicsSettingIndex, inputIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Weight).toFloat();
        }
        /**
         * 入力の反転の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の反転
         */
        getInputReflect(physicsSettingIndex, inputIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Reflect2).toBoolean();
        }
        /**
         * 入力の種類の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の種類
         */
        getInputType(physicsSettingIndex, inputIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Type).getRawString();
        }
        /**
         * 入力元のIDの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力元のID
         */
        getInputSourceId(physicsSettingIndex, inputIndex) {
          return live2dcubismframework_1.CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Source).getValueByString(Id).getRawString());
        }
        /**
         * 出力の個数の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 出力の個数
         */
        getOutputCount(physicsSettingIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getVector().getSize();
        }
        /**
         * 出力の物理点のインデックスの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の物理点のインデックス
         */
        getOutputVertexIndex(physicsSettingIndex, outputIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(VertexIndex).toInt();
        }
        /**
         * 出力の角度のスケールを取得する
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の角度のスケール
         */
        getOutputAngleScale(physicsSettingIndex, outputIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Scale).toFloat();
        }
        /**
         * 出力の重みの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の重み
         */
        getOutputWeight(physicsSettingIndex, outputIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Weight).toFloat();
        }
        /**
         * 出力先のIDの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力先のID
         */
        getOutputDestinationId(physicsSettingIndex, outputIndex) {
          return live2dcubismframework_1.CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Destination).getValueByString(Id).getRawString());
        }
        /**
         * 出力の種類の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の種類
         */
        getOutputType(physicsSettingIndex, outputIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Type).getRawString();
        }
        /**
         * 出力の反転の取得
         * @param physicsSettingIndex 物理演算のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の反転
         */
        getOutputReflect(physicsSettingIndex, outputIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Reflect2).toBoolean();
        }
        /**
         * 物理点の個数の取得
         * @param physicsSettingIndex 物理演算男設定のインデックス
         * @return 物理点の個数
         */
        getParticleCount(physicsSettingIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getVector().getSize();
        }
        /**
         * 物理点の動きやすさの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の動きやすさ
         */
        getParticleMobility(physicsSettingIndex, vertexIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Mobility).toFloat();
        }
        /**
         * 物理点の遅れの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の遅れ
         */
        getParticleDelay(physicsSettingIndex, vertexIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Delay).toFloat();
        }
        /**
         * 物理点の加速度の取得
         * @param physicsSettingIndex 物理演算の設定
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の加速度
         */
        getParticleAcceleration(physicsSettingIndex, vertexIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Acceleration).toFloat();
        }
        /**
         * 物理点の距離の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の距離
         */
        getParticleRadius(physicsSettingIndex, vertexIndex) {
          return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Radius).toFloat();
        }
        /**
         * 物理点の位置の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexInde 物理点のインデックス
         * @return 物理点の位置
         */
        getParticlePosition(physicsSettingIndex, vertexIndex) {
          const ret = new cubismvector2_1.CubismVector2(0, 0);
          ret.x = this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Position).getValueByString(X).toFloat();
          ret.y = this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Position).getValueByString(Y).toFloat();
          return ret;
        }
      };
      exports.CubismPhysicsJson = CubismPhysicsJson;
      var $ = __importStar(require_cubismphysicsjson());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismPhysicsJson = $.CubismPhysicsJson;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/physics/cubismphysics.js
  var require_cubismphysics = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/physics/cubismphysics.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.PhysicsOutput = exports.Options = exports.CubismPhysics = void 0;
      var cubismmath_1 = require_cubismmath();
      var cubismvector2_1 = require_cubismvector2();
      var csmvector_1 = require_csmvector();
      var cubismphysicsinternal_1 = require_cubismphysicsinternal();
      var cubismphysicsjson_1 = require_cubismphysicsjson();
      var PhysicsTypeTagX = "X";
      var PhysicsTypeTagY = "Y";
      var PhysicsTypeTagAngle = "Angle";
      var AirResistance = 5;
      var MaximumWeight = 100;
      var MovementThreshold = 1e-3;
      var MaxDeltaTime = 5;
      var CubismPhysics = class _CubismPhysics {
        /**
         * インスタンスの作成
         * @param buffer    physics3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         * @return 作成されたインスタンス
         */
        static create(buffer, size) {
          const ret = new _CubismPhysics();
          ret.parse(buffer, size);
          ret._physicsRig.gravity.y = 0;
          return ret;
        }
        /**
         * インスタンスを破棄する
         * @param physics 破棄するインスタンス
         */
        static delete(physics) {
          if (physics != null) {
            physics.release();
            physics = null;
          }
        }
        /**
         * physics3.jsonをパースする。
         * @param physicsJson physics3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        parse(physicsJson, size) {
          this._physicsRig = new cubismphysicsinternal_1.CubismPhysicsRig();
          let json = new cubismphysicsjson_1.CubismPhysicsJson(physicsJson, size);
          this._physicsRig.gravity = json.getGravity();
          this._physicsRig.wind = json.getWind();
          this._physicsRig.subRigCount = json.getSubRigCount();
          this._physicsRig.fps = json.getFps();
          this._physicsRig.settings.updateSize(this._physicsRig.subRigCount, cubismphysicsinternal_1.CubismPhysicsSubRig, true);
          this._physicsRig.inputs.updateSize(json.getTotalInputCount(), cubismphysicsinternal_1.CubismPhysicsInput, true);
          this._physicsRig.outputs.updateSize(json.getTotalOutputCount(), cubismphysicsinternal_1.CubismPhysicsOutput, true);
          this._physicsRig.particles.updateSize(json.getVertexCount(), cubismphysicsinternal_1.CubismPhysicsParticle, true);
          this._currentRigOutputs.clear();
          this._previousRigOutputs.clear();
          let inputIndex = 0, outputIndex = 0, particleIndex = 0;
          for (let i = 0; i < this._physicsRig.settings.getSize(); ++i) {
            this._physicsRig.settings.at(i).normalizationPosition.minimum = json.getNormalizationPositionMinimumValue(i);
            this._physicsRig.settings.at(i).normalizationPosition.maximum = json.getNormalizationPositionMaximumValue(i);
            this._physicsRig.settings.at(i).normalizationPosition.defalut = json.getNormalizationPositionDefaultValue(i);
            this._physicsRig.settings.at(i).normalizationAngle.minimum = json.getNormalizationAngleMinimumValue(i);
            this._physicsRig.settings.at(i).normalizationAngle.maximum = json.getNormalizationAngleMaximumValue(i);
            this._physicsRig.settings.at(i).normalizationAngle.defalut = json.getNormalizationAngleDefaultValue(i);
            this._physicsRig.settings.at(i).inputCount = json.getInputCount(i);
            this._physicsRig.settings.at(i).baseInputIndex = inputIndex;
            for (let j = 0; j < this._physicsRig.settings.at(i).inputCount; ++j) {
              this._physicsRig.inputs.at(inputIndex + j).sourceParameterIndex = -1;
              this._physicsRig.inputs.at(inputIndex + j).weight = json.getInputWeight(i, j);
              this._physicsRig.inputs.at(inputIndex + j).reflect = json.getInputReflect(i, j);
              if (json.getInputType(i, j) == PhysicsTypeTagX) {
                this._physicsRig.inputs.at(inputIndex + j).type = cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_X;
                this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue = getInputTranslationXFromNormalizedParameterValue;
              } else if (json.getInputType(i, j) == PhysicsTypeTagY) {
                this._physicsRig.inputs.at(inputIndex + j).type = cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_Y;
                this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue = getInputTranslationYFromNormalizedParamterValue;
              } else if (json.getInputType(i, j) == PhysicsTypeTagAngle) {
                this._physicsRig.inputs.at(inputIndex + j).type = cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_Angle;
                this._physicsRig.inputs.at(inputIndex + j).getNormalizedParameterValue = getInputAngleFromNormalizedParameterValue;
              }
              this._physicsRig.inputs.at(inputIndex + j).source.targetType = cubismphysicsinternal_1.CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
              this._physicsRig.inputs.at(inputIndex + j).source.id = json.getInputSourceId(i, j);
            }
            inputIndex += this._physicsRig.settings.at(i).inputCount;
            this._physicsRig.settings.at(i).outputCount = json.getOutputCount(i);
            this._physicsRig.settings.at(i).baseOutputIndex = outputIndex;
            const currentRigOutput = new PhysicsOutput();
            currentRigOutput.outputs.resize(this._physicsRig.settings.at(i).outputCount);
            const previousRigOutput = new PhysicsOutput();
            previousRigOutput.outputs.resize(this._physicsRig.settings.at(i).outputCount);
            for (let j = 0; j < this._physicsRig.settings.at(i).outputCount; ++j) {
              currentRigOutput.outputs.set(j, 0);
              previousRigOutput.outputs.set(j, 0);
              this._physicsRig.outputs.at(outputIndex + j).destinationParameterIndex = -1;
              this._physicsRig.outputs.at(outputIndex + j).vertexIndex = json.getOutputVertexIndex(i, j);
              this._physicsRig.outputs.at(outputIndex + j).angleScale = json.getOutputAngleScale(i, j);
              this._physicsRig.outputs.at(outputIndex + j).weight = json.getOutputWeight(i, j);
              this._physicsRig.outputs.at(outputIndex + j).destination.targetType = cubismphysicsinternal_1.CubismPhysicsTargetType.CubismPhysicsTargetType_Parameter;
              this._physicsRig.outputs.at(outputIndex + j).destination.id = json.getOutputDestinationId(i, j);
              if (json.getOutputType(i, j) == PhysicsTypeTagX) {
                this._physicsRig.outputs.at(outputIndex + j).type = cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_X;
                this._physicsRig.outputs.at(outputIndex + j).getValue = getOutputTranslationX;
                this._physicsRig.outputs.at(outputIndex + j).getScale = getOutputScaleTranslationX;
              } else if (json.getOutputType(i, j) == PhysicsTypeTagY) {
                this._physicsRig.outputs.at(outputIndex + j).type = cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_Y;
                this._physicsRig.outputs.at(outputIndex + j).getValue = getOutputTranslationY;
                this._physicsRig.outputs.at(outputIndex + j).getScale = getOutputScaleTranslationY;
              } else if (json.getOutputType(i, j) == PhysicsTypeTagAngle) {
                this._physicsRig.outputs.at(outputIndex + j).type = cubismphysicsinternal_1.CubismPhysicsSource.CubismPhysicsSource_Angle;
                this._physicsRig.outputs.at(outputIndex + j).getValue = getOutputAngle;
                this._physicsRig.outputs.at(outputIndex + j).getScale = getOutputScaleAngle;
              }
              this._physicsRig.outputs.at(outputIndex + j).reflect = json.getOutputReflect(i, j);
            }
            this._currentRigOutputs.pushBack(currentRigOutput);
            this._previousRigOutputs.pushBack(previousRigOutput);
            outputIndex += this._physicsRig.settings.at(i).outputCount;
            this._physicsRig.settings.at(i).particleCount = json.getParticleCount(i);
            this._physicsRig.settings.at(i).baseParticleIndex = particleIndex;
            for (let j = 0; j < this._physicsRig.settings.at(i).particleCount; ++j) {
              this._physicsRig.particles.at(particleIndex + j).mobility = json.getParticleMobility(i, j);
              this._physicsRig.particles.at(particleIndex + j).delay = json.getParticleDelay(i, j);
              this._physicsRig.particles.at(particleIndex + j).acceleration = json.getParticleAcceleration(i, j);
              this._physicsRig.particles.at(particleIndex + j).radius = json.getParticleRadius(i, j);
              this._physicsRig.particles.at(particleIndex + j).position = json.getParticlePosition(i, j);
            }
            particleIndex += this._physicsRig.settings.at(i).particleCount;
          }
          this.initialize();
          json.release();
          json = void 0;
          json = null;
        }
        /**
         * 現在のパラメータ値で物理演算が安定化する状態を演算する。
         * @param model 物理演算の結果を適用するモデル
         */
        stabilization(model) {
          var _a, _b, _c, _d;
          let totalAngle;
          let weight;
          let radAngle;
          let outputValue;
          const totalTranslation = new cubismvector2_1.CubismVector2();
          let currentSetting;
          let currentInputs;
          let currentOutputs;
          let currentParticles;
          const parameterValues = model.getModel().parameters.values;
          const parameterMaximumValues = model.getModel().parameters.maximumValues;
          const parameterMinimumValues = model.getModel().parameters.minimumValues;
          const parameterDefaultValues = model.getModel().parameters.defaultValues;
          if (((_b = (_a = this._parameterCaches) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) < model.getParameterCount()) {
            this._parameterCaches = new Float32Array(model.getParameterCount());
          }
          if (((_d = (_c = this._parameterInputCaches) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) < model.getParameterCount()) {
            this._parameterInputCaches = new Float32Array(model.getParameterCount());
          }
          for (let j = 0; j < model.getParameterCount(); ++j) {
            this._parameterCaches[j] = parameterValues[j];
            this._parameterInputCaches[j] = parameterValues[j];
          }
          for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
            totalAngle = { angle: 0 };
            totalTranslation.x = 0;
            totalTranslation.y = 0;
            currentSetting = this._physicsRig.settings.at(settingIndex);
            currentInputs = this._physicsRig.inputs.get(currentSetting.baseInputIndex);
            currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
            currentParticles = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
            for (let i = 0; i < currentSetting.inputCount; ++i) {
              weight = currentInputs[i].weight / MaximumWeight;
              if (currentInputs[i].sourceParameterIndex == -1) {
                currentInputs[i].sourceParameterIndex = model.getParameterIndex(currentInputs[i].source.id);
              }
              currentInputs[i].getNormalizedParameterValue(totalTranslation, totalAngle, parameterValues[currentInputs[i].sourceParameterIndex], parameterMinimumValues[currentInputs[i].sourceParameterIndex], parameterMaximumValues[currentInputs[i].sourceParameterIndex], parameterDefaultValues[currentInputs[i].sourceParameterIndex], currentSetting.normalizationPosition, currentSetting.normalizationAngle, currentInputs[i].reflect, weight);
              this._parameterCaches[currentInputs[i].sourceParameterIndex] = parameterValues[currentInputs[i].sourceParameterIndex];
            }
            radAngle = cubismmath_1.CubismMath.degreesToRadian(-totalAngle.angle);
            totalTranslation.x = totalTranslation.x * cubismmath_1.CubismMath.cos(radAngle) - totalTranslation.y * cubismmath_1.CubismMath.sin(radAngle);
            totalTranslation.y = totalTranslation.x * cubismmath_1.CubismMath.sin(radAngle) + totalTranslation.y * cubismmath_1.CubismMath.cos(radAngle);
            updateParticlesForStabilization(currentParticles, currentSetting.particleCount, totalTranslation, totalAngle.angle, this._options.wind, MovementThreshold * currentSetting.normalizationPosition.maximum);
            for (let i = 0; i < currentSetting.outputCount; ++i) {
              const particleIndex = currentOutputs[i].vertexIndex;
              if (currentOutputs[i].destinationParameterIndex == -1) {
                currentOutputs[i].destinationParameterIndex = model.getParameterIndex(currentOutputs[i].destination.id);
              }
              if (particleIndex < 1 || particleIndex >= currentSetting.particleCount) {
                continue;
              }
              let translation = new cubismvector2_1.CubismVector2();
              translation = currentParticles[particleIndex].position.substract(currentParticles[particleIndex - 1].position);
              outputValue = currentOutputs[i].getValue(translation, currentParticles, particleIndex, currentOutputs[i].reflect, this._options.gravity);
              this._currentRigOutputs.at(settingIndex).outputs.set(i, outputValue);
              this._previousRigOutputs.at(settingIndex).outputs.set(i, outputValue);
              const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
              const outParameterCaches = !Float32Array.prototype.slice && "subarray" in Float32Array.prototype ? JSON.parse(JSON.stringify(parameterValues.subarray(destinationParameterIndex))) : parameterValues.slice(destinationParameterIndex);
              updateOutputParameterValue(outParameterCaches, parameterMinimumValues[destinationParameterIndex], parameterMaximumValues[destinationParameterIndex], outputValue, currentOutputs[i]);
              for (let offset = destinationParameterIndex, outParamIndex = 0; offset < this._parameterCaches.length; offset++, outParamIndex++) {
                parameterValues[offset] = this._parameterCaches[offset] = outParameterCaches[outParamIndex];
              }
            }
          }
        }
        /**
         * 物理演算の評価
         *
         * Pendulum interpolation weights
         *
         * 振り子の計算結果は保存され、パラメータへの出力は保存された前回の結果で補間されます。
         * The result of the pendulum calculation is saved and
         * the output to the parameters is interpolated with the saved previous result of the pendulum calculation.
         *
         * 図で示すと[1]と[2]で補間されます。
         * The figure shows the interpolation between [1] and [2].
         *
         * 補間の重みは最新の振り子計算タイミングと次回のタイミングの間で見た現在時間で決定する。
         * The weight of the interpolation are determined by the current time seen between
         * the latest pendulum calculation timing and the next timing.
         *
         * 図で示すと[2]と[4]の間でみた(3)の位置の重みになる。
         * Figure shows the weight of position (3) as seen between [2] and [4].
         *
         * 解釈として振り子計算のタイミングと重み計算のタイミングがズレる。
         * As an interpretation, the pendulum calculation and weights are misaligned.
         *
         * physics3.jsonにFPS情報が存在しない場合は常に前の振り子状態で設定される。
         * If there is no FPS information in physics3.json, it is always set in the previous pendulum state.
         *
         * この仕様は補間範囲を逸脱したことが原因の震えたような見た目を回避を目的にしている。
         * The purpose of this specification is to avoid the quivering appearance caused by deviations from the interpolation range.
         *
         * ------------ time -------------->
         *
         *                 |+++++|------| <- weight
         * ==[1]====#=====[2]---(3)----(4)
         *          ^ output contents
         *
         * 1:_previousRigOutputs
         * 2:_currentRigOutputs
         * 3:_currentRemainTime (now rendering)
         * 4:next particles timing
         * @param model 物理演算の結果を適用するモデル
         * @param deltaTimeSeconds デルタ時間[秒]
         */
        evaluate(model, deltaTimeSeconds) {
          var _a, _b, _c, _d;
          let totalAngle;
          let weight;
          let radAngle;
          let outputValue;
          const totalTranslation = new cubismvector2_1.CubismVector2();
          let currentSetting;
          let currentInputs;
          let currentOutputs;
          let currentParticles;
          if (0 >= deltaTimeSeconds) {
            return;
          }
          const parameterValues = model.getModel().parameters.values;
          const parameterMaximumValues = model.getModel().parameters.maximumValues;
          const parameterMinimumValues = model.getModel().parameters.minimumValues;
          const parameterDefaultValues = model.getModel().parameters.defaultValues;
          let physicsDeltaTime;
          this._currentRemainTime += deltaTimeSeconds;
          if (this._currentRemainTime > MaxDeltaTime) {
            this._currentRemainTime = 0;
          }
          if (((_b = (_a = this._parameterCaches) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) < model.getParameterCount()) {
            this._parameterCaches = new Float32Array(model.getParameterCount());
          }
          if (((_d = (_c = this._parameterInputCaches) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) < model.getParameterCount()) {
            this._parameterInputCaches = new Float32Array(model.getParameterCount());
            for (let j = 0; j < model.getParameterCount(); ++j) {
              this._parameterInputCaches[j] = parameterValues[j];
            }
          }
          if (this._physicsRig.fps > 0) {
            physicsDeltaTime = 1 / this._physicsRig.fps;
          } else {
            physicsDeltaTime = deltaTimeSeconds;
          }
          while (this._currentRemainTime >= physicsDeltaTime) {
            for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
              currentSetting = this._physicsRig.settings.at(settingIndex);
              currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
              for (let i = 0; i < currentSetting.outputCount; ++i) {
                this._previousRigOutputs.at(settingIndex).outputs.set(i, this._currentRigOutputs.at(settingIndex).outputs.at(i));
              }
            }
            const inputWeight = physicsDeltaTime / this._currentRemainTime;
            for (let j = 0; j < model.getParameterCount(); ++j) {
              this._parameterCaches[j] = this._parameterInputCaches[j] * (1 - inputWeight) + parameterValues[j] * inputWeight;
              this._parameterInputCaches[j] = this._parameterCaches[j];
            }
            for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
              totalAngle = { angle: 0 };
              totalTranslation.x = 0;
              totalTranslation.y = 0;
              currentSetting = this._physicsRig.settings.at(settingIndex);
              currentInputs = this._physicsRig.inputs.get(currentSetting.baseInputIndex);
              currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
              currentParticles = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
              for (let i = 0; i < currentSetting.inputCount; ++i) {
                weight = currentInputs[i].weight / MaximumWeight;
                if (currentInputs[i].sourceParameterIndex == -1) {
                  currentInputs[i].sourceParameterIndex = model.getParameterIndex(currentInputs[i].source.id);
                }
                currentInputs[i].getNormalizedParameterValue(totalTranslation, totalAngle, this._parameterCaches[currentInputs[i].sourceParameterIndex], parameterMinimumValues[currentInputs[i].sourceParameterIndex], parameterMaximumValues[currentInputs[i].sourceParameterIndex], parameterDefaultValues[currentInputs[i].sourceParameterIndex], currentSetting.normalizationPosition, currentSetting.normalizationAngle, currentInputs[i].reflect, weight);
              }
              radAngle = cubismmath_1.CubismMath.degreesToRadian(-totalAngle.angle);
              totalTranslation.x = totalTranslation.x * cubismmath_1.CubismMath.cos(radAngle) - totalTranslation.y * cubismmath_1.CubismMath.sin(radAngle);
              totalTranslation.y = totalTranslation.x * cubismmath_1.CubismMath.sin(radAngle) + totalTranslation.y * cubismmath_1.CubismMath.cos(radAngle);
              updateParticles(currentParticles, currentSetting.particleCount, totalTranslation, totalAngle.angle, this._options.wind, MovementThreshold * currentSetting.normalizationPosition.maximum, physicsDeltaTime, AirResistance);
              for (let i = 0; i < currentSetting.outputCount; ++i) {
                const particleIndex = currentOutputs[i].vertexIndex;
                if (currentOutputs[i].destinationParameterIndex == -1) {
                  currentOutputs[i].destinationParameterIndex = model.getParameterIndex(currentOutputs[i].destination.id);
                }
                if (particleIndex < 1 || particleIndex >= currentSetting.particleCount) {
                  continue;
                }
                const translation = new cubismvector2_1.CubismVector2();
                translation.x = currentParticles[particleIndex].position.x - currentParticles[particleIndex - 1].position.x;
                translation.y = currentParticles[particleIndex].position.y - currentParticles[particleIndex - 1].position.y;
                outputValue = currentOutputs[i].getValue(translation, currentParticles, particleIndex, currentOutputs[i].reflect, this._options.gravity);
                this._currentRigOutputs.at(settingIndex).outputs.set(i, outputValue);
                const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
                const outParameterCaches = !Float32Array.prototype.slice && "subarray" in Float32Array.prototype ? JSON.parse(JSON.stringify(this._parameterCaches.subarray(destinationParameterIndex))) : this._parameterCaches.slice(destinationParameterIndex);
                updateOutputParameterValue(outParameterCaches, parameterMinimumValues[destinationParameterIndex], parameterMaximumValues[destinationParameterIndex], outputValue, currentOutputs[i]);
                for (let offset = destinationParameterIndex, outParamIndex = 0; offset < this._parameterCaches.length; offset++, outParamIndex++) {
                  this._parameterCaches[offset] = outParameterCaches[outParamIndex];
                }
              }
            }
            this._currentRemainTime -= physicsDeltaTime;
          }
          const alpha = this._currentRemainTime / physicsDeltaTime;
          this.interpolate(model, alpha);
        }
        /**
         * 物理演算結果の適用
         * 振り子演算の最新の結果と一つ前の結果から指定した重みで適用する。
         * @param model 物理演算の結果を適用するモデル
         * @param weight 最新結果の重み
         */
        interpolate(model, weight) {
          let currentOutputs;
          let currentSetting;
          const parameterValues = model.getModel().parameters.values;
          const parameterMaximumValues = model.getModel().parameters.maximumValues;
          const parameterMinimumValues = model.getModel().parameters.minimumValues;
          for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
            currentSetting = this._physicsRig.settings.at(settingIndex);
            currentOutputs = this._physicsRig.outputs.get(currentSetting.baseOutputIndex);
            for (let i = 0; i < currentSetting.outputCount; ++i) {
              if (currentOutputs[i].destinationParameterIndex == -1) {
                continue;
              }
              const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
              const outParameterValues = !Float32Array.prototype.slice && "subarray" in Float32Array.prototype ? JSON.parse(JSON.stringify(parameterValues.subarray(destinationParameterIndex))) : parameterValues.slice(destinationParameterIndex);
              updateOutputParameterValue(outParameterValues, parameterMinimumValues[destinationParameterIndex], parameterMaximumValues[destinationParameterIndex], this._previousRigOutputs.at(settingIndex).outputs.at(i) * (1 - weight) + this._currentRigOutputs.at(settingIndex).outputs.at(i) * weight, currentOutputs[i]);
              for (let offset = destinationParameterIndex, outParamIndex = 0; offset < parameterValues.length; offset++, outParamIndex++) {
                parameterValues[offset] = outParameterValues[outParamIndex];
              }
            }
          }
        }
        /**
         * オプションの設定
         * @param options オプション
         */
        setOptions(options) {
          this._options = options;
        }
        /**
         * オプションの取得
         * @return オプション
         */
        getOption() {
          return this._options;
        }
        /**
         * コンストラクタ
         */
        constructor() {
          this._physicsRig = null;
          this._options = new Options();
          this._options.gravity.y = -1;
          this._options.gravity.x = 0;
          this._options.wind.x = 0;
          this._options.wind.y = 0;
          this._currentRigOutputs = new csmvector_1.csmVector();
          this._previousRigOutputs = new csmvector_1.csmVector();
          this._currentRemainTime = 0;
          this._parameterCaches = null;
          this._parameterInputCaches = null;
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          this._physicsRig = void 0;
          this._physicsRig = null;
        }
        /**
         * 初期化する
         */
        initialize() {
          let strand;
          let currentSetting;
          let radius;
          for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
            currentSetting = this._physicsRig.settings.at(settingIndex);
            strand = this._physicsRig.particles.get(currentSetting.baseParticleIndex);
            strand[0].initialPosition = new cubismvector2_1.CubismVector2(0, 0);
            strand[0].lastPosition = new cubismvector2_1.CubismVector2(strand[0].initialPosition.x, strand[0].initialPosition.y);
            strand[0].lastGravity = new cubismvector2_1.CubismVector2(0, -1);
            strand[0].lastGravity.y *= -1;
            strand[0].velocity = new cubismvector2_1.CubismVector2(0, 0);
            strand[0].force = new cubismvector2_1.CubismVector2(0, 0);
            for (let i = 1; i < currentSetting.particleCount; ++i) {
              radius = new cubismvector2_1.CubismVector2(0, 0);
              radius.y = strand[i].radius;
              strand[i].initialPosition = new cubismvector2_1.CubismVector2(strand[i - 1].initialPosition.x + radius.x, strand[i - 1].initialPosition.y + radius.y);
              strand[i].position = new cubismvector2_1.CubismVector2(strand[i].initialPosition.x, strand[i].initialPosition.y);
              strand[i].lastPosition = new cubismvector2_1.CubismVector2(strand[i].initialPosition.x, strand[i].initialPosition.y);
              strand[i].lastGravity = new cubismvector2_1.CubismVector2(0, -1);
              strand[i].lastGravity.y *= -1;
              strand[i].velocity = new cubismvector2_1.CubismVector2(0, 0);
              strand[i].force = new cubismvector2_1.CubismVector2(0, 0);
            }
          }
        }
      };
      exports.CubismPhysics = CubismPhysics;
      var Options = class {
        constructor() {
          this.gravity = new cubismvector2_1.CubismVector2(0, 0);
          this.wind = new cubismvector2_1.CubismVector2(0, 0);
        }
      };
      exports.Options = Options;
      var PhysicsOutput = class {
        constructor() {
          this.outputs = new csmvector_1.csmVector(0);
        }
      };
      exports.PhysicsOutput = PhysicsOutput;
      function sign(value) {
        let ret = 0;
        if (value > 0) {
          ret = 1;
        } else if (value < 0) {
          ret = -1;
        }
        return ret;
      }
      function getInputTranslationXFromNormalizedParameterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition, normalizationAngle, isInverted, weight) {
        targetTranslation.x += normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition.minimum, normalizationPosition.maximum, normalizationPosition.defalut, isInverted) * weight;
      }
      function getInputTranslationYFromNormalizedParamterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition, normalizationAngle, isInverted, weight) {
        targetTranslation.y += normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition.minimum, normalizationPosition.maximum, normalizationPosition.defalut, isInverted) * weight;
      }
      function getInputAngleFromNormalizedParameterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizaitionPosition, normalizationAngle, isInverted, weight) {
        targetAngle.angle += normalizeParameterValue(value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationAngle.minimum, normalizationAngle.maximum, normalizationAngle.defalut, isInverted) * weight;
      }
      function getOutputTranslationX(translation, particles, particleIndex, isInverted, parentGravity) {
        let outputValue = translation.x;
        if (isInverted) {
          outputValue *= -1;
        }
        return outputValue;
      }
      function getOutputTranslationY(translation, particles, particleIndex, isInverted, parentGravity) {
        let outputValue = translation.y;
        if (isInverted) {
          outputValue *= -1;
        }
        return outputValue;
      }
      function getOutputAngle(translation, particles, particleIndex, isInverted, parentGravity) {
        let outputValue;
        if (particleIndex >= 2) {
          parentGravity = particles[particleIndex - 1].position.substract(particles[particleIndex - 2].position);
        } else {
          parentGravity = parentGravity.multiplyByScaler(-1);
        }
        outputValue = cubismmath_1.CubismMath.directionToRadian(parentGravity, translation);
        if (isInverted) {
          outputValue *= -1;
        }
        return outputValue;
      }
      function getRangeValue(min, max) {
        const maxValue = cubismmath_1.CubismMath.max(min, max);
        const minValue = cubismmath_1.CubismMath.min(min, max);
        return cubismmath_1.CubismMath.abs(maxValue - minValue);
      }
      function getDefaultValue(min, max) {
        const minValue = cubismmath_1.CubismMath.min(min, max);
        return minValue + getRangeValue(min, max) / 2;
      }
      function getOutputScaleTranslationX(translationScale, angleScale) {
        return JSON.parse(JSON.stringify(translationScale.x));
      }
      function getOutputScaleTranslationY(translationScale, angleScale) {
        return JSON.parse(JSON.stringify(translationScale.y));
      }
      function getOutputScaleAngle(translationScale, angleScale) {
        return JSON.parse(JSON.stringify(angleScale));
      }
      function updateParticles(strand, strandCount, totalTranslation, totalAngle, windDirection, thresholdValue, deltaTimeSeconds, airResistance) {
        let delay;
        let radian;
        let direction = new cubismvector2_1.CubismVector2(0, 0);
        let velocity = new cubismvector2_1.CubismVector2(0, 0);
        let force = new cubismvector2_1.CubismVector2(0, 0);
        let newDirection = new cubismvector2_1.CubismVector2(0, 0);
        strand[0].position = new cubismvector2_1.CubismVector2(totalTranslation.x, totalTranslation.y);
        const totalRadian = cubismmath_1.CubismMath.degreesToRadian(totalAngle);
        const currentGravity = cubismmath_1.CubismMath.radianToDirection(totalRadian);
        currentGravity.normalize();
        for (let i = 1; i < strandCount; ++i) {
          strand[i].force = currentGravity.multiplyByScaler(strand[i].acceleration).add(windDirection);
          strand[i].lastPosition = new cubismvector2_1.CubismVector2(strand[i].position.x, strand[i].position.y);
          delay = strand[i].delay * deltaTimeSeconds * 30;
          direction = strand[i].position.substract(strand[i - 1].position);
          radian = cubismmath_1.CubismMath.directionToRadian(strand[i].lastGravity, currentGravity) / airResistance;
          direction.x = cubismmath_1.CubismMath.cos(radian) * direction.x - direction.y * cubismmath_1.CubismMath.sin(radian);
          direction.y = cubismmath_1.CubismMath.sin(radian) * direction.x + direction.y * cubismmath_1.CubismMath.cos(radian);
          strand[i].position = strand[i - 1].position.add(direction);
          velocity = strand[i].velocity.multiplyByScaler(delay);
          force = strand[i].force.multiplyByScaler(delay).multiplyByScaler(delay);
          strand[i].position = strand[i].position.add(velocity).add(force);
          newDirection = strand[i].position.substract(strand[i - 1].position);
          newDirection.normalize();
          strand[i].position = strand[i - 1].position.add(newDirection.multiplyByScaler(strand[i].radius));
          if (cubismmath_1.CubismMath.abs(strand[i].position.x) < thresholdValue) {
            strand[i].position.x = 0;
          }
          if (delay != 0) {
            strand[i].velocity = strand[i].position.substract(strand[i].lastPosition);
            strand[i].velocity = strand[i].velocity.divisionByScalar(delay);
            strand[i].velocity = strand[i].velocity.multiplyByScaler(strand[i].mobility);
          }
          strand[i].force = new cubismvector2_1.CubismVector2(0, 0);
          strand[i].lastGravity = new cubismvector2_1.CubismVector2(currentGravity.x, currentGravity.y);
        }
      }
      function updateParticlesForStabilization(strand, strandCount, totalTranslation, totalAngle, windDirection, thresholdValue) {
        let force = new cubismvector2_1.CubismVector2(0, 0);
        strand[0].position = new cubismvector2_1.CubismVector2(totalTranslation.x, totalTranslation.y);
        const totalRadian = cubismmath_1.CubismMath.degreesToRadian(totalAngle);
        const currentGravity = cubismmath_1.CubismMath.radianToDirection(totalRadian);
        currentGravity.normalize();
        for (let i = 1; i < strandCount; ++i) {
          strand[i].force = currentGravity.multiplyByScaler(strand[i].acceleration).add(windDirection);
          strand[i].lastPosition = new cubismvector2_1.CubismVector2(strand[i].position.x, strand[i].position.y);
          strand[i].velocity = new cubismvector2_1.CubismVector2(0, 0);
          force = strand[i].force;
          force.normalize();
          force = force.multiplyByScaler(strand[i].radius);
          strand[i].position = strand[i - 1].position.add(force);
          if (cubismmath_1.CubismMath.abs(strand[i].position.x) < thresholdValue) {
            strand[i].position.x = 0;
          }
          strand[i].force = new cubismvector2_1.CubismVector2(0, 0);
          strand[i].lastGravity = new cubismvector2_1.CubismVector2(currentGravity.x, currentGravity.y);
        }
      }
      function updateOutputParameterValue(parameterValue, parameterValueMinimum, parameterValueMaximum, translation, output) {
        let value;
        const outputScale = output.getScale(output.translationScale, output.angleScale);
        value = translation * outputScale;
        if (value < parameterValueMinimum) {
          if (value < output.valueBelowMinimum) {
            output.valueBelowMinimum = value;
          }
          value = parameterValueMinimum;
        } else if (value > parameterValueMaximum) {
          if (value > output.valueExceededMaximum) {
            output.valueExceededMaximum = value;
          }
          value = parameterValueMaximum;
        }
        const weight = output.weight / MaximumWeight;
        if (weight >= 1) {
          parameterValue[0] = value;
        } else {
          value = parameterValue[0] * (1 - weight) + value * weight;
          parameterValue[0] = value;
        }
      }
      function normalizeParameterValue(value, parameterMinimum, parameterMaximum, parameterDefault, normalizedMinimum, normalizedMaximum, normalizedDefault, isInverted) {
        let result = 0;
        const maxValue = cubismmath_1.CubismMath.max(parameterMaximum, parameterMinimum);
        if (maxValue < value) {
          value = maxValue;
        }
        const minValue = cubismmath_1.CubismMath.min(parameterMaximum, parameterMinimum);
        if (minValue > value) {
          value = minValue;
        }
        const minNormValue = cubismmath_1.CubismMath.min(normalizedMinimum, normalizedMaximum);
        const maxNormValue = cubismmath_1.CubismMath.max(normalizedMinimum, normalizedMaximum);
        const middleNormValue = normalizedDefault;
        const middleValue = getDefaultValue(minValue, maxValue);
        const paramValue = value - middleValue;
        switch (sign(paramValue)) {
          case 1: {
            const nLength = maxNormValue - middleNormValue;
            const pLength = maxValue - middleValue;
            if (pLength != 0) {
              result = paramValue * (nLength / pLength);
              result += middleNormValue;
            }
            break;
          }
          case -1: {
            const nLength = minNormValue - middleNormValue;
            const pLength = minValue - middleValue;
            if (pLength != 0) {
              result = paramValue * (nLength / pLength);
              result += middleNormValue;
            }
            break;
          }
          case 0: {
            result = middleNormValue;
            break;
          }
          default: {
            break;
          }
        }
        return isInverted ? result : result * -1;
      }
      var $ = __importStar(require_cubismphysics());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismPhysics = $.CubismPhysics;
        Live2DCubismFramework2.Options = $.Options;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/rendering/cubismclippingmanager.js
  var require_cubismclippingmanager = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/rendering/cubismclippingmanager.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CubismClippingManager = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var csmvector_1 = require_csmvector();
      var csmrectf_1 = require_csmrectf();
      var cubismmatrix44_1 = require_cubismmatrix44();
      var cubismrenderer_1 = require_cubismrenderer();
      var cubismdebug_1 = require_cubismdebug();
      var ColorChannelCount = 4;
      var ClippingMaskMaxCountOnDefault = 36;
      var ClippingMaskMaxCountOnMultiRenderTexture = 32;
      var CubismClippingManager = class {
        /**
         * コンストラクタ
         */
        constructor(clippingContextFactory) {
          this._renderTextureCount = 0;
          this._clippingMaskBufferSize = 256;
          this._clippingContextListForMask = new csmvector_1.csmVector();
          this._clippingContextListForDraw = new csmvector_1.csmVector();
          this._channelColors = new csmvector_1.csmVector();
          this._tmpBoundsOnModel = new csmrectf_1.csmRect();
          this._tmpMatrix = new cubismmatrix44_1.CubismMatrix44();
          this._tmpMatrixForMask = new cubismmatrix44_1.CubismMatrix44();
          this._tmpMatrixForDraw = new cubismmatrix44_1.CubismMatrix44();
          this._clippingContexttConstructor = clippingContextFactory;
          let tmp = new cubismrenderer_1.CubismTextureColor();
          tmp.r = 1;
          tmp.g = 0;
          tmp.b = 0;
          tmp.a = 0;
          this._channelColors.pushBack(tmp);
          tmp = new cubismrenderer_1.CubismTextureColor();
          tmp.r = 0;
          tmp.g = 1;
          tmp.b = 0;
          tmp.a = 0;
          this._channelColors.pushBack(tmp);
          tmp = new cubismrenderer_1.CubismTextureColor();
          tmp.r = 0;
          tmp.g = 0;
          tmp.b = 1;
          tmp.a = 0;
          this._channelColors.pushBack(tmp);
          tmp = new cubismrenderer_1.CubismTextureColor();
          tmp.r = 0;
          tmp.g = 0;
          tmp.b = 0;
          tmp.a = 1;
          this._channelColors.pushBack(tmp);
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          for (let i = 0; i < this._clippingContextListForMask.getSize(); i++) {
            if (this._clippingContextListForMask.at(i)) {
              this._clippingContextListForMask.at(i).release();
              this._clippingContextListForMask.set(i, void 0);
            }
            this._clippingContextListForMask.set(i, null);
          }
          this._clippingContextListForMask = null;
          for (let i = 0; i < this._clippingContextListForDraw.getSize(); i++) {
            this._clippingContextListForDraw.set(i, null);
          }
          this._clippingContextListForDraw = null;
          for (let i = 0; i < this._channelColors.getSize(); i++) {
            this._channelColors.set(i, null);
          }
          this._channelColors = null;
          if (this._clearedFrameBufferFlags != null) {
            this._clearedFrameBufferFlags.clear();
          }
          this._clearedFrameBufferFlags = null;
        }
        /**
         * マネージャの初期化処理
         * クリッピングマスクを使う描画オブジェクトの登録を行う
         * @param model モデルのインスタンス
         * @param renderTextureCount バッファの生成数
         */
        initialize(model, renderTextureCount) {
          if (renderTextureCount % 1 != 0) {
            (0, cubismdebug_1.CubismLogWarning)("The number of render textures must be specified as an integer. The decimal point is rounded down and corrected to an integer.");
            renderTextureCount = ~~renderTextureCount;
          }
          if (renderTextureCount < 1) {
            (0, cubismdebug_1.CubismLogWarning)("The number of render textures must be an integer greater than or equal to 1. Set the number of render textures to 1.");
          }
          this._renderTextureCount = renderTextureCount < 1 ? 1 : renderTextureCount;
          this._clearedFrameBufferFlags = new csmvector_1.csmVector(this._renderTextureCount);
          for (let i = 0; i < model.getDrawableCount(); i++) {
            if (model.getDrawableMaskCounts()[i] <= 0) {
              this._clippingContextListForDraw.pushBack(null);
              continue;
            }
            let clippingContext = this.findSameClip(model.getDrawableMasks()[i], model.getDrawableMaskCounts()[i]);
            if (clippingContext == null) {
              clippingContext = new this._clippingContexttConstructor(this, model.getDrawableMasks()[i], model.getDrawableMaskCounts()[i]);
              this._clippingContextListForMask.pushBack(clippingContext);
            }
            clippingContext.addClippedDrawable(i);
            this._clippingContextListForDraw.pushBack(clippingContext);
          }
        }
        /**
         * 既にマスクを作っているかを確認
         * 作っている様であれば該当するクリッピングマスクのインスタンスを返す
         * 作っていなければNULLを返す
         * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのリスト
         * @param drawableMaskCounts 描画オブジェクトをマスクする描画オブジェクトの数
         * @return 該当するクリッピングマスクが存在すればインスタンスを返し、なければNULLを返す
         */
        findSameClip(drawableMasks, drawableMaskCounts) {
          for (let i = 0; i < this._clippingContextListForMask.getSize(); i++) {
            const clippingContext = this._clippingContextListForMask.at(i);
            const count = clippingContext._clippingIdCount;
            if (count != drawableMaskCounts) {
              continue;
            }
            let sameCount = 0;
            for (let j = 0; j < count; j++) {
              const clipId = clippingContext._clippingIdList[j];
              for (let k = 0; k < count; k++) {
                if (drawableMasks[k] == clipId) {
                  sameCount++;
                  break;
                }
              }
            }
            if (sameCount == count) {
              return clippingContext;
            }
          }
          return null;
        }
        /**
         * 高精細マスク処理用の行列を計算する
         * @param model モデルのインスタンス
         * @param isRightHanded 処理が右手系であるか
         */
        setupMatrixForHighPrecision(model, isRightHanded) {
          let usingClipCount = 0;
          for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
            const cc = this._clippingContextListForMask.at(clipIndex);
            this.calcClippedDrawTotalBounds(model, cc);
            if (cc._isUsing) {
              usingClipCount++;
            }
          }
          if (usingClipCount > 0) {
            this.setupLayoutBounds(0);
            if (this._clearedFrameBufferFlags.getSize() != this._renderTextureCount) {
              this._clearedFrameBufferFlags.clear();
              for (let i = 0; i < this._renderTextureCount; i++) {
                this._clearedFrameBufferFlags.pushBack(false);
              }
            } else {
              for (let i = 0; i < this._renderTextureCount; i++) {
                this._clearedFrameBufferFlags.set(i, false);
              }
            }
            for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
              const clipContext = this._clippingContextListForMask.at(clipIndex);
              const allClippedDrawRect = clipContext._allClippedDrawRect;
              const layoutBoundsOnTex01 = clipContext._layoutBounds;
              const margin = 0.05;
              let scaleX = 0;
              let scaleY = 0;
              const ppu = model.getPixelsPerUnit();
              const maskPixelSize = clipContext.getClippingManager().getClippingMaskBufferSize();
              const physicalMaskWidth = layoutBoundsOnTex01.width * maskPixelSize;
              const physicalMaskHeight = layoutBoundsOnTex01.height * maskPixelSize;
              this._tmpBoundsOnModel.setRect(allClippedDrawRect);
              if (this._tmpBoundsOnModel.width * ppu > physicalMaskWidth) {
                this._tmpBoundsOnModel.expand(allClippedDrawRect.width * margin, 0);
                scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
              } else {
                scaleX = ppu / physicalMaskWidth;
              }
              if (this._tmpBoundsOnModel.height * ppu > physicalMaskHeight) {
                this._tmpBoundsOnModel.expand(0, allClippedDrawRect.height * margin);
                scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
              } else {
                scaleY = ppu / physicalMaskHeight;
              }
              this.createMatrixForMask(isRightHanded, layoutBoundsOnTex01, scaleX, scaleY);
              clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
              clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
            }
          }
        }
        /**
         * マスク作成・描画用の行列を作成する。
         * @param isRightHanded 座標を右手系として扱うかを指定
         * @param layoutBoundsOnTex01 マスクを収める領域
         * @param scaleX 描画オブジェクトの伸縮率
         * @param scaleY 描画オブジェクトの伸縮率
         */
        createMatrixForMask(isRightHanded, layoutBoundsOnTex01, scaleX, scaleY) {
          this._tmpMatrix.loadIdentity();
          {
            this._tmpMatrix.translateRelative(-1, -1);
            this._tmpMatrix.scaleRelative(2, 2);
          }
          {
            this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
            this._tmpMatrix.scaleRelative(scaleX, scaleY);
            this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
          }
          this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray());
          this._tmpMatrix.loadIdentity();
          {
            this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y * (isRightHanded ? -1 : 1));
            this._tmpMatrix.scaleRelative(scaleX, scaleY * (isRightHanded ? -1 : 1));
            this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
          }
          this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
        }
        /**
         * クリッピングコンテキストを配置するレイアウト
         * 指定された数のレンダーテクスチャを極力いっぱいに使ってマスクをレイアウトする
         * マスクグループの数が4以下ならRGBA各チャンネルに一つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する。
         *
         * @param usingClipCount 配置するクリッピングコンテキストの数
         */
        setupLayoutBounds(usingClipCount) {
          const useClippingMaskMaxCount = this._renderTextureCount <= 1 ? ClippingMaskMaxCountOnDefault : ClippingMaskMaxCountOnMultiRenderTexture * this._renderTextureCount;
          if (usingClipCount <= 0 || usingClipCount > useClippingMaskMaxCount) {
            if (usingClipCount > useClippingMaskMaxCount) {
              (0, cubismdebug_1.CubismLogError)("not supported mask count : {0}\n[Details] render texture count : {1}, mask count : {2}", usingClipCount - useClippingMaskMaxCount, this._renderTextureCount, usingClipCount);
            }
            for (let index = 0; index < this._clippingContextListForMask.getSize(); index++) {
              const clipContext = this._clippingContextListForMask.at(index);
              clipContext._layoutChannelIndex = 0;
              clipContext._layoutBounds.x = 0;
              clipContext._layoutBounds.y = 0;
              clipContext._layoutBounds.width = 1;
              clipContext._layoutBounds.height = 1;
              clipContext._bufferIndex = 0;
            }
            return;
          }
          const layoutCountMaxValue = this._renderTextureCount <= 1 ? 9 : 8;
          let countPerSheetDiv = usingClipCount / this._renderTextureCount;
          const reduceLayoutTextureCount = usingClipCount % this._renderTextureCount;
          countPerSheetDiv = Math.ceil(countPerSheetDiv);
          let divCount = countPerSheetDiv / ColorChannelCount;
          const modCount = countPerSheetDiv % ColorChannelCount;
          divCount = ~~divCount;
          let curClipIndex = 0;
          for (let renderTextureIndex = 0; renderTextureIndex < this._renderTextureCount; renderTextureIndex++) {
            for (let channelIndex = 0; channelIndex < ColorChannelCount; channelIndex++) {
              let layoutCount = divCount + (channelIndex < modCount ? 1 : 0);
              const checkChannelIndex = modCount + (divCount < 1 ? -1 : 0);
              if (channelIndex == checkChannelIndex && reduceLayoutTextureCount > 0) {
                layoutCount -= !(renderTextureIndex < reduceLayoutTextureCount) ? 1 : 0;
              }
              if (layoutCount == 0) {
              } else if (layoutCount == 1) {
                const clipContext = this._clippingContextListForMask.at(curClipIndex++);
                clipContext._layoutChannelIndex = channelIndex;
                clipContext._layoutBounds.x = 0;
                clipContext._layoutBounds.y = 0;
                clipContext._layoutBounds.width = 1;
                clipContext._layoutBounds.height = 1;
                clipContext._bufferIndex = renderTextureIndex;
              } else if (layoutCount == 2) {
                for (let i = 0; i < layoutCount; i++) {
                  let xpos = i % 2;
                  xpos = ~~xpos;
                  const cc = this._clippingContextListForMask.at(curClipIndex++);
                  cc._layoutChannelIndex = channelIndex;
                  cc._layoutBounds.x = xpos * 0.5;
                  cc._layoutBounds.y = 0;
                  cc._layoutBounds.width = 0.5;
                  cc._layoutBounds.height = 1;
                  cc._bufferIndex = renderTextureIndex;
                }
              } else if (layoutCount <= 4) {
                for (let i = 0; i < layoutCount; i++) {
                  let xpos = i % 2;
                  let ypos = i / 2;
                  xpos = ~~xpos;
                  ypos = ~~ypos;
                  const cc = this._clippingContextListForMask.at(curClipIndex++);
                  cc._layoutChannelIndex = channelIndex;
                  cc._layoutBounds.x = xpos * 0.5;
                  cc._layoutBounds.y = ypos * 0.5;
                  cc._layoutBounds.width = 0.5;
                  cc._layoutBounds.height = 0.5;
                  cc._bufferIndex = renderTextureIndex;
                }
              } else if (layoutCount <= layoutCountMaxValue) {
                for (let i = 0; i < layoutCount; i++) {
                  let xpos = i % 3;
                  let ypos = i / 3;
                  xpos = ~~xpos;
                  ypos = ~~ypos;
                  const cc = this._clippingContextListForMask.at(curClipIndex++);
                  cc._layoutChannelIndex = channelIndex;
                  cc._layoutBounds.x = xpos / 3;
                  cc._layoutBounds.y = ypos / 3;
                  cc._layoutBounds.width = 1 / 3;
                  cc._layoutBounds.height = 1 / 3;
                  cc._bufferIndex = renderTextureIndex;
                }
              } else {
                (0, cubismdebug_1.CubismLogError)("not supported mask count : {0}\n[Details] render texture count : {1}, mask count : {2}", usingClipCount - useClippingMaskMaxCount, this._renderTextureCount, usingClipCount);
                for (let index = 0; index < layoutCount; index++) {
                  const cc = this._clippingContextListForMask.at(curClipIndex++);
                  cc._layoutChannelIndex = 0;
                  cc._layoutBounds.x = 0;
                  cc._layoutBounds.y = 0;
                  cc._layoutBounds.width = 1;
                  cc._layoutBounds.height = 1;
                  cc._bufferIndex = 0;
                }
              }
            }
          }
        }
        /**
         * マスクされる描画オブジェクト群全体を囲む矩形（モデル座標系）を計算する
         * @param model モデルのインスタンス
         * @param clippingContext クリッピングマスクのコンテキスト
         */
        calcClippedDrawTotalBounds(model, clippingContext) {
          let clippedDrawTotalMinX = Number.MAX_VALUE;
          let clippedDrawTotalMinY = Number.MAX_VALUE;
          let clippedDrawTotalMaxX = Number.MIN_VALUE;
          let clippedDrawTotalMaxY = Number.MIN_VALUE;
          const clippedDrawCount = clippingContext._clippedDrawableIndexList.length;
          for (let clippedDrawableIndex = 0; clippedDrawableIndex < clippedDrawCount; clippedDrawableIndex++) {
            const drawableIndex = clippingContext._clippedDrawableIndexList[clippedDrawableIndex];
            const drawableVertexCount = model.getDrawableVertexCount(drawableIndex);
            const drawableVertexes = model.getDrawableVertices(drawableIndex);
            let minX = Number.MAX_VALUE;
            let minY = Number.MAX_VALUE;
            let maxX = -Number.MAX_VALUE;
            let maxY = -Number.MAX_VALUE;
            const loop = drawableVertexCount * live2dcubismframework_1.Constant.vertexStep;
            for (let pi = live2dcubismframework_1.Constant.vertexOffset; pi < loop; pi += live2dcubismframework_1.Constant.vertexStep) {
              const x = drawableVertexes[pi];
              const y = drawableVertexes[pi + 1];
              if (x < minX) {
                minX = x;
              }
              if (x > maxX) {
                maxX = x;
              }
              if (y < minY) {
                minY = y;
              }
              if (y > maxY) {
                maxY = y;
              }
            }
            if (minX == Number.MAX_VALUE) {
              continue;
            }
            if (minX < clippedDrawTotalMinX) {
              clippedDrawTotalMinX = minX;
            }
            if (minY < clippedDrawTotalMinY) {
              clippedDrawTotalMinY = minY;
            }
            if (maxX > clippedDrawTotalMaxX) {
              clippedDrawTotalMaxX = maxX;
            }
            if (maxY > clippedDrawTotalMaxY) {
              clippedDrawTotalMaxY = maxY;
            }
            if (clippedDrawTotalMinX == Number.MAX_VALUE) {
              clippingContext._allClippedDrawRect.x = 0;
              clippingContext._allClippedDrawRect.y = 0;
              clippingContext._allClippedDrawRect.width = 0;
              clippingContext._allClippedDrawRect.height = 0;
              clippingContext._isUsing = false;
            } else {
              clippingContext._isUsing = true;
              const w = clippedDrawTotalMaxX - clippedDrawTotalMinX;
              const h = clippedDrawTotalMaxY - clippedDrawTotalMinY;
              clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
              clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
              clippingContext._allClippedDrawRect.width = w;
              clippingContext._allClippedDrawRect.height = h;
            }
          }
        }
        /**
         * 画面描画に使用するクリッピングマスクのリストを取得する
         * @return 画面描画に使用するクリッピングマスクのリスト
         */
        getClippingContextListForDraw() {
          return this._clippingContextListForDraw;
        }
        /**
         * クリッピングマスクバッファのサイズを取得する
         * @return クリッピングマスクバッファのサイズ
         */
        getClippingMaskBufferSize() {
          return this._clippingMaskBufferSize;
        }
        /**
         * このバッファのレンダーテクスチャの枚数を取得する
         * @return このバッファのレンダーテクスチャの枚数
         */
        getRenderTextureCount() {
          return this._renderTextureCount;
        }
        /**
         * カラーチャンネル（RGBA）のフラグを取得する
         * @param channelNo カラーチャンネル（RGBA）の番号（0:R, 1:G, 2:B, 3:A）
         */
        getChannelFlagAsColor(channelNo) {
          return this._channelColors.at(channelNo);
        }
        /**
         * クリッピングマスクバッファのサイズを設定する
         * @param size クリッピングマスクバッファのサイズ
         */
        setClippingMaskBufferSize(size) {
          this._clippingMaskBufferSize = size;
        }
      };
      exports.CubismClippingManager = CubismClippingManager;
    }
  });

  // node_modules/live2d-renderer/build/framework/src/rendering/cubismshader_webgl.js
  var require_cubismshader_webgl = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/rendering/cubismshader_webgl.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.fragmentShaderSrcMaskInvertedPremultipliedAlpha = exports.fragmentShaderSrcMaskPremultipliedAlpha = exports.fragmentShaderSrcPremultipliedAlpha = exports.vertexShaderSrcMasked = exports.vertexShaderSrc = exports.fragmentShaderSrcsetupMask = exports.vertexShaderSrcSetupMask = exports.ShaderNames = exports.CubismShaderSet = exports.CubismShaderManager_WebGL = exports.CubismShader_WebGL = void 0;
      var csmmap_1 = require_csmmap();
      var csmvector_1 = require_csmvector();
      var cubismdebug_1 = require_cubismdebug();
      var cubismrenderer_1 = require_cubismrenderer();
      var s_instance;
      var ShaderCount = 10;
      var CubismShader_WebGL = class {
        /**
         * コンストラクタ
         */
        constructor() {
          this._shaderSets = new csmvector_1.csmVector();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          this.releaseShaderProgram();
        }
        /**
         * 描画用のシェーダプログラムの一連のセットアップを実行する
         * @param renderer レンダラー
         * @param model 描画対象のモデル
         * @param index 描画対象のメッシュのインデックス
         */
        setupShaderProgramForDraw(renderer, model, index) {
          if (!renderer.isPremultipliedAlpha()) {
            (0, cubismdebug_1.CubismLogError)("NoPremultipliedAlpha is not allowed");
          }
          if (this._shaderSets.getSize() == 0) {
            this.generateShaders();
          }
          let srcColor;
          let dstColor;
          let srcAlpha;
          let dstAlpha;
          const masked = renderer.getClippingContextBufferForDraw() != null;
          const invertedMask = model.getDrawableInvertedMaskBit(index);
          const offset = masked ? invertedMask ? 2 : 1 : 0;
          let shaderSet;
          switch (model.getDrawableBlendMode(index)) {
            case cubismrenderer_1.CubismBlendMode.CubismBlendMode_Normal:
            default:
              shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_NormalPremultipliedAlpha + offset);
              srcColor = this.gl.ONE;
              dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
              srcAlpha = this.gl.ONE;
              dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
              break;
            case cubismrenderer_1.CubismBlendMode.CubismBlendMode_Additive:
              shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_AddPremultipliedAlpha + offset);
              srcColor = this.gl.ONE;
              dstColor = this.gl.ONE;
              srcAlpha = this.gl.ZERO;
              dstAlpha = this.gl.ONE;
              break;
            case cubismrenderer_1.CubismBlendMode.CubismBlendMode_Multiplicative:
              shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_MultPremultipliedAlpha + offset);
              srcColor = this.gl.DST_COLOR;
              dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
              srcAlpha = this.gl.ZERO;
              dstAlpha = this.gl.ONE;
              break;
          }
          this.gl.useProgram(shaderSet.shaderProgram);
          if (renderer._bufferData.vertex == null) {
            renderer._bufferData.vertex = this.gl.createBuffer();
          }
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.vertex);
          const vertexArray = model.getDrawableVertices(index);
          this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
          this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
          this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
          if (renderer._bufferData.uv == null) {
            renderer._bufferData.uv = this.gl.createBuffer();
          }
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
          const uvArray = model.getDrawableVertexUvs(index);
          this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
          this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
          this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
          if (masked) {
            this.gl.activeTexture(this.gl.TEXTURE1);
            const tex = renderer.getClippingContextBufferForDraw().getClippingManager().getColorBuffer().at(renderer.getClippingContextBufferForDraw()._bufferIndex);
            this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
            this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);
            this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForDraw()._matrixForDraw.getArray());
            const channelIndex = renderer.getClippingContextBufferForDraw()._layoutChannelIndex;
            const colorChannel = renderer.getClippingContextBufferForDraw().getClippingManager().getChannelFlagAsColor(channelIndex);
            this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.r, colorChannel.g, colorChannel.b, colorChannel.a);
          }
          const textureNo = model.getDrawableTextureIndex(index);
          const textureId = renderer.getBindedTextures().getValue(textureNo);
          this.gl.activeTexture(this.gl.TEXTURE0);
          this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
          this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
          const matrix4x4 = renderer.getMvpMatrix();
          this.gl.uniformMatrix4fv(shaderSet.uniformMatrixLocation, false, matrix4x4.getArray());
          const baseColor = renderer.getModelColorWithOpacity(model.getDrawableOpacity(index));
          const multiplyColor = model.getMultiplyColor(index);
          const screenColor = model.getScreenColor(index);
          this.gl.uniform4f(shaderSet.uniformBaseColorLocation, baseColor.r, baseColor.g, baseColor.b, baseColor.a);
          this.gl.uniform4f(shaderSet.uniformMultiplyColorLocation, multiplyColor.r, multiplyColor.g, multiplyColor.b, multiplyColor.a);
          this.gl.uniform4f(shaderSet.uniformScreenColorLocation, screenColor.r, screenColor.g, screenColor.b, screenColor.a);
          if (renderer._bufferData.index == null) {
            renderer._bufferData.index = this.gl.createBuffer();
          }
          const indexArray = model.getDrawableVertexIndices(index);
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, renderer._bufferData.index);
          this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.DYNAMIC_DRAW);
          this.gl.blendFuncSeparate(srcColor, dstColor, srcAlpha, dstAlpha);
        }
        /**
         * マスク用のシェーダプログラムの一連のセットアップを実行する
         * @param renderer レンダラー
         * @param model 描画対象のモデル
         * @param index 描画対象のメッシュのインデックス
         */
        setupShaderProgramForMask(renderer, model, index) {
          if (!renderer.isPremultipliedAlpha()) {
            (0, cubismdebug_1.CubismLogError)("NoPremultipliedAlpha is not allowed");
          }
          if (this._shaderSets.getSize() == 0) {
            this.generateShaders();
          }
          const shaderSet = this._shaderSets.at(ShaderNames.ShaderNames_SetupMask);
          this.gl.useProgram(shaderSet.shaderProgram);
          if (renderer._bufferData.vertex == null) {
            renderer._bufferData.vertex = this.gl.createBuffer();
          }
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.vertex);
          const vertexArray = model.getDrawableVertices(index);
          this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
          this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
          this.gl.vertexAttribPointer(shaderSet.attributePositionLocation, 2, this.gl.FLOAT, false, 0, 0);
          if (renderer._bufferData.uv == null) {
            renderer._bufferData.uv = this.gl.createBuffer();
          }
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
          const textureNo = model.getDrawableTextureIndex(index);
          const textureId = renderer.getBindedTextures().getValue(textureNo);
          this.gl.activeTexture(this.gl.TEXTURE0);
          this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
          this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
          if (renderer._bufferData.uv == null) {
            renderer._bufferData.uv = this.gl.createBuffer();
          }
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
          const uvArray = model.getDrawableVertexUvs(index);
          this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
          this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
          this.gl.vertexAttribPointer(shaderSet.attributeTexCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
          const context = renderer.getClippingContextBufferForMask();
          const channelIndex = renderer.getClippingContextBufferForMask()._layoutChannelIndex;
          const colorChannel = renderer.getClippingContextBufferForMask().getClippingManager().getChannelFlagAsColor(channelIndex);
          this.gl.uniform4f(shaderSet.uniformChannelFlagLocation, colorChannel.r, colorChannel.g, colorChannel.b, colorChannel.a);
          this.gl.uniformMatrix4fv(shaderSet.uniformClipMatrixLocation, false, renderer.getClippingContextBufferForMask()._matrixForMask.getArray());
          const rect = renderer.getClippingContextBufferForMask()._layoutBounds;
          this.gl.uniform4f(shaderSet.uniformBaseColorLocation, rect.x * 2 - 1, rect.y * 2 - 1, rect.getRight() * 2 - 1, rect.getBottom() * 2 - 1);
          const multiplyColor = model.getMultiplyColor(index);
          const screenColor = model.getScreenColor(index);
          this.gl.uniform4f(shaderSet.uniformMultiplyColorLocation, multiplyColor.r, multiplyColor.g, multiplyColor.b, multiplyColor.a);
          this.gl.uniform4f(shaderSet.uniformScreenColorLocation, screenColor.r, screenColor.g, screenColor.b, screenColor.a);
          const srcColor = this.gl.ZERO;
          const dstColor = this.gl.ONE_MINUS_SRC_COLOR;
          const srcAlpha = this.gl.ZERO;
          const dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
          if (renderer._bufferData.index == null) {
            renderer._bufferData.index = this.gl.createBuffer();
          }
          const indexArray = model.getDrawableVertexIndices(index);
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, renderer._bufferData.index);
          this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.DYNAMIC_DRAW);
          this.gl.blendFuncSeparate(srcColor, dstColor, srcAlpha, dstAlpha);
        }
        /**
         * シェーダープログラムを解放する
         */
        releaseShaderProgram() {
          for (let i = 0; i < this._shaderSets.getSize(); i++) {
            this.gl.deleteProgram(this._shaderSets.at(i).shaderProgram);
            this._shaderSets.at(i).shaderProgram = 0;
            this._shaderSets.set(i, void 0);
            this._shaderSets.set(i, null);
          }
        }
        /**
         * シェーダープログラムを初期化する
         * @param vertShaderSrc 頂点シェーダのソース
         * @param fragShaderSrc フラグメントシェーダのソース
         */
        generateShaders() {
          for (let i = 0; i < ShaderCount; i++) {
            this._shaderSets.pushBack(new CubismShaderSet());
          }
          this._shaderSets.at(0).shaderProgram = this.loadShaderProgram(exports.vertexShaderSrcSetupMask, exports.fragmentShaderSrcsetupMask);
          this._shaderSets.at(1).shaderProgram = this.loadShaderProgram(exports.vertexShaderSrc, exports.fragmentShaderSrcPremultipliedAlpha);
          this._shaderSets.at(2).shaderProgram = this.loadShaderProgram(exports.vertexShaderSrcMasked, exports.fragmentShaderSrcMaskPremultipliedAlpha);
          this._shaderSets.at(3).shaderProgram = this.loadShaderProgram(exports.vertexShaderSrcMasked, exports.fragmentShaderSrcMaskInvertedPremultipliedAlpha);
          this._shaderSets.at(4).shaderProgram = this._shaderSets.at(1).shaderProgram;
          this._shaderSets.at(5).shaderProgram = this._shaderSets.at(2).shaderProgram;
          this._shaderSets.at(6).shaderProgram = this._shaderSets.at(3).shaderProgram;
          this._shaderSets.at(7).shaderProgram = this._shaderSets.at(1).shaderProgram;
          this._shaderSets.at(8).shaderProgram = this._shaderSets.at(2).shaderProgram;
          this._shaderSets.at(9).shaderProgram = this._shaderSets.at(3).shaderProgram;
          this._shaderSets.at(0).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, "a_position");
          this._shaderSets.at(0).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(0).shaderProgram, "a_texCoord");
          this._shaderSets.at(0).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, "s_texture0");
          this._shaderSets.at(0).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, "u_clipMatrix");
          this._shaderSets.at(0).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, "u_channelFlag");
          this._shaderSets.at(0).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, "u_baseColor");
          this._shaderSets.at(0).uniformMultiplyColorLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, "u_multiplyColor");
          this._shaderSets.at(0).uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets.at(0).shaderProgram, "u_screenColor");
          this._shaderSets.at(1).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, "a_position");
          this._shaderSets.at(1).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(1).shaderProgram, "a_texCoord");
          this._shaderSets.at(1).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, "s_texture0");
          this._shaderSets.at(1).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, "u_matrix");
          this._shaderSets.at(1).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, "u_baseColor");
          this._shaderSets.at(1).uniformMultiplyColorLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, "u_multiplyColor");
          this._shaderSets.at(1).uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets.at(1).shaderProgram, "u_screenColor");
          this._shaderSets.at(2).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, "a_position");
          this._shaderSets.at(2).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(2).shaderProgram, "a_texCoord");
          this._shaderSets.at(2).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "s_texture0");
          this._shaderSets.at(2).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "s_texture1");
          this._shaderSets.at(2).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "u_matrix");
          this._shaderSets.at(2).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "u_clipMatrix");
          this._shaderSets.at(2).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "u_channelFlag");
          this._shaderSets.at(2).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "u_baseColor");
          this._shaderSets.at(2).uniformMultiplyColorLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "u_multiplyColor");
          this._shaderSets.at(2).uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets.at(2).shaderProgram, "u_screenColor");
          this._shaderSets.at(3).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, "a_position");
          this._shaderSets.at(3).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(3).shaderProgram, "a_texCoord");
          this._shaderSets.at(3).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "s_texture0");
          this._shaderSets.at(3).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "s_texture1");
          this._shaderSets.at(3).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "u_matrix");
          this._shaderSets.at(3).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "u_clipMatrix");
          this._shaderSets.at(3).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "u_channelFlag");
          this._shaderSets.at(3).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "u_baseColor");
          this._shaderSets.at(3).uniformMultiplyColorLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "u_multiplyColor");
          this._shaderSets.at(3).uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets.at(3).shaderProgram, "u_screenColor");
          this._shaderSets.at(4).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, "a_position");
          this._shaderSets.at(4).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(4).shaderProgram, "a_texCoord");
          this._shaderSets.at(4).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, "s_texture0");
          this._shaderSets.at(4).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, "u_matrix");
          this._shaderSets.at(4).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, "u_baseColor");
          this._shaderSets.at(4).uniformMultiplyColorLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, "u_multiplyColor");
          this._shaderSets.at(4).uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets.at(4).shaderProgram, "u_screenColor");
          this._shaderSets.at(5).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, "a_position");
          this._shaderSets.at(5).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(5).shaderProgram, "a_texCoord");
          this._shaderSets.at(5).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "s_texture0");
          this._shaderSets.at(5).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "s_texture1");
          this._shaderSets.at(5).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "u_matrix");
          this._shaderSets.at(5).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "u_clipMatrix");
          this._shaderSets.at(5).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "u_channelFlag");
          this._shaderSets.at(5).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "u_baseColor");
          this._shaderSets.at(5).uniformMultiplyColorLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "u_multiplyColor");
          this._shaderSets.at(5).uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets.at(5).shaderProgram, "u_screenColor");
          this._shaderSets.at(6).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, "a_position");
          this._shaderSets.at(6).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(6).shaderProgram, "a_texCoord");
          this._shaderSets.at(6).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "s_texture0");
          this._shaderSets.at(6).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "s_texture1");
          this._shaderSets.at(6).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "u_matrix");
          this._shaderSets.at(6).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "u_clipMatrix");
          this._shaderSets.at(6).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "u_channelFlag");
          this._shaderSets.at(6).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "u_baseColor");
          this._shaderSets.at(6).uniformMultiplyColorLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "u_multiplyColor");
          this._shaderSets.at(6).uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets.at(6).shaderProgram, "u_screenColor");
          this._shaderSets.at(7).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(7).shaderProgram, "a_position");
          this._shaderSets.at(7).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(7).shaderProgram, "a_texCoord");
          this._shaderSets.at(7).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, "s_texture0");
          this._shaderSets.at(7).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, "u_matrix");
          this._shaderSets.at(7).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, "u_baseColor");
          this._shaderSets.at(7).uniformMultiplyColorLocation = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, "u_multiplyColor");
          this._shaderSets.at(7).uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets.at(7).shaderProgram, "u_screenColor");
          this._shaderSets.at(8).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(8).shaderProgram, "a_position");
          this._shaderSets.at(8).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(8).shaderProgram, "a_texCoord");
          this._shaderSets.at(8).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "s_texture0");
          this._shaderSets.at(8).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "s_texture1");
          this._shaderSets.at(8).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "u_matrix");
          this._shaderSets.at(8).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "u_clipMatrix");
          this._shaderSets.at(8).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "u_channelFlag");
          this._shaderSets.at(8).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "u_baseColor");
          this._shaderSets.at(8).uniformMultiplyColorLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "u_multiplyColor");
          this._shaderSets.at(8).uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets.at(8).shaderProgram, "u_screenColor");
          this._shaderSets.at(9).attributePositionLocation = this.gl.getAttribLocation(this._shaderSets.at(9).shaderProgram, "a_position");
          this._shaderSets.at(9).attributeTexCoordLocation = this.gl.getAttribLocation(this._shaderSets.at(9).shaderProgram, "a_texCoord");
          this._shaderSets.at(9).samplerTexture0Location = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "s_texture0");
          this._shaderSets.at(9).samplerTexture1Location = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "s_texture1");
          this._shaderSets.at(9).uniformMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "u_matrix");
          this._shaderSets.at(9).uniformClipMatrixLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "u_clipMatrix");
          this._shaderSets.at(9).uniformChannelFlagLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "u_channelFlag");
          this._shaderSets.at(9).uniformBaseColorLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "u_baseColor");
          this._shaderSets.at(9).uniformMultiplyColorLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "u_multiplyColor");
          this._shaderSets.at(9).uniformScreenColorLocation = this.gl.getUniformLocation(this._shaderSets.at(9).shaderProgram, "u_screenColor");
        }
        /**
         * シェーダプログラムをロードしてアドレスを返す
         * @param vertexShaderSource    頂点シェーダのソース
         * @param fragmentShaderSource  フラグメントシェーダのソース
         * @return シェーダプログラムのアドレス
         */
        loadShaderProgram(vertexShaderSource, fragmentShaderSource) {
          let shaderProgram = this.gl.createProgram();
          let vertShader = this.compileShaderSource(this.gl.VERTEX_SHADER, vertexShaderSource);
          if (!vertShader) {
            (0, cubismdebug_1.CubismLogError)("Vertex shader compile error!");
            return 0;
          }
          let fragShader = this.compileShaderSource(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
          if (!fragShader) {
            (0, cubismdebug_1.CubismLogError)("Vertex shader compile error!");
            return 0;
          }
          this.gl.attachShader(shaderProgram, vertShader);
          this.gl.attachShader(shaderProgram, fragShader);
          this.gl.linkProgram(shaderProgram);
          const linkStatus = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
          if (!linkStatus) {
            (0, cubismdebug_1.CubismLogError)("Failed to link program: {0}", shaderProgram);
            this.gl.deleteShader(vertShader);
            vertShader = 0;
            this.gl.deleteShader(fragShader);
            fragShader = 0;
            if (shaderProgram) {
              this.gl.deleteProgram(shaderProgram);
              shaderProgram = 0;
            }
            return 0;
          }
          this.gl.deleteShader(vertShader);
          this.gl.deleteShader(fragShader);
          return shaderProgram;
        }
        /**
         * シェーダープログラムをコンパイルする
         * @param shaderType シェーダタイプ(Vertex/Fragment)
         * @param shaderSource シェーダソースコード
         *
         * @return コンパイルされたシェーダープログラム
         */
        compileShaderSource(shaderType, shaderSource) {
          const source = shaderSource;
          const shader = this.gl.createShader(shaderType);
          this.gl.shaderSource(shader, source);
          this.gl.compileShader(shader);
          if (!shader) {
            const log = this.gl.getShaderInfoLog(shader);
            (0, cubismdebug_1.CubismLogError)("Shader compile log: {0} ", log);
          }
          const status = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
          if (!status) {
            this.gl.deleteShader(shader);
            return null;
          }
          return shader;
        }
        setGl(gl) {
          this.gl = gl;
        }
      };
      exports.CubismShader_WebGL = CubismShader_WebGL;
      var CubismShaderManager_WebGL = class _CubismShaderManager_WebGL {
        /**
         * インスタンスを取得する（シングルトン）
         * @return インスタンス
         */
        static getInstance() {
          if (s_instance == null) {
            s_instance = new _CubismShaderManager_WebGL();
          }
          return s_instance;
        }
        /**
         * インスタンスを開放する（シングルトン）
         */
        static deleteInstance() {
          if (s_instance) {
            s_instance.release();
            s_instance = null;
          }
        }
        /**
         * Privateなコンストラクタ
         */
        constructor() {
          this._shaderMap = new csmmap_1.csmMap();
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          for (const ite = this._shaderMap.begin(); ite.notEqual(this._shaderMap.end()); ite.preIncrement()) {
            ite.ptr().second.release();
          }
          this._shaderMap.clear();
        }
        /**
         * GLContextをキーにShaderを取得する
         * @param gl
         * @returns
         */
        getShader(gl) {
          return this._shaderMap.getValue(gl);
        }
        /**
         * GLContextを登録する
         * @param gl
         */
        setGlContext(gl) {
          if (!this._shaderMap.isExist(gl)) {
            const instance = new CubismShader_WebGL();
            instance.setGl(gl);
            this._shaderMap.setValue(gl, instance);
          }
        }
      };
      exports.CubismShaderManager_WebGL = CubismShaderManager_WebGL;
      var CubismShaderSet = class {
      };
      exports.CubismShaderSet = CubismShaderSet;
      var ShaderNames;
      (function(ShaderNames2) {
        ShaderNames2[ShaderNames2["ShaderNames_SetupMask"] = 0] = "ShaderNames_SetupMask";
        ShaderNames2[ShaderNames2["ShaderNames_NormalPremultipliedAlpha"] = 1] = "ShaderNames_NormalPremultipliedAlpha";
        ShaderNames2[ShaderNames2["ShaderNames_NormalMaskedPremultipliedAlpha"] = 2] = "ShaderNames_NormalMaskedPremultipliedAlpha";
        ShaderNames2[ShaderNames2["ShaderNames_NomralMaskedInvertedPremultipliedAlpha"] = 3] = "ShaderNames_NomralMaskedInvertedPremultipliedAlpha";
        ShaderNames2[ShaderNames2["ShaderNames_AddPremultipliedAlpha"] = 4] = "ShaderNames_AddPremultipliedAlpha";
        ShaderNames2[ShaderNames2["ShaderNames_AddMaskedPremultipliedAlpha"] = 5] = "ShaderNames_AddMaskedPremultipliedAlpha";
        ShaderNames2[ShaderNames2["ShaderNames_AddMaskedPremultipliedAlphaInverted"] = 6] = "ShaderNames_AddMaskedPremultipliedAlphaInverted";
        ShaderNames2[ShaderNames2["ShaderNames_MultPremultipliedAlpha"] = 7] = "ShaderNames_MultPremultipliedAlpha";
        ShaderNames2[ShaderNames2["ShaderNames_MultMaskedPremultipliedAlpha"] = 8] = "ShaderNames_MultMaskedPremultipliedAlpha";
        ShaderNames2[ShaderNames2["ShaderNames_MultMaskedPremultipliedAlphaInverted"] = 9] = "ShaderNames_MultMaskedPremultipliedAlphaInverted";
      })(ShaderNames || (exports.ShaderNames = ShaderNames = {}));
      exports.vertexShaderSrcSetupMask = "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_myPos;uniform mat4       u_clipMatrix;void main(){   gl_Position = u_clipMatrix * a_position;   v_myPos = u_clipMatrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}";
      exports.fragmentShaderSrcsetupMask = "precision mediump float;varying vec2       v_texCoord;varying vec4       v_myPos;uniform vec4       u_baseColor;uniform vec4       u_channelFlag;uniform sampler2D  s_texture0;void main(){   float isInside =        step(u_baseColor.x, v_myPos.x/v_myPos.w)       * step(u_baseColor.y, v_myPos.y/v_myPos.w)       * step(v_myPos.x/v_myPos.w, u_baseColor.z)       * step(v_myPos.y/v_myPos.w, u_baseColor.w);   gl_FragColor = u_channelFlag * texture2D(s_texture0, v_texCoord).a * isInside;}";
      exports.vertexShaderSrc = "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;uniform mat4       u_matrix;void main(){   gl_Position = u_matrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}";
      exports.vertexShaderSrcMasked = "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_clipPos;uniform mat4       u_matrix;uniform mat4       u_clipMatrix;void main(){   gl_Position = u_matrix * a_position;   v_clipPos = u_clipMatrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}";
      exports.fragmentShaderSrcPremultipliedAlpha = "precision mediump float;varying vec2       v_texCoord;uniform vec4       u_baseColor;uniform sampler2D  s_texture0;uniform vec4       u_multiplyColor;uniform vec4       u_screenColor;void main(){   vec4 texColor = texture2D(s_texture0, v_texCoord);   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);   vec4 color = texColor * u_baseColor;   gl_FragColor = vec4(color.rgb, color.a);}";
      exports.fragmentShaderSrcMaskPremultipliedAlpha = "precision mediump float;varying vec2       v_texCoord;varying vec4       v_clipPos;uniform vec4       u_baseColor;uniform vec4       u_channelFlag;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;uniform vec4       u_multiplyColor;uniform vec4       u_screenColor;void main(){   vec4 texColor = texture2D(s_texture0, v_texCoord);   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);   vec4 col_formask = texColor * u_baseColor;   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;   col_formask = col_formask * maskVal;   gl_FragColor = col_formask;}";
      exports.fragmentShaderSrcMaskInvertedPremultipliedAlpha = "precision mediump float;varying vec2      v_texCoord;varying vec4      v_clipPos;uniform sampler2D s_texture0;uniform sampler2D s_texture1;uniform vec4      u_channelFlag;uniform vec4      u_baseColor;uniform vec4      u_multiplyColor;uniform vec4      u_screenColor;void main(){   vec4 texColor = texture2D(s_texture0, v_texCoord);   texColor.rgb = texColor.rgb * u_multiplyColor.rgb;   texColor.rgb = (texColor.rgb + u_screenColor.rgb * texColor.a) - (texColor.rgb * u_screenColor.rgb);   vec4 col_formask = texColor * u_baseColor;   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;   col_formask = col_formask * (1.0 - maskVal);   gl_FragColor = col_formask;}";
      var $ = __importStar(require_cubismshader_webgl());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismShaderSet = $.CubismShaderSet;
        Live2DCubismFramework2.CubismShader_WebGL = $.CubismShader_WebGL;
        Live2DCubismFramework2.CubismShaderManager_WebGL = $.CubismShaderManager_WebGL;
        Live2DCubismFramework2.ShaderNames = $.ShaderNames;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/rendering/cubismrenderer_webgl.js
  var require_cubismrenderer_webgl = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/rendering/cubismrenderer_webgl.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismRenderer_WebGL = exports.CubismRendererProfile_WebGL = exports.CubismClippingContext_WebGL = exports.CubismRenderTextureResource = exports.CubismClippingManager_WebGL = void 0;
      var csmmap_1 = require_csmmap();
      var csmvector_1 = require_csmvector();
      var cubismdebug_1 = require_cubismdebug();
      var cubismclippingmanager_1 = require_cubismclippingmanager();
      var cubismrenderer_1 = require_cubismrenderer();
      var cubismshader_webgl_1 = require_cubismshader_webgl();
      var s_viewport;
      var s_fbo;
      var CubismClippingManager_WebGL = class extends cubismclippingmanager_1.CubismClippingManager {
        /**
         * テンポラリのレンダーテクスチャのアドレスを取得する
         * FrameBufferObjectが存在しない場合、新しく生成する
         *
         * @return レンダーテクスチャの配列
         */
        getMaskRenderTexture() {
          if (this._maskTexture && this._maskTexture.textures != null) {
            this._maskTexture.frameNo = this._currentFrameNo;
          } else {
            if (this._maskRenderTextures != null) {
              this._maskRenderTextures.clear();
            }
            this._maskRenderTextures = new csmvector_1.csmVector();
            if (this._maskColorBuffers != null) {
              this._maskColorBuffers.clear();
            }
            this._maskColorBuffers = new csmvector_1.csmVector();
            const size = this._clippingMaskBufferSize;
            for (let index = 0; index < this._renderTextureCount; index++) {
              this._maskColorBuffers.pushBack(this.gl.createTexture());
              this.gl.bindTexture(this.gl.TEXTURE_2D, this._maskColorBuffers.at(index));
              this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, size, size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
              this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
              this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
              this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
              this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
              this.gl.bindTexture(this.gl.TEXTURE_2D, null);
              this._maskRenderTextures.pushBack(this.gl.createFramebuffer());
              this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._maskRenderTextures.at(index));
              this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this._maskColorBuffers.at(index), 0);
            }
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);
            this._maskTexture = new CubismRenderTextureResource(this._currentFrameNo, this._maskRenderTextures);
          }
          return this._maskTexture.textures;
        }
        /**
         * WebGLレンダリングコンテキストを設定する
         * @param gl WebGLレンダリングコンテキスト
         */
        setGL(gl) {
          this.gl = gl;
        }
        /**
         * コンストラクタ
         */
        constructor() {
          super(CubismClippingContext_WebGL);
        }
        /**
         * クリッピングコンテキストを作成する。モデル描画時に実行する。
         * @param model モデルのインスタンス
         * @param renderer レンダラのインスタンス
         */
        setupClippingContext(model, renderer) {
          this._currentFrameNo++;
          let usingClipCount = 0;
          for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
            const cc = this._clippingContextListForMask.at(clipIndex);
            this.calcClippedDrawTotalBounds(model, cc);
            if (cc._isUsing) {
              usingClipCount++;
            }
          }
          if (usingClipCount > 0) {
            this.gl.viewport(0, 0, this._clippingMaskBufferSize, this._clippingMaskBufferSize);
            this._currentMaskRenderTexture = this.getMaskRenderTexture().at(0);
            renderer.preDraw();
            this.setupLayoutBounds(usingClipCount);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._currentMaskRenderTexture);
            if (this._clearedFrameBufferFlags.getSize() != this._renderTextureCount) {
              this._clearedFrameBufferFlags.clear();
              this._clearedFrameBufferFlags = new csmvector_1.csmVector(this._renderTextureCount);
            }
            for (let index = 0; index < this._clearedFrameBufferFlags.getSize(); index++) {
              this._clearedFrameBufferFlags.set(index, false);
            }
            for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.getSize(); clipIndex++) {
              const clipContext = this._clippingContextListForMask.at(clipIndex);
              const allClipedDrawRect = clipContext._allClippedDrawRect;
              const layoutBoundsOnTex01 = clipContext._layoutBounds;
              const margin = 0.05;
              let scaleX = 0;
              let scaleY = 0;
              const clipContextRenderTexture = this.getMaskRenderTexture().at(clipContext._bufferIndex);
              if (this._currentMaskRenderTexture != clipContextRenderTexture) {
                this._currentMaskRenderTexture = clipContextRenderTexture;
                renderer.preDraw();
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._currentMaskRenderTexture);
              }
              this._tmpBoundsOnModel.setRect(allClipedDrawRect);
              this._tmpBoundsOnModel.expand(allClipedDrawRect.width * margin, allClipedDrawRect.height * margin);
              scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
              scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
              {
                this._tmpMatrix.loadIdentity();
                {
                  this._tmpMatrix.translateRelative(-1, -1);
                  this._tmpMatrix.scaleRelative(2, 2);
                }
                {
                  this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                  this._tmpMatrix.scaleRelative(scaleX, scaleY);
                  this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                }
                this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray());
              }
              {
                this._tmpMatrix.loadIdentity();
                {
                  this._tmpMatrix.translateRelative(layoutBoundsOnTex01.x, layoutBoundsOnTex01.y);
                  this._tmpMatrix.scaleRelative(scaleX, scaleY);
                  this._tmpMatrix.translateRelative(-this._tmpBoundsOnModel.x, -this._tmpBoundsOnModel.y);
                }
                this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
              }
              clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
              clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
              const clipDrawCount = clipContext._clippingIdCount;
              for (let i = 0; i < clipDrawCount; i++) {
                const clipDrawIndex = clipContext._clippingIdList[i];
                if (!model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                  continue;
                }
                renderer.setIsCulling(model.getDrawableCulling(clipDrawIndex) != false);
                if (!this._clearedFrameBufferFlags.at(clipContext._bufferIndex)) {
                  this.gl.clearColor(1, 1, 1, 1);
                  this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                  this._clearedFrameBufferFlags.set(clipContext._bufferIndex, true);
                }
                renderer.setClippingContextBufferForMask(clipContext);
                renderer.drawMeshWebGL(model, clipDrawIndex);
              }
            }
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);
            renderer.setClippingContextBufferForMask(null);
            this.gl.viewport(s_viewport[0], s_viewport[1], s_viewport[2], s_viewport[3]);
          }
        }
        /**
         * カラーバッファを取得する
         * @return カラーバッファ
         */
        getColorBuffer() {
          return this._maskColorBuffers;
        }
        /**
         * マスクの合計数をカウント
         * @returns
         */
        getClippingMaskCount() {
          return this._clippingContextListForMask.getSize();
        }
      };
      exports.CubismClippingManager_WebGL = CubismClippingManager_WebGL;
      var CubismRenderTextureResource = class {
        /**
         * 引数付きコンストラクタ
         * @param frameNo レンダラーのフレーム番号
         * @param texture テクスチャのアドレス
         */
        constructor(frameNo, texture) {
          this.frameNo = frameNo;
          this.textures = texture;
        }
      };
      exports.CubismRenderTextureResource = CubismRenderTextureResource;
      var CubismClippingContext_WebGL = class extends cubismrenderer_1.CubismClippingContext {
        /**
         * 引数付きコンストラクタ
         */
        constructor(manager, clippingDrawableIndices, clipCount) {
          super(clippingDrawableIndices, clipCount);
          this._owner = manager;
        }
        /**
         * このマスクを管理するマネージャのインスタンスを取得する
         * @return クリッピングマネージャのインスタンス
         */
        getClippingManager() {
          return this._owner;
        }
        setGl(gl) {
          this._owner.setGL(gl);
        }
      };
      exports.CubismClippingContext_WebGL = CubismClippingContext_WebGL;
      var CubismRendererProfile_WebGL = class {
        setGlEnable(index, enabled) {
          if (enabled)
            this.gl.enable(index);
          else
            this.gl.disable(index);
        }
        setGlEnableVertexAttribArray(index, enabled) {
          if (enabled)
            this.gl.enableVertexAttribArray(index);
          else
            this.gl.disableVertexAttribArray(index);
        }
        save() {
          if (this.gl == null) {
            (0, cubismdebug_1.CubismLogError)("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
            return;
          }
          this._lastArrayBufferBinding = this.gl.getParameter(this.gl.ARRAY_BUFFER_BINDING);
          this._lastElementArrayBufferBinding = this.gl.getParameter(this.gl.ELEMENT_ARRAY_BUFFER_BINDING);
          this._lastProgram = this.gl.getParameter(this.gl.CURRENT_PROGRAM);
          this._lastActiveTexture = this.gl.getParameter(this.gl.ACTIVE_TEXTURE);
          this.gl.activeTexture(this.gl.TEXTURE1);
          this._lastTexture1Binding2D = this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
          this.gl.activeTexture(this.gl.TEXTURE0);
          this._lastTexture0Binding2D = this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
          this._lastVertexAttribArrayEnabled[0] = this.gl.getVertexAttrib(0, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
          this._lastVertexAttribArrayEnabled[1] = this.gl.getVertexAttrib(1, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
          this._lastVertexAttribArrayEnabled[2] = this.gl.getVertexAttrib(2, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
          this._lastVertexAttribArrayEnabled[3] = this.gl.getVertexAttrib(3, this.gl.VERTEX_ATTRIB_ARRAY_ENABLED);
          this._lastScissorTest = this.gl.isEnabled(this.gl.SCISSOR_TEST);
          this._lastStencilTest = this.gl.isEnabled(this.gl.STENCIL_TEST);
          this._lastDepthTest = this.gl.isEnabled(this.gl.DEPTH_TEST);
          this._lastCullFace = this.gl.isEnabled(this.gl.CULL_FACE);
          this._lastBlend = this.gl.isEnabled(this.gl.BLEND);
          this._lastFrontFace = this.gl.getParameter(this.gl.FRONT_FACE);
          this._lastColorMask = this.gl.getParameter(this.gl.COLOR_WRITEMASK);
          this._lastBlending[0] = this.gl.getParameter(this.gl.BLEND_SRC_RGB);
          this._lastBlending[1] = this.gl.getParameter(this.gl.BLEND_DST_RGB);
          this._lastBlending[2] = this.gl.getParameter(this.gl.BLEND_SRC_ALPHA);
          this._lastBlending[3] = this.gl.getParameter(this.gl.BLEND_DST_ALPHA);
          this._lastFBO = this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING);
          this._lastViewport = this.gl.getParameter(this.gl.VIEWPORT);
        }
        restore() {
          if (this.gl == null) {
            (0, cubismdebug_1.CubismLogError)("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
            return;
          }
          this.gl.useProgram(this._lastProgram);
          this.setGlEnableVertexAttribArray(0, this._lastVertexAttribArrayEnabled[0]);
          this.setGlEnableVertexAttribArray(1, this._lastVertexAttribArrayEnabled[1]);
          this.setGlEnableVertexAttribArray(2, this._lastVertexAttribArrayEnabled[2]);
          this.setGlEnableVertexAttribArray(3, this._lastVertexAttribArrayEnabled[3]);
          this.setGlEnable(this.gl.SCISSOR_TEST, this._lastScissorTest);
          this.setGlEnable(this.gl.STENCIL_TEST, this._lastStencilTest);
          this.setGlEnable(this.gl.DEPTH_TEST, this._lastDepthTest);
          this.setGlEnable(this.gl.CULL_FACE, this._lastCullFace);
          this.setGlEnable(this.gl.BLEND, this._lastBlend);
          this.gl.frontFace(this._lastFrontFace);
          this.gl.colorMask(this._lastColorMask[0], this._lastColorMask[1], this._lastColorMask[2], this._lastColorMask[3]);
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._lastArrayBufferBinding);
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this._lastElementArrayBufferBinding);
          this.gl.activeTexture(this.gl.TEXTURE1);
          this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture1Binding2D);
          this.gl.activeTexture(this.gl.TEXTURE0);
          this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture0Binding2D);
          this.gl.activeTexture(this._lastActiveTexture);
          this.gl.blendFuncSeparate(this._lastBlending[0], this._lastBlending[1], this._lastBlending[2], this._lastBlending[3]);
        }
        setGl(gl) {
          this.gl = gl;
        }
        constructor() {
          this._lastVertexAttribArrayEnabled = new Array(4);
          this._lastColorMask = new Array(4);
          this._lastBlending = new Array(4);
          this._lastViewport = new Array(4);
        }
      };
      exports.CubismRendererProfile_WebGL = CubismRendererProfile_WebGL;
      var CubismRenderer_WebGL = class extends cubismrenderer_1.CubismRenderer {
        /**
         * レンダラの初期化処理を実行する
         * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
         *
         * @param model モデルのインスタンス
         * @param maskBufferCount バッファの生成数
         */
        initialize(model, maskBufferCount = 1) {
          if (model.isUsingMasking()) {
            this._clippingManager = new CubismClippingManager_WebGL();
            this._clippingManager.initialize(model, maskBufferCount);
          }
          this._sortedDrawableIndexList.resize(model.getDrawableCount(), 0);
          super.initialize(model);
        }
        /**
         * WebGLテクスチャのバインド処理
         * CubismRendererにテクスチャを設定し、CubismRenderer内でその画像を参照するためのIndex値を戻り値とする
         * @param modelTextureNo セットするモデルテクスチャの番号
         * @param glTextureNo WebGLテクスチャの番号
         */
        bindTexture(modelTextureNo, glTexture) {
          this._textures.setValue(modelTextureNo, glTexture);
        }
        /**
         * WebGLにバインドされたテクスチャのリストを取得する
         * @return テクスチャのリスト
         */
        getBindedTextures() {
          return this._textures;
        }
        /**
         * クリッピングマスクバッファのサイズを設定する
         * マスク用のFrameBufferを破棄、再作成する為処理コストは高い
         * @param size クリッピングマスクバッファのサイズ
         */
        setClippingMaskBufferSize(size) {
          if (!this._model.isUsingMasking()) {
            return;
          }
          const renderTextureCount = this._clippingManager.getRenderTextureCount();
          this._clippingManager.release();
          this._clippingManager = void 0;
          this._clippingManager = null;
          this._clippingManager = new CubismClippingManager_WebGL();
          this._clippingManager.setClippingMaskBufferSize(size);
          this._clippingManager.initialize(
            this.getModel(),
            renderTextureCount
            // インスタンス破棄前に保存したレンダーテクスチャの数
          );
        }
        /**
         * クリッピングマスクバッファのサイズを取得する
         * @return クリッピングマスクバッファのサイズ
         */
        getClippingMaskBufferSize() {
          return this._model.isUsingMasking() ? this._clippingManager.getClippingMaskBufferSize() : -1;
        }
        /**
         * レンダーテクスチャの枚数を取得する
         * @return レンダーテクスチャの枚数
         */
        getRenderTextureCount() {
          return this._model.isUsingMasking() ? this._clippingManager.getRenderTextureCount() : -1;
        }
        /**
         * コンストラクタ
         */
        constructor() {
          super();
          this._clippingContextBufferForMask = null;
          this._clippingContextBufferForDraw = null;
          this._rendererProfile = new CubismRendererProfile_WebGL();
          this.firstDraw = true;
          this._textures = new csmmap_1.csmMap();
          this._sortedDrawableIndexList = new csmvector_1.csmVector();
          this._bufferData = {
            vertex: WebGLBuffer = null,
            uv: WebGLBuffer = null,
            index: WebGLBuffer = null
          };
          this._textures.prepareCapacity(32, true);
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          if (this._clippingManager) {
            this._clippingManager.release();
            this._clippingManager = void 0;
            this._clippingManager = null;
          }
          if (this.gl == null) {
            return;
          }
          this.gl.deleteBuffer(this._bufferData.vertex);
          this._bufferData.vertex = null;
          this.gl.deleteBuffer(this._bufferData.uv);
          this._bufferData.uv = null;
          this.gl.deleteBuffer(this._bufferData.index);
          this._bufferData.index = null;
          this._bufferData = null;
          this._textures = null;
        }
        /**
         * モデルを描画する実際の処理
         */
        doDrawModel() {
          if (this.gl == null) {
            (0, cubismdebug_1.CubismLogError)("'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function.");
            return;
          }
          if (this._clippingManager != null) {
            this.preDraw();
            if (this.isUsingHighPrecisionMask()) {
              this._clippingManager.setupMatrixForHighPrecision(this.getModel(), false);
            } else {
              this._clippingManager.setupClippingContext(this.getModel(), this);
            }
          }
          this.preDraw();
          const drawableCount = this.getModel().getDrawableCount();
          const renderOrder = this.getModel().getDrawableRenderOrders();
          for (let i = 0; i < drawableCount; ++i) {
            const order = renderOrder[i];
            this._sortedDrawableIndexList.set(order, i);
          }
          for (let i = 0; i < drawableCount; ++i) {
            const drawableIndex = this._sortedDrawableIndexList.at(i);
            if (!this.getModel().getDrawableDynamicFlagIsVisible(drawableIndex)) {
              continue;
            }
            const clipContext = this._clippingManager != null ? this._clippingManager.getClippingContextListForDraw().at(drawableIndex) : null;
            if (clipContext != null && this.isUsingHighPrecisionMask()) {
              if (clipContext._isUsing) {
                this.gl.viewport(0, 0, this._clippingManager.getClippingMaskBufferSize(), this._clippingManager.getClippingMaskBufferSize());
                this.preDraw();
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, clipContext.getClippingManager().getMaskRenderTexture().at(clipContext._bufferIndex));
                this.gl.clearColor(1, 1, 1, 1);
                this.gl.clear(this.gl.COLOR_BUFFER_BIT);
              }
              {
                const clipDrawCount = clipContext._clippingIdCount;
                for (let index = 0; index < clipDrawCount; index++) {
                  const clipDrawIndex = clipContext._clippingIdList[index];
                  if (!this._model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
                    continue;
                  }
                  this.setIsCulling(this._model.getDrawableCulling(clipDrawIndex) != false);
                  this.setClippingContextBufferForMask(clipContext);
                  this.drawMeshWebGL(this._model, clipDrawIndex);
                }
              }
              {
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, s_fbo);
                this.setClippingContextBufferForMask(null);
                this.gl.viewport(s_viewport[0], s_viewport[1], s_viewport[2], s_viewport[3]);
                this.preDraw();
              }
            }
            this.setClippingContextBufferForDraw(clipContext);
            this.setIsCulling(this.getModel().getDrawableCulling(drawableIndex));
            this.drawMeshWebGL(this._model, drawableIndex);
          }
        }
        /**
         * 描画オブジェクト（アートメッシュ）を描画する。
         * @param model 描画対象のモデル
         * @param index 描画対象のメッシュのインデックス
         */
        drawMeshWebGL(model, index) {
          if (this.isCulling()) {
            this.gl.enable(this.gl.CULL_FACE);
          } else {
            this.gl.disable(this.gl.CULL_FACE);
          }
          this.gl.frontFace(this.gl.CCW);
          if (this.isGeneratingMask()) {
            cubismshader_webgl_1.CubismShaderManager_WebGL.getInstance().getShader(this.gl).setupShaderProgramForMask(this, model, index);
          } else {
            cubismshader_webgl_1.CubismShaderManager_WebGL.getInstance().getShader(this.gl).setupShaderProgramForDraw(this, model, index);
          }
          {
            const indexCount = model.getDrawableVertexIndexCount(index);
            this.gl.drawElements(this.gl.TRIANGLES, indexCount, this.gl.UNSIGNED_SHORT, 0);
          }
          this.gl.useProgram(null);
          this.setClippingContextBufferForDraw(null);
          this.setClippingContextBufferForMask(null);
        }
        saveProfile() {
          this._rendererProfile.save();
        }
        restoreProfile() {
          this._rendererProfile.restore();
        }
        /**
         * レンダラが保持する静的なリソースを解放する
         * WebGLの静的なシェーダープログラムを解放する
         */
        static doStaticRelease() {
          cubismshader_webgl_1.CubismShaderManager_WebGL.deleteInstance();
        }
        /**
         * レンダーステートを設定する
         * @param fbo アプリケーション側で指定しているフレームバッファ
         * @param viewport ビューポート
         */
        setRenderState(fbo, viewport) {
          s_fbo = fbo;
          s_viewport = viewport;
        }
        /**
         * 描画開始時の追加処理
         * モデルを描画する前にクリッピングマスクに必要な処理を実装している
         */
        preDraw() {
          if (this.firstDraw) {
            this.firstDraw = false;
          }
          this.gl.disable(this.gl.SCISSOR_TEST);
          this.gl.disable(this.gl.STENCIL_TEST);
          this.gl.disable(this.gl.DEPTH_TEST);
          this.gl.frontFace(this.gl.CW);
          this.gl.enable(this.gl.BLEND);
          this.gl.colorMask(true, true, true, true);
          this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
          if (this.getAnisotropy() > 0 && this._extension) {
            for (let i = 0; i < this._textures.getSize(); ++i) {
              this.gl.bindTexture(this.gl.TEXTURE_2D, this._textures.getValue(i));
              this.gl.texParameterf(this.gl.TEXTURE_2D, this._extension.TEXTURE_MAX_ANISOTROPY_EXT, this.getAnisotropy());
            }
          }
        }
        /**
         * マスクテクスチャに描画するクリッピングコンテキストをセットする
         */
        setClippingContextBufferForMask(clip) {
          this._clippingContextBufferForMask = clip;
        }
        /**
         * マスクテクスチャに描画するクリッピングコンテキストを取得する
         * @return マスクテクスチャに描画するクリッピングコンテキスト
         */
        getClippingContextBufferForMask() {
          return this._clippingContextBufferForMask;
        }
        /**
         * 画面上に描画するクリッピングコンテキストをセットする
         */
        setClippingContextBufferForDraw(clip) {
          this._clippingContextBufferForDraw = clip;
        }
        /**
         * 画面上に描画するクリッピングコンテキストを取得する
         * @return 画面上に描画するクリッピングコンテキスト
         */
        getClippingContextBufferForDraw() {
          return this._clippingContextBufferForDraw;
        }
        /**
         * マスク生成時かを判定する
         * @returns 判定値
         */
        isGeneratingMask() {
          return this.getClippingContextBufferForMask() != null;
        }
        /**
         * glの設定
         */
        startUp(gl) {
          this.gl = gl;
          if (this._clippingManager) {
            this._clippingManager.setGL(gl);
          }
          cubismshader_webgl_1.CubismShaderManager_WebGL.getInstance().setGlContext(gl);
          this._rendererProfile.setGl(gl);
          this._extension = this.gl.getExtension("EXT_texture_filter_anisotropic") || this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
        }
      };
      exports.CubismRenderer_WebGL = CubismRenderer_WebGL;
      cubismrenderer_1.CubismRenderer.staticRelease = () => {
        CubismRenderer_WebGL.doStaticRelease();
      };
      var $ = __importStar(require_cubismrenderer_webgl());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismClippingContext = $.CubismClippingContext_WebGL;
        Live2DCubismFramework2.CubismClippingManager_WebGL = $.CubismClippingManager_WebGL;
        Live2DCubismFramework2.CubismRenderTextureResource = $.CubismRenderTextureResource;
        Live2DCubismFramework2.CubismRenderer_WebGL = $.CubismRenderer_WebGL;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/model/cubismmodeluserdatajson.js
  var require_cubismmodeluserdatajson = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/model/cubismmodeluserdatajson.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismModelUserDataJson = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var cubismjson_1 = require_cubismjson();
      var Meta = "Meta";
      var UserDataCount = "UserDataCount";
      var TotalUserDataSize = "TotalUserDataSize";
      var UserData = "UserData";
      var Target = "Target";
      var Id = "Id";
      var Value = "Value";
      var CubismModelUserDataJson = class {
        /**
         * コンストラクタ
         * @param buffer    userdata3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         */
        constructor(buffer, size) {
          this._json = cubismjson_1.CubismJson.create(buffer, size);
        }
        /**
         * デストラクタ相当の処理
         */
        release() {
          cubismjson_1.CubismJson.delete(this._json);
        }
        /**
         * ユーザーデータ個数の取得
         * @return ユーザーデータの個数
         */
        getUserDataCount() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(UserDataCount).toInt();
        }
        /**
         * ユーザーデータ総文字列数の取得
         *
         * @return ユーザーデータ総文字列数
         */
        getTotalUserDataSize() {
          return this._json.getRoot().getValueByString(Meta).getValueByString(TotalUserDataSize).toInt();
        }
        /**
         * ユーザーデータのタイプの取得
         *
         * @return ユーザーデータのタイプ
         */
        getUserDataTargetType(i) {
          return this._json.getRoot().getValueByString(UserData).getValueByIndex(i).getValueByString(Target).getRawString();
        }
        /**
         * ユーザーデータのターゲットIDの取得
         *
         * @param i インデックス
         * @return ユーザーデータターゲットID
         */
        getUserDataId(i) {
          return live2dcubismframework_1.CubismFramework.getIdManager().getId(this._json.getRoot().getValueByString(UserData).getValueByIndex(i).getValueByString(Id).getRawString());
        }
        /**
         * ユーザーデータの文字列の取得
         *
         * @param i インデックス
         * @return ユーザーデータ
         */
        getUserDataValue(i) {
          return this._json.getRoot().getValueByString(UserData).getValueByIndex(i).getValueByString(Value).getRawString();
        }
      };
      exports.CubismModelUserDataJson = CubismModelUserDataJson;
      var $ = __importStar(require_cubismmodeluserdatajson());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismModelUserDataJson = $.CubismModelUserDataJson;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/model/cubismmodeluserdata.js
  var require_cubismmodeluserdata = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/model/cubismmodeluserdata.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismModelUserData = exports.CubismModelUserDataNode = void 0;
      var live2dcubismframework_1 = require_live2dcubismframework();
      var csmstring_1 = require_csmstring();
      var csmvector_1 = require_csmvector();
      var cubismmodeluserdatajson_1 = require_cubismmodeluserdatajson();
      var ArtMesh = "ArtMesh";
      var CubismModelUserDataNode = class {
      };
      exports.CubismModelUserDataNode = CubismModelUserDataNode;
      var CubismModelUserData = class _CubismModelUserData {
        /**
         * インスタンスの作成
         *
         * @param buffer    userdata3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         * @return 作成されたインスタンス
         */
        static create(buffer, size) {
          const ret = new _CubismModelUserData();
          ret.parseUserData(buffer, size);
          return ret;
        }
        /**
         * インスタンスを破棄する
         *
         * @param modelUserData 破棄するインスタンス
         */
        static delete(modelUserData) {
          if (modelUserData != null) {
            modelUserData.release();
            modelUserData = null;
          }
        }
        /**
         * ArtMeshのユーザーデータのリストの取得
         *
         * @return ユーザーデータリスト
         */
        getArtMeshUserDatas() {
          return this._artMeshUserDataNode;
        }
        /**
         * userdata3.jsonのパース
         *
         * @param buffer    userdata3.jsonが読み込まれているバッファ
         * @param size      バッファのサイズ
         */
        parseUserData(buffer, size) {
          let json = new cubismmodeluserdatajson_1.CubismModelUserDataJson(buffer, size);
          if (!json) {
            json.release();
            json = void 0;
            return;
          }
          const typeOfArtMesh = live2dcubismframework_1.CubismFramework.getIdManager().getId(ArtMesh);
          const nodeCount = json.getUserDataCount();
          for (let i = 0; i < nodeCount; i++) {
            const addNode = new CubismModelUserDataNode();
            addNode.targetId = json.getUserDataId(i);
            addNode.targetType = live2dcubismframework_1.CubismFramework.getIdManager().getId(json.getUserDataTargetType(i));
            addNode.value = new csmstring_1.csmString(json.getUserDataValue(i));
            this._userDataNodes.pushBack(addNode);
            if (addNode.targetType == typeOfArtMesh) {
              this._artMeshUserDataNode.pushBack(addNode);
            }
          }
          json.release();
          json = void 0;
        }
        /**
         * コンストラクタ
         */
        constructor() {
          this._userDataNodes = new csmvector_1.csmVector();
          this._artMeshUserDataNode = new csmvector_1.csmVector();
        }
        /**
         * デストラクタ相当の処理
         *
         * ユーザーデータ構造体配列を解放する
         */
        release() {
          for (let i = 0; i < this._userDataNodes.getSize(); ++i) {
            this._userDataNodes.set(i, null);
          }
          this._userDataNodes = null;
        }
      };
      exports.CubismModelUserData = CubismModelUserData;
      var $ = __importStar(require_cubismmodeluserdata());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismModelUserData = $.CubismModelUserData;
        Live2DCubismFramework2.CubismModelUserDataNode = $.CubismModelUserDataNode;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/framework/src/model/cubismusermodel.js
  var require_cubismusermodel = __commonJS({
    "node_modules/live2d-renderer/build/framework/src/model/cubismusermodel.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismFramework = exports.CubismUserModel = void 0;
      var cubismbreath_1 = require_cubismbreath();
      var cubismeyeblink_1 = require_cubismeyeblink();
      var cubismpose_1 = require_cubismpose();
      var live2dcubismframework_1 = require_live2dcubismframework();
      var cubismmodelmatrix_1 = require_cubismmodelmatrix();
      var cubismtargetpoint_1 = require_cubismtargetpoint();
      var cubismexpressionmotion_1 = require_cubismexpressionmotion();
      var cubismexpressionmotionmanager_1 = require_cubismexpressionmotionmanager();
      var cubismmotion_1 = require_cubismmotion();
      var cubismmotionmanager_1 = require_cubismmotionmanager();
      var cubismphysics_1 = require_cubismphysics();
      var cubismrenderer_webgl_1 = require_cubismrenderer_webgl();
      var cubismdebug_1 = require_cubismdebug();
      var cubismmoc_1 = require_cubismmoc();
      var cubismmodeluserdata_1 = require_cubismmodeluserdata();
      var CubismUserModel = class _CubismUserModel {
        /**
         * 初期化状態の取得
         *
         * 初期化されている状態か？
         *
         * @return true     初期化されている
         * @return false    初期化されていない
         */
        isInitialized() {
          return this._initialized;
        }
        /**
         * 初期化状態の設定
         *
         * 初期化状態を設定する。
         *
         * @param v 初期化状態
         */
        setInitialized(v) {
          this._initialized = v;
        }
        /**
         * 更新状態の取得
         *
         * 更新されている状態か？
         *
         * @return true     更新されている
         * @return false    更新されていない
         */
        isUpdating() {
          return this._updating;
        }
        /**
         * 更新状態の設定
         *
         * 更新状態を設定する
         *
         * @param v 更新状態
         */
        setUpdating(v) {
          this._updating = v;
        }
        /**
         * マウスドラッグ情報の設定
         * @param ドラッグしているカーソルのX位置
         * @param ドラッグしているカーソルのY位置
         */
        setDragging(x, y) {
          this._dragManager.set(x, y);
        }
        /**
         * 加速度の情報を設定する
         * @param x X軸方向の加速度
         * @param y Y軸方向の加速度
         * @param z Z軸方向の加速度
         */
        setAcceleration(x, y, z) {
          this._accelerationX = x;
          this._accelerationY = y;
          this._accelerationZ = z;
        }
        /**
         * モデル行列を取得する
         * @return モデル行列
         */
        getModelMatrix() {
          return this._modelMatrix;
        }
        /**
         * 不透明度の設定
         * @param a 不透明度
         */
        setOpacity(a) {
          this._opacity = a;
        }
        /**
         * 不透明度の取得
         * @return 不透明度
         */
        getOpacity() {
          return this._opacity;
        }
        /**
         * モデルデータを読み込む
         *
         * @param buffer    moc3ファイルが読み込まれているバッファ
         */
        loadModel(buffer, shouldCheckMocConsistency = false) {
          this._moc = cubismmoc_1.CubismMoc.create(buffer, shouldCheckMocConsistency);
          if (this._moc == null) {
            (0, cubismdebug_1.CubismLogError)("Failed to CubismMoc.create().");
            return;
          }
          this._model = this._moc.createModel();
          if (this._model == null) {
            (0, cubismdebug_1.CubismLogError)("Failed to CreateModel().");
            return;
          }
          this._model.saveParameters();
          this._modelMatrix = new cubismmodelmatrix_1.CubismModelMatrix(this._model.getCanvasWidth(), this._model.getCanvasHeight());
        }
        /**
         * モーションデータを読み込む
         * @param buffer motion3.jsonファイルが読み込まれているバッファ
         * @param size バッファのサイズ
         * @param name モーションの名前
         * @param onFinishedMotionHandler モーション再生終了時に呼び出されるコールバック関数
         * @param onBeganMotionHandler モーション再生開始時に呼び出されるコールバック関数
         * @param modelSetting モデル設定
         * @param group モーショングループ名
         * @param index モーションインデックス
         * @param shouldCheckMotionConsistency motion3.json整合性チェックするかどうか
         * @return モーションクラス
         */
        loadMotion(buffer, size, name, onFinishedMotionHandler, onBeganMotionHandler, modelSetting, group, index, shouldCheckMotionConsistency = false) {
          if (buffer == null || size == 0) {
            (0, cubismdebug_1.CubismLogError)("Failed to loadMotion().");
            return null;
          }
          const motion = cubismmotion_1.CubismMotion.create(buffer, size, onFinishedMotionHandler, onBeganMotionHandler, shouldCheckMotionConsistency);
          if (motion == null) {
            (0, cubismdebug_1.CubismLogError)(`Failed to create motion from buffer in LoadMotion()`);
            return null;
          }
          if (modelSetting) {
            const fadeInTime = modelSetting.getMotionFadeInTimeValue(group, index);
            if (fadeInTime >= 0) {
              motion.setFadeInTime(fadeInTime);
            }
            const fadeOutTime = modelSetting.getMotionFadeOutTimeValue(group, index);
            if (fadeOutTime >= 0) {
              motion.setFadeOutTime(fadeOutTime);
            }
          }
          return motion;
        }
        /**
         * 表情データの読み込み
         * @param buffer expファイルが読み込まれているバッファ
         * @param size バッファのサイズ
         * @param name 表情の名前
         */
        loadExpression(buffer, size, name) {
          if (buffer == null || size == 0) {
            (0, cubismdebug_1.CubismLogError)("Failed to loadExpression().");
            return null;
          }
          return cubismexpressionmotion_1.CubismExpressionMotion.create(buffer, size);
        }
        /**
         * ポーズデータの読み込み
         * @param buffer pose3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        loadPose(buffer, size) {
          if (buffer == null || size == 0) {
            (0, cubismdebug_1.CubismLogError)("Failed to loadPose().");
            return;
          }
          this._pose = cubismpose_1.CubismPose.create(buffer, size);
        }
        /**
         * モデルに付属するユーザーデータを読み込む
         * @param buffer userdata3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        loadUserData(buffer, size) {
          if (buffer == null || size == 0) {
            (0, cubismdebug_1.CubismLogError)("Failed to loadUserData().");
            return;
          }
          this._modelUserData = cubismmodeluserdata_1.CubismModelUserData.create(buffer, size);
        }
        /**
         * 物理演算データの読み込み
         * @param buffer  physics3.jsonが読み込まれているバッファ
         * @param size    バッファのサイズ
         */
        loadPhysics(buffer, size) {
          if (buffer == null || size == 0) {
            (0, cubismdebug_1.CubismLogError)("Failed to loadPhysics().");
            return;
          }
          this._physics = cubismphysics_1.CubismPhysics.create(buffer, size);
        }
        /**
         * 当たり判定の取得
         * @param drawableId 検証したいDrawableのID
         * @param pointX X位置
         * @param pointY Y位置
         * @return true ヒットしている
         * @return false ヒットしていない
         */
        isHit(drawableId, pointX, pointY) {
          const drawIndex = this._model.getDrawableIndex(drawableId);
          if (drawIndex < 0) {
            return false;
          }
          const count = this._model.getDrawableVertexCount(drawIndex);
          const vertices = this._model.getDrawableVertices(drawIndex);
          let left = vertices[0];
          let right = vertices[0];
          let top = vertices[1];
          let bottom = vertices[1];
          for (let j = 1; j < count; ++j) {
            const x = vertices[live2dcubismframework_1.Constant.vertexOffset + j * live2dcubismframework_1.Constant.vertexStep];
            const y = vertices[live2dcubismframework_1.Constant.vertexOffset + j * live2dcubismframework_1.Constant.vertexStep + 1];
            if (x < left) {
              left = x;
            }
            if (x > right) {
              right = x;
            }
            if (y < top) {
              top = y;
            }
            if (y > bottom) {
              bottom = y;
            }
          }
          const tx = this._modelMatrix.invertTransformX(pointX);
          const ty = this._modelMatrix.invertTransformY(pointY);
          return left <= tx && tx <= right && top <= ty && ty <= bottom;
        }
        /**
         * モデルの取得
         * @return モデル
         */
        getModel() {
          return this._model;
        }
        /**
         * レンダラの取得
         * @return レンダラ
         */
        getRenderer() {
          return this._renderer;
        }
        /**
         * レンダラを作成して初期化を実行する
         * @param maskBufferCount バッファの生成数
         */
        createRenderer(maskBufferCount = 1) {
          if (this._renderer) {
            this.deleteRenderer();
          }
          this._renderer = new cubismrenderer_webgl_1.CubismRenderer_WebGL();
          this._renderer.initialize(this._model, maskBufferCount);
        }
        /**
         * レンダラの解放
         */
        deleteRenderer() {
          if (this._renderer != null) {
            this._renderer.release();
            this._renderer = null;
          }
        }
        /**
         * イベント発火時の標準処理
         *
         * Eventが再生処理時にあった場合の処理をする。
         * 継承で上書きすることを想定している。
         * 上書きしない場合はログ出力をする。
         *
         * @param eventValue 発火したイベントの文字列データ
         */
        motionEventFired(eventValue) {
          (0, cubismdebug_1.CubismLogInfo)("{0}", eventValue.s);
        }
        /**
         * イベント用のコールバック
         *
         * CubismMotionQueueManagerにイベント用に登録するためのCallback。
         * CubismUserModelの継承先のEventFiredを呼ぶ。
         *
         * @param caller 発火したイベントを管理していたモーションマネージャー、比較用
         * @param eventValue 発火したイベントの文字列データ
         * @param customData CubismUserModelを継承したインスタンスを想定
         */
        static cubismDefaultMotionEventCallback(caller, eventValue, customData) {
          const model = customData;
          if (model != null) {
            model.motionEventFired(eventValue);
          }
        }
        /**
         * コンストラクタ
         */
        constructor() {
          this._moc = null;
          this._model = null;
          this._motionManager = null;
          this._expressionManager = null;
          this._eyeBlink = null;
          this._breath = null;
          this._modelMatrix = null;
          this._pose = null;
          this._dragManager = null;
          this._physics = null;
          this._modelUserData = null;
          this._initialized = false;
          this._updating = false;
          this._opacity = 1;
          this._lipsync = true;
          this._lastLipSyncValue = 0;
          this._dragX = 0;
          this._dragY = 0;
          this._accelerationX = 0;
          this._accelerationY = 0;
          this._accelerationZ = 0;
          this._mocConsistency = false;
          this._debugMode = false;
          this._renderer = null;
          this._motionManager = new cubismmotionmanager_1.CubismMotionManager();
          this._motionManager.setEventCallback(_CubismUserModel.cubismDefaultMotionEventCallback, this);
          this._expressionManager = new cubismexpressionmotionmanager_1.CubismExpressionMotionManager();
          this._dragManager = new cubismtargetpoint_1.CubismTargetPoint();
        }
        /**
         * デストラクタに相当する処理
         */
        release() {
          if (this._motionManager != null) {
            this._motionManager.release();
            this._motionManager = null;
          }
          if (this._expressionManager != null) {
            this._expressionManager.release();
            this._expressionManager = null;
          }
          if (this._moc != null) {
            this._moc.deleteModel(this._model);
            this._moc.release();
            this._moc = null;
          }
          this._modelMatrix = null;
          cubismpose_1.CubismPose.delete(this._pose);
          cubismeyeblink_1.CubismEyeBlink.delete(this._eyeBlink);
          cubismbreath_1.CubismBreath.delete(this._breath);
          this._dragManager = null;
          cubismphysics_1.CubismPhysics.delete(this._physics);
          cubismmodeluserdata_1.CubismModelUserData.delete(this._modelUserData);
          this.deleteRenderer();
        }
      };
      exports.CubismUserModel = CubismUserModel;
      var $ = __importStar(require_cubismusermodel());
      var Live2DCubismFramework;
      (function(Live2DCubismFramework2) {
        Live2DCubismFramework2.CubismUserModel = $.CubismUserModel;
      })(Live2DCubismFramework || (exports.Live2DCubismFramework = Live2DCubismFramework = {}));
    }
  });

  // node_modules/live2d-renderer/build/renderer/Live2DCubismUserModel.js
  var require_Live2DCubismUserModel = __commonJS({
    "node_modules/live2d-renderer/build/renderer/Live2DCubismUserModel.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismUserModel = void 0;
      var cubismusermodel_1 = require_cubismusermodel();
      var Live2DCubismUserModel = class extends cubismusermodel_1.CubismUserModel {
        constructor() {
          super();
          this.getParameterValue = (parameter) => {
            const index = this.parameters.ids.indexOf(parameter);
            return this.model.getParameterValueByIndex(index);
          };
          this.setParameter = (parameter, value) => {
            const index = this.parameters.ids.indexOf(parameter);
            this.model.setParameterValueByIndex(index, value);
            this.model.update();
          };
          this.resetParameters = () => {
            for (let i = 0; i < this.parameters.defaultValues.length; i++) {
              this.model.setParameterValueByIndex(i, this.parameters.defaultValues[i]);
            }
            this.model.update();
          };
          this.getPartOpacity = (part) => {
            const index = this.parts.ids.indexOf(part);
            return this.model.getPartOpacityByIndex(index);
          };
          this.setPartOpacity = (part, opacity) => {
            const index = this.parts.ids.indexOf(part);
            this.model.setPartOpacityByIndex(index, opacity);
            this.model.update();
          };
          this.resetPartOpacities = () => {
            for (let i = 0; i < this.defaultPartOpacities.length; i++) {
              this.model.setPartOpacityByIndex(i, this.defaultPartOpacities[i]);
            }
            this.model.update();
          };
        }
        initialize() {
          this.model.initialize();
          this.defaultPartOpacities = structuredClone(this.parts.opacities);
        }
        get accelerationX() {
          return this._accelerationX;
        }
        set accelerationX(accelerationX) {
          this._accelerationX = accelerationX;
        }
        get accelerationY() {
          return this._accelerationY;
        }
        set accelerationY(accelerationY) {
          this._accelerationY = accelerationY;
        }
        get accelerationZ() {
          return this._accelerationZ;
        }
        set accelerationZ(accelerationZ) {
          this._accelerationZ = accelerationZ;
        }
        get breath() {
          return this._breath;
        }
        set breath(breath) {
          this._breath = breath;
        }
        get dragManager() {
          return this._dragManager;
        }
        set dragManager(dragManager) {
          this._dragManager = dragManager;
        }
        get dragX() {
          return this._dragX;
        }
        set dragX(dragX) {
          this._dragX = dragX;
        }
        get dragY() {
          return this._dragY;
        }
        set dragY(dragY) {
          this._dragY = dragY;
        }
        get expressionManager() {
          return this._expressionManager;
        }
        set expressionManager(expressionManager) {
          this._expressionManager = expressionManager;
        }
        get eyeBlink() {
          return this._eyeBlink;
        }
        set eyeBlink(eyeBlink) {
          this._eyeBlink = eyeBlink;
        }
        get initialized() {
          return this._initialized;
        }
        set initialized(initialized) {
          this._initialized = initialized;
        }
        get lastLipSyncValue() {
          return this._lastLipSyncValue;
        }
        set lastLipSyncValue(lastLipSyncValue) {
          this._lastLipSyncValue = lastLipSyncValue;
        }
        get lipsync() {
          return this._lipsync;
        }
        set lipsync(lipsync) {
          this._lipsync = lipsync;
        }
        get moc() {
          return this.moc;
        }
        set moc(moc) {
          this._moc = moc;
        }
        get mocConsistency() {
          return this._mocConsistency;
        }
        set mocConsistency(mocConsistency) {
          this._mocConsistency = mocConsistency;
        }
        get modelMatrix() {
          return this._modelMatrix;
        }
        set modelMatrix(modelMatrix) {
          this._modelMatrix = modelMatrix;
        }
        get modelUserData() {
          return this._modelUserData;
        }
        set modelUserData(modelUserData) {
          this._modelUserData = modelUserData;
        }
        get model() {
          return this._model;
        }
        set model(model) {
          this._model = model;
        }
        get motionManager() {
          return this._motionManager;
        }
        set motionManager(motionManager) {
          this._motionManager = motionManager;
        }
        get opacity() {
          return this._opacity;
        }
        set opacity(opacity) {
          this._opacity = opacity;
        }
        get pose() {
          return this._pose;
        }
        set pose(pose) {
          this._pose = pose;
        }
        get physics() {
          return this._physics;
        }
        set physics(physics) {
          this._physics = physics;
        }
        get updating() {
          return this._updating;
        }
        set updating(updating) {
          this._updating = updating;
        }
        get parameters() {
          const model = this.model;
          return model._model.parameters;
        }
        get parts() {
          const model = this.model;
          return model._model.parts;
        }
        get drawables() {
          const model = this.model;
          return model._model.drawables;
        }
        get width() {
          const model = this.model;
          return model._model.canvasinfo.CanvasWidth;
        }
        get height() {
          const model = this.model;
          return model._model.canvasinfo.CanvasHeight;
        }
        get originX() {
          const model = this.model;
          return model._model.canvasinfo.CanvasOriginX;
        }
        get originY() {
          const model = this.model;
          return model._model.canvasinfo.CanvasOriginY;
        }
        get pixelsPerUnit() {
          const model = this.model;
          return model._model.canvasinfo.PixelsPerUnit;
        }
      };
      exports.Live2DCubismUserModel = Live2DCubismUserModel;
    }
  });

  // node_modules/live2d-renderer/build/renderer/WavFileController.js
  var require_WavFileController = __commonJS({
    "node_modules/live2d-renderer/build/renderer/WavFileController.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WavFileController = void 0;
      var WavFileController = class {
        constructor(model) {
          this.start = async (wavBuffer, playAudio = false) => {
            this.sampleOffset = 0;
            this.userTime = 0;
            this.previousRms = 0;
            this.rms = 0;
            let decodedAudio = null;
            let cloneAudio = null;
            if (wavBuffer instanceof AudioBuffer) {
              decodedAudio = wavBuffer;
              const offlineContext = new OfflineAudioContext(wavBuffer.numberOfChannels, wavBuffer.length, wavBuffer.sampleRate);
              const bufferSource = offlineContext.createBufferSource();
              bufferSource.buffer = wavBuffer;
              bufferSource.connect(offlineContext.destination);
              bufferSource.start();
              cloneAudio = await offlineContext.startRendering();
            } else {
              const cloneBuffer = new Uint8Array(wavBuffer).slice().buffer;
              decodedAudio = await this.model.audioContext.decodeAudioData(wavBuffer);
              cloneAudio = await this.model.audioContext.decodeAudioData(cloneBuffer);
            }
            this.numChannels = decodedAudio.numberOfChannels;
            this.sampleRate = decodedAudio.sampleRate;
            this.samples = Array.from({ length: this.numChannels }, (v, i) => decodedAudio.getChannelData(i));
            this.samplesPerChannel = decodedAudio.length;
            if (playAudio)
              await this.play(cloneAudio);
          };
          this.play = async (audioBuffer) => {
            this.stop();
            this.sourceNode = this.model.audioContext.createBufferSource();
            this.sourceNode.buffer = audioBuffer;
            if (this.model.connectNode) {
              this.sourceNode.connect(this.model.connectNode);
            } else {
              this.sourceNode.connect(this.volumeNode);
            }
            return new Promise((resolve) => {
              this.sourceNode.onended = () => resolve();
              this.sourceNode.start(this.userTime);
            });
          };
          this.stop = async () => {
            if (this.sourceNode) {
              this.sourceNode.stop();
              this.sourceNode.disconnect();
              this.sourceNode = null;
            }
          };
          this.update = (deltaTime) => {
            if (!this.samples || this.sampleOffset >= this.samplesPerChannel) {
              this.rms = 0;
              return;
            }
            this.userTime += deltaTime;
            const goalOffset = Math.min(Math.floor(this.userTime * this.sampleRate), this.samplesPerChannel);
            let rms = 0;
            const samplesToProcess = goalOffset - this.sampleOffset;
            for (const channel of this.samples) {
              for (let i = this.sampleOffset; i < goalOffset; i++) {
                rms += channel[i] ** 2;
              }
            }
            this.rms = Math.sqrt(rms / (this.numChannels * samplesToProcess)) * 5;
            this.rms = Math.max(0, Math.min(this.rms, 1));
            if (this.smoothingFactor > 0) {
              this.rms = this.previousRms * (1 - this.smoothingFactor) + this.rms * this.smoothingFactor;
            }
            this.previousRms = this.rms;
            this.sampleOffset = goalOffset;
          };
          this.model = model;
          this.samples = null;
          this.previousRms = 0;
          this.rms = 0;
          this.sampleOffset = 0;
          this.userTime = 0;
          this.smoothingFactor = 0.1;
          this.sourceNode = null;
          this.volumeNode = this.model.audioContext.createGain();
          this.volumeNode.gain.value = 1;
          this.volumeNode.connect(this.model.audioContext.destination);
        }
        getRms() {
          return this.rms;
        }
      };
      exports.WavFileController = WavFileController;
    }
  });

  // node_modules/live2d-renderer/build/renderer/types.js
  var require_types = __commonJS({
    "node_modules/live2d-renderer/build/renderer/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MotionPriority = void 0;
      var MotionPriority;
      (function(MotionPriority2) {
        MotionPriority2[MotionPriority2["None"] = 0] = "None";
        MotionPriority2[MotionPriority2["Idle"] = 1] = "Idle";
        MotionPriority2[MotionPriority2["Normal"] = 2] = "Normal";
        MotionPriority2[MotionPriority2["Force"] = 3] = "Force";
      })(MotionPriority || (exports.MotionPriority = MotionPriority = {}));
    }
  });

  // node_modules/live2d-renderer/build/renderer/TouchController.js
  var require_TouchController = __commonJS({
    "node_modules/live2d-renderer/build/renderer/TouchController.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TouchController = void 0;
      var types_1 = require_types();
      var TouchController = class {
        constructor(model) {
          this.touchStart = (posX, posY) => {
            this.startX = this.lastX = posX;
            this.startY = this.lastY = posY;
          };
          this.touchMove = (posX, posY) => {
            this.lastX = posX;
            this.lastY = posY;
          };
          this.getFlickDistance = () => {
            return this.calculateDistance(this.startX, this.startY, this.lastX, this.lastY);
          };
          this.calculateDistance = (x1, y1, x2, y2) => {
            return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
          };
          this.calculateMovingAmount = (x1, x2) => {
            if (x1 > 0 !== x2 > 0)
              return 0;
            return Math.sign(x1) * Math.min(Math.abs(x1), Math.abs(x2));
          };
          this.pointerDown = (event) => {
            if (this.model.paused)
              return;
            const rect = this.model.canvas.getBoundingClientRect();
            const posX = event.clientX - rect.left;
            const posY = event.clientY - rect.top;
            this.touchStart(posX, posY);
          };
          this.pointerMove = (event) => {
            if (this.model.paused)
              return;
            const rect = this.model.canvas.getBoundingClientRect();
            const posX = event.clientX - rect.left;
            const posY = event.clientY - rect.top;
            const x = this.model.transformX(this.lastX);
            const y = this.model.transformY(this.lastY);
            this.touchMove(posX, posY);
            this.model.setDragging(x, y);
          };
          this.pointerUp = (event) => {
            if (this.model.paused)
              return;
            const rect = this.model.canvas.getBoundingClientRect();
            const posX = event.clientX - rect.left;
            const posY = event.clientY - rect.top;
            this.model.setDragging(0, 0);
            const x = this.model.transformX(posX);
            const y = this.model.transformY(posY);
            if (this.model.tapInteraction)
              this.tap(x, y);
          };
          this.tap = (x, y) => {
            if (this.model.hitTest("Head", x, y)) {
              this.model.setRandomExpression();
            } else if (this.model.hitTest("Body", x, y)) {
              this.model.startRandomMotion("TapBody", types_1.MotionPriority.Normal);
            }
            let hitAreas = [];
            for (let i = 0; i < this.model.settings.getHitAreasCount(); i++) {
              const drawId = this.model.settings.getHitAreaId(i);
              if (this.model.isHit(drawId, x, y)) {
                hitAreas.push(drawId.getString().s);
              }
            }
            this.model.emit("hit", hitAreas, x, y);
          };
          this.startInteractions = () => {
            if (!this.model.autoInteraction)
              return;
            document.addEventListener("pointerdown", this.pointerDown, { passive: true });
            document.addEventListener("pointermove", this.pointerMove, { passive: true });
            document.addEventListener("pointerup", this.pointerUp, { passive: true });
            document.addEventListener("pointercancel", this.pointerUp, { passive: true });
          };
          this.cancelInteractions = () => {
            document.removeEventListener("pointerdown", this.pointerDown);
            document.removeEventListener("pointermove", this.pointerMove);
            document.removeEventListener("pointerup", this.pointerUp);
            document.removeEventListener("pointercancel", this.pointerUp);
          };
          this.initInteractions = () => {
            this.cancelInteractions();
            this.startInteractions();
          };
          this.model = model;
          this.startX = this.startY = 0;
          this.lastX = this.lastY = 0;
        }
      };
      exports.TouchController = TouchController;
    }
  });

  // node_modules/live2d-renderer/build/renderer/MotionController.js
  var require_MotionController = __commonJS({
    "node_modules/live2d-renderer/build/renderer/MotionController.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MotionController = void 0;
      var cubismmotionqueuemanager_1 = require_cubismmotionqueuemanager();
      var acubismmotion_1 = require_acubismmotion();
      var types_1 = require_types();
      var MotionController = class {
        constructor(model) {
          this.load = async () => {
            const { motionGroups } = this.model.buffers;
            for (let i = 0; i < motionGroups.length; i++) {
              const group = motionGroups[i].group;
              const motionBuffers = motionGroups[i].motionData.motionBuffers;
              const name = `${group}_${i}`;
              for (let i2 = 0; i2 < motionBuffers.length; i2++) {
                const motionBuffer = motionBuffers[i2];
                const motion = this.model.loadMotion(motionBuffer, motionBuffer.byteLength, name, null, null, this.model.settings, group, i2);
                if (motion !== null) {
                  motion.setEffectIds(this.model.eyeBlinkIds, this.model.lipSyncIds);
                  if (this.model.motions.getValue(name) !== null) {
                    acubismmotion_1.ACubismMotion.delete(this.model.motions.getValue(name));
                  }
                  this.model.motions.setValue(name, motion);
                } else {
                  this.model.totalMotionCount--;
                }
              }
            }
            this.model.motionManager.stopAllMotions();
          };
          this.update = (deltaTime) => {
            let motionUpdated = false;
            this.model.model.loadParameters();
            if (this.model.motionManager.isFinished()) {
              if (!this.model.paused && this.model.enableMotion) {
                if (this.model.randomMotion) {
                  this.startRandomMotion(null, types_1.MotionPriority.Idle);
                } else {
                  this.startMotion("Idle", 1, types_1.MotionPriority.Idle);
                }
              }
            } else {
              motionUpdated = this.model.motionManager.updateMotion(this.model.model, deltaTime);
            }
            this.model.model.saveParameters();
            return motionUpdated;
          };
          this.stopMotions = () => {
            this.model.motionManager.stopAllMotions();
          };
          this.startMotion = async (group, i, priority, onStartMotion, onEndMotion) => {
            if (priority === types_1.MotionPriority.Force) {
              this.model.motionManager.setReservePriority(priority);
            } else if (!this.model.motionManager.reserveMotion(priority)) {
              return cubismmotionqueuemanager_1.InvalidMotionQueueEntryHandleValue;
            }
            const { motionGroups } = this.model.buffers;
            const motionGroup = motionGroups.find((motion2) => motion2.group === group);
            if (!motionGroup)
              return;
            const { motionBuffers, wavBuffer } = motionGroup.motionData;
            const name = `${group}_${i}`;
            let motion = this.model.motions.getValue(name);
            let autoDelete = false;
            if (motion === null) {
              const motionBuffer = motionBuffers[i];
              motion = this.model.loadMotion(motionBuffer, motionBuffer.byteLength, null, onEndMotion, onStartMotion, this.model.settings, group, i);
              if (!motion)
                return;
              motion.setEffectIds(this.model.eyeBlinkIds, this.model.lipSyncIds);
              autoDelete = true;
            } else {
              motion.setBeganMotionHandler(onStartMotion);
              motion.setFinishedMotionHandler(onEndMotion);
            }
            if (wavBuffer) {
              this.model.wavController.start(wavBuffer);
            }
            return this.model.motionManager.startMotionPriority(motion, autoDelete, priority);
          };
          this.startRandomMotion = async (group, priority, onStartMotion, onEndMotion) => {
            var _a, _b;
            if (!this.model.loaded)
              return;
            const { motionGroups } = this.model.buffers;
            if (!group) {
              const randGroup = Math.floor(Math.random() * motionGroups.length);
              group = (_a = motionGroups[randGroup]) === null || _a === void 0 ? void 0 : _a.group;
            }
            let motionCount = (_b = motionGroups.find((g) => g.group === group)) === null || _b === void 0 ? void 0 : _b.motionData.motionBuffers.length;
            if (!motionCount)
              return;
            const rand = Math.floor(Math.random() * motionCount);
            return this.startMotion(group, rand, priority, onStartMotion, onEndMotion);
          };
          this.model = model;
        }
      };
      exports.MotionController = MotionController;
    }
  });

  // node_modules/live2d-renderer/build/renderer/ExpressionController.js
  var require_ExpressionController = __commonJS({
    "node_modules/live2d-renderer/build/renderer/ExpressionController.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExpressionController = void 0;
      var acubismmotion_1 = require_acubismmotion();
      var ExpressionController = class {
        constructor(model) {
          this.load = async () => {
            const { expressionBuffers } = this.model.buffers;
            for (let i = 0; i < expressionBuffers.length; i++) {
              const name = this.model.expressionIds[i];
              const expressionBuffer = expressionBuffers[i];
              const motion = this.model.loadExpression(expressionBuffer, expressionBuffer.byteLength, name);
              if (this.model.expressions.getValue(name) !== null) {
                acubismmotion_1.ACubismMotion.delete(this.model.expressions.getValue(name));
                this.model.expressions.setValue(name, null);
              }
              this.model.expressions.setValue(name, motion);
            }
          };
          this.update = (deltaTime) => {
            if (this.model.expressionManager != null && this.model.enableExpression) {
              this.model.expressionManager.updateMotion(this.model.model, deltaTime);
            }
          };
          this.setExpression = (expression) => {
            const motion = this.model.expressions.getValue(expression);
            if (motion !== null)
              this.model.expressionManager.startMotion(motion, false);
          };
          this.setRandomExpression = () => {
            if (!this.model.expressions.getSize())
              return;
            const rand = Math.floor(Math.random() * this.model.expressions.getSize());
            const name = this.model.expressions._keyValues[rand].first;
            this.setExpression(name);
          };
          this.model = model;
        }
      };
      exports.ExpressionController = ExpressionController;
    }
  });

  // node_modules/live2d-renderer/build/renderer/CameraController.js
  var require_CameraController = __commonJS({
    "node_modules/live2d-renderer/build/renderer/CameraController.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CameraController = void 0;
      var CameraController = class {
        constructor(model) {
          this.zoomIn = (factor = 0.1) => {
            if (!this.zoomEnabled)
              return;
            const zoomFactor = 1 + factor;
            const newScale = Math.min(this.scale * zoomFactor, this.maxScale);
            const worldX = (this.x - this.model.canvas.width / 2) / this.scale;
            const worldY = this.y / this.scale;
            this.scale = newScale;
            this.x = this.model.canvas.width / 2 + worldX * this.scale;
            this.y = worldY * this.scale;
          };
          this.zoomOut = (factor = 0.1) => {
            if (!this.zoomEnabled)
              return;
            const zoomFactor = 1 - factor;
            const newScale = Math.max(this.scale * zoomFactor, this.minScale);
            const worldX = (this.x - this.model.canvas.width / 2) / this.scale;
            const worldY = this.y / this.scale;
            this.scale = newScale;
            this.x = this.model.canvas.width / 2 + worldX * this.scale;
            this.y = worldY * this.scale;
          };
          this.handleMouseDown = (event) => {
            if (!this.enablePan)
              return;
            this.isPanning = true;
            this.lastPosition = { x: event.clientX, y: event.clientY };
          };
          this.handleMouseMove = (event) => {
            if (!this.enablePan)
              return;
            if (this.isPanning) {
              const dx = event.clientX - this.lastPosition.x;
              const dy = event.clientY - this.lastPosition.y;
              this.x -= dx * this.panSpeed;
              this.y += dy * this.panSpeed;
              this.lastPosition = { x: event.clientX, y: event.clientY };
            }
          };
          this.handleMouseUp = () => {
            if (!this.enablePan)
              return;
            this.isPanning = false;
          };
          this.handleWheel = (event) => {
            if (!this.zoomEnabled)
              return;
            event.preventDefault();
            const delta = event.deltaY;
            const scaleFactor = Math.pow(2, -delta * this.zoomStep);
            const newScale = Math.max(this.minScale, Math.min(this.scale * scaleFactor, this.maxScale));
            const bounds = this.model.canvas.getBoundingClientRect();
            const mouseX = bounds.width - (event.clientX - bounds.left);
            const mouseY = event.clientY - bounds.top - bounds.height / 2;
            const worldX = (mouseX - this.x) / this.scale;
            const worldY = (mouseY - this.y) / this.scale;
            this.scale = newScale;
            this.x = mouseX - worldX * newScale;
            this.y = mouseY - worldY * newScale;
          };
          this.handleDoubleClick = () => {
            if (this.doubleClickReset) {
              this.x = this.model.canvas.width / 2;
              this.y = 0;
              this.isPanning = false;
              this.lastPosition = { x: 0, y: 0 };
              this.scale = 1;
              this.model.centerModel();
            }
          };
          this.addListeners = () => {
            this.model.canvas.addEventListener("wheel", this.handleWheel);
            this.model.canvas.addEventListener("mousedown", this.handleMouseDown);
            window.addEventListener("mousemove", this.handleMouseMove);
            window.addEventListener("mouseup", this.handleMouseUp);
            this.model.canvas.addEventListener("dblclick", this.handleDoubleClick);
            this.model.canvas.addEventListener("contextmenu", (event) => event.preventDefault());
          };
          this.removeListeners = () => {
            this.model.canvas.removeEventListener("wheel", this.handleWheel);
            this.model.canvas.removeEventListener("mousedown", this.handleMouseDown);
            window.removeEventListener("mousemove", this.handleMouseMove);
            window.removeEventListener("mouseup", this.handleMouseUp);
            this.model.canvas.removeEventListener("dblclick", this.handleDoubleClick);
            this.model.canvas.removeEventListener("contextmenu", (event) => event.preventDefault());
          };
          this.initListeners = () => {
            this.removeListeners();
            this.addListeners();
          };
          this.model = model;
          this.x = model.canvas.width / 2;
          this.y = 0;
          this.scale = 1;
          this.minScale = 0.1;
          this.maxScale = 10;
          this.isPanning = false;
          this.lastPosition = { x: 0, y: 0 };
          this.zoomStep = 5e-3;
          this.panSpeed = 1;
        }
      };
      exports.CameraController = CameraController;
    }
  });

  // node_modules/live2d-renderer/build/renderer/WebGLRenderer.js
  var require_WebGLRenderer = __commonJS({
    "node_modules/live2d-renderer/build/renderer/WebGLRenderer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WebGLRenderer = void 0;
      var WebGLRenderer = class {
        constructor(model) {
          this.createShader = () => {
            const gl = this.model.canvas.getContext("webgl2");
            const vertexShader = gl.createShader(gl.VERTEX_SHADER);
            const vertexShaderString = `
            precision mediump float;
            attribute vec3 position;
            attribute vec2 uv;
            varying vec2 vuv;
            void main(void) {
               gl_Position = vec4(position, 1.0);
               vuv = uv;
            }`;
            gl.shaderSource(vertexShader, vertexShaderString);
            gl.compileShader(vertexShader);
            const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
            const fragmentShaderString = `
            precision mediump float;
            varying vec2 vuv;
            uniform sampler2D texture;
            void main(void) {
               gl_FragColor = texture2D(texture, vuv);
            }`;
            gl.shaderSource(fragmentShader, fragmentShaderString);
            gl.compileShader(fragmentShader);
            const shader = gl.createProgram();
            gl.attachShader(shader, vertexShader);
            gl.attachShader(shader, fragmentShader);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.linkProgram(shader);
            gl.useProgram(shader);
            return shader;
          };
          this.deleteShader = () => {
            const gl = this.model.canvas.getContext("webgl2");
            gl.deleteProgram(this.shader);
          };
          this.start = () => {
            const gl = this.model.canvas.getContext("webgl2");
            this.model.getRenderer().startUp(gl);
          };
          this.loadTexture = (index, image) => {
            var _a;
            const gl = this.model.canvas.getContext("webgl2");
            const maxTextureSize = (_a = this.model.maxTextureSize) !== null && _a !== void 0 ? _a : gl.getParameter(gl.MAX_TEXTURE_SIZE);
            let resized = image;
            if (image.width > maxTextureSize || image.height > maxTextureSize) {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const aspectRatio = image.width / image.height;
              if (image.width > image.height) {
                canvas.width = maxTextureSize;
                canvas.height = maxTextureSize / aspectRatio;
              } else {
                canvas.height = maxTextureSize;
                canvas.width = maxTextureSize * aspectRatio;
              }
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
              resized = canvas;
            }
            const tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            if (this.model.premultipliedAlpha)
              gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, resized);
            if ((resized.width & resized.width - 1) === 0 && (resized.height & resized.height - 1) === 0) {
              gl.generateMipmap(gl.TEXTURE_2D);
            }
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.model.getRenderer().bindTexture(index, tex);
            this.model.getRenderer().setIsPremultipliedAlpha(this.model.premultipliedAlpha);
          };
          this.deleteTextures = () => {
            const gl = this.model.canvas.getContext("webgl2");
            for (let i = 0; i < this.model.textures.getSize(); i++) {
              gl.deleteTexture(this.model.textures.at(i));
              this.model.textures.set(i, null);
            }
            this.model.textures.clear();
          };
          this.deleteTexture = (texture) => {
            const gl = this.model.canvas.getContext("webgl2");
            for (let i = 0; i < this.model.textures.getSize(); i++) {
              if (this.model.textures.at(i) === texture) {
                gl.deleteTexture(this.model.textures.at(i));
                this.model.textures.set(i, null);
                this.model.textures.remove(i);
                break;
              }
            }
          };
          this.resize = () => {
            const gl = this.model.canvas.getContext("webgl2");
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          };
          this.contextLost = () => {
            const gl = this.model.canvas.getContext("webgl2");
            return gl.isContextLost();
          };
          this.prepare = () => {
            const gl = this.model.canvas.getContext("webgl2");
            gl.clearColor(0, 0, 0, 0);
            gl.enable(gl.DEPTH_TEST);
            gl.depthFunc(gl.LEQUAL);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.clearDepth(1);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.useProgram(this.shader);
            gl.flush();
          };
          this.draw = () => {
            if (!this.model.loaded)
              return;
            this.model.projection.multiplyByMatrix(this.model.modelMatrix);
            this.model.getRenderer().setMvpMatrix(this.model.projection);
            const gl = this.model.canvas.getContext("webgl2");
            const viewport = [0, 0, gl.canvas.width, gl.canvas.height];
            const frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
            this.model.getRenderer().setRenderState(frameBuffer, viewport);
            this.model.getRenderer().drawModel();
          };
          this.model = model;
          this.shader = this.createShader();
        }
      };
      exports.WebGLRenderer = WebGLRenderer;
    }
  });

  // src/renderer/shared/path-browser.js
  var require_path_browser = __commonJS({
    "src/renderer/shared/path-browser.js"(exports, module) {
      function extname(p) {
        const i = p.lastIndexOf(".");
        return i >= 0 ? p.slice(i) : "";
      }
      function dirname(p) {
        const i = p.lastIndexOf("/");
        return i >= 0 ? p.slice(0, i) : ".";
      }
      function join(...args) {
        return args.map((a, i) => i === 0 ? a : a.replace(/^\/+/, "")).join("/").replace(/\/+$/, "");
      }
      function basename(p, ext) {
        const parts = p.split("/");
        let name = parts[parts.length - 1] || "";
        if (ext && name.endsWith(ext)) name = name.slice(0, -ext.length);
        return name;
      }
      module.exports = { extname, dirname, join, basename };
      module.exports.default = module.exports;
    }
  });

  // node_modules/jszip/dist/jszip.min.js
  var require_jszip_min = __commonJS({
    "node_modules/jszip/dist/jszip.min.js"(exports, module) {
      !(function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
          ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
        }
      })(function() {
        return (function s(a, o, h) {
          function u(r, e2) {
            if (!o[r]) {
              if (!a[r]) {
                var t = "function" == typeof __require && __require;
                if (!e2 && t) return t(r, true);
                if (l) return l(r, true);
                var n = new Error("Cannot find module '" + r + "'");
                throw n.code = "MODULE_NOT_FOUND", n;
              }
              var i = o[r] = { exports: {} };
              a[r][0].call(i.exports, function(e3) {
                var t2 = a[r][1][e3];
                return u(t2 || e3);
              }, i, i.exports, s, a, o, h);
            }
            return o[r].exports;
          }
          for (var l = "function" == typeof __require && __require, e = 0; e < h.length; e++) u(h[e]);
          return u;
        })({ 1: [function(e, t, r) {
          "use strict";
          var d = e("./utils"), c = e("./support"), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          r.encode = function(e2) {
            for (var t2, r2, n, i, s, a, o, h = [], u = 0, l = e2.length, f = l, c2 = "string" !== d.getTypeOf(e2); u < e2.length; ) f = l - u, n = c2 ? (t2 = e2[u++], r2 = u < l ? e2[u++] : 0, u < l ? e2[u++] : 0) : (t2 = e2.charCodeAt(u++), r2 = u < l ? e2.charCodeAt(u++) : 0, u < l ? e2.charCodeAt(u++) : 0), i = t2 >> 2, s = (3 & t2) << 4 | r2 >> 4, a = 1 < f ? (15 & r2) << 2 | n >> 6 : 64, o = 2 < f ? 63 & n : 64, h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
            return h.join("");
          }, r.decode = function(e2) {
            var t2, r2, n, i, s, a, o = 0, h = 0, u = "data:";
            if (e2.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
            var l, f = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
            if (e2.charAt(e2.length - 1) === p.charAt(64) && f--, e2.charAt(e2.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
            for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e2.length; ) t2 = p.indexOf(e2.charAt(o++)) << 2 | (i = p.indexOf(e2.charAt(o++))) >> 4, r2 = (15 & i) << 4 | (s = p.indexOf(e2.charAt(o++))) >> 2, n = (3 & s) << 6 | (a = p.indexOf(e2.charAt(o++))), l[h++] = t2, 64 !== s && (l[h++] = r2), 64 !== a && (l[h++] = n);
            return l;
          };
        }, { "./support": 30, "./utils": 32 }], 2: [function(e, t, r) {
          "use strict";
          var n = e("./external"), i = e("./stream/DataWorker"), s = e("./stream/Crc32Probe"), a = e("./stream/DataLengthProbe");
          function o(e2, t2, r2, n2, i2) {
            this.compressedSize = e2, this.uncompressedSize = t2, this.crc32 = r2, this.compression = n2, this.compressedContent = i2;
          }
          o.prototype = { getContentWorker: function() {
            var e2 = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t2 = this;
            return e2.on("end", function() {
              if (this.streamInfo.data_length !== t2.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), e2;
          }, getCompressedWorker: function() {
            return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          } }, o.createWorkerFrom = function(e2, t2, r2) {
            return e2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t2.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", t2);
          }, t.exports = o;
        }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e, t, r) {
          "use strict";
          var n = e("./stream/GenericWorker");
          r.STORE = { magic: "\0\0", compressWorker: function() {
            return new n("STORE compression");
          }, uncompressWorker: function() {
            return new n("STORE decompression");
          } }, r.DEFLATE = e("./flate");
        }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e, t, r) {
          "use strict";
          var n = e("./utils");
          var o = (function() {
            for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t2[r2] = e2;
            }
            return t2;
          })();
          t.exports = function(e2, t2) {
            return void 0 !== e2 && e2.length ? "string" !== n.getTypeOf(e2) ? (function(e3, t3, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3[a])];
              return -1 ^ e3;
            })(0 | t2, e2, e2.length, 0) : (function(e3, t3, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3.charCodeAt(a))];
              return -1 ^ e3;
            })(0 | t2, e2, e2.length, 0) : 0;
          };
        }, { "./utils": 32 }], 5: [function(e, t, r) {
          "use strict";
          r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
        }, {}], 6: [function(e, t, r) {
          "use strict";
          var n = null;
          n = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = { Promise: n };
        }, { lie: 37 }], 7: [function(e, t, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), o = n ? "uint8array" : "array";
          function h(e2, t2) {
            a.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t2, this.meta = {};
          }
          r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(e2) {
            this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e2.data), false);
          }, h.prototype.flush = function() {
            a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
          }, h.prototype.cleanUp = function() {
            a.prototype.cleanUp.call(this), this._pako = null;
          }, h.prototype._createPako = function() {
            this._pako = new i[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
            var t2 = this;
            this._pako.onData = function(e2) {
              t2.push({ data: e2, meta: t2.meta });
            };
          }, r.compressWorker = function(e2) {
            return new h("Deflate", e2);
          }, r.uncompressWorker = function() {
            return new h("Inflate", {});
          };
        }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e, t, r) {
          "use strict";
          function A(e2, t2) {
            var r2, n2 = "";
            for (r2 = 0; r2 < t2; r2++) n2 += String.fromCharCode(255 & e2), e2 >>>= 8;
            return n2;
          }
          function n(e2, t2, r2, n2, i2, s2) {
            var a, o, h = e2.file, u = e2.compression, l = s2 !== O.utf8encode, f = I.transformTo("string", s2(h.name)), c = I.transformTo("string", O.utf8encode(h.name)), d = h.comment, p = I.transformTo("string", s2(d)), m = I.transformTo("string", O.utf8encode(d)), _ = c.length !== h.name.length, g = m.length !== d.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
            t2 && !r2 || (x.crc32 = e2.crc32, x.compressedSize = e2.compressedSize, x.uncompressedSize = e2.uncompressedSize);
            var S = 0;
            t2 && (S |= 8), l || !_ && !g || (S |= 2048);
            var z = 0, C = 0;
            w && (z |= 16), "UNIX" === i2 ? (C = 798, z |= (function(e3, t3) {
              var r3 = e3;
              return e3 || (r3 = t3 ? 16893 : 33204), (65535 & r3) << 16;
            })(h.unixPermissions, w)) : (C = 20, z |= (function(e3) {
              return 63 & (e3 || 0);
            })(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + c, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
            var E = "";
            return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + E + f + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n2, 4) + f + b + p };
          }
          var I = e("../utils"), i = e("../stream/GenericWorker"), O = e("../utf8"), B = e("../crc32"), R = e("../signature");
          function s(e2, t2, r2, n2) {
            i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t2, this.zipPlatform = r2, this.encodeFileName = n2, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
          }
          I.inherits(s, i), s.prototype.push = function(e2) {
            var t2 = e2.meta.percent || 0, r2 = this.entriesCount, n2 = this._sources.length;
            this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i.prototype.push.call(this, { data: e2.data, meta: { currentFile: this.currentFile, percent: r2 ? (t2 + 100 * (r2 - n2 - 1)) / r2 : 100 } }));
          }, s.prototype.openedSource = function(e2) {
            this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
            var t2 = this.streamFiles && !e2.file.dir;
            if (t2) {
              var r2 = n(e2, t2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
              this.push({ data: r2.fileRecord, meta: { percent: 0 } });
            } else this.accumulate = true;
          }, s.prototype.closedSource = function(e2) {
            this.accumulate = false;
            var t2 = this.streamFiles && !e2.file.dir, r2 = n(e2, t2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(r2.dirRecord), t2) this.push({ data: (function(e3) {
              return R.DATA_DESCRIPTOR + A(e3.crc32, 4) + A(e3.compressedSize, 4) + A(e3.uncompressedSize, 4);
            })(e2), meta: { percent: 100 } });
            else for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
            this.currentFile = null;
          }, s.prototype.flush = function() {
            for (var e2 = this.bytesWritten, t2 = 0; t2 < this.dirRecords.length; t2++) this.push({ data: this.dirRecords[t2], meta: { percent: 100 } });
            var r2 = this.bytesWritten - e2, n2 = (function(e3, t3, r3, n3, i2) {
              var s2 = I.transformTo("string", i2(n3));
              return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e3, 2) + A(e3, 2) + A(t3, 4) + A(r3, 4) + A(s2.length, 2) + s2;
            })(this.dirRecords.length, r2, e2, this.zipComment, this.encodeFileName);
            this.push({ data: n2, meta: { percent: 100 } });
          }, s.prototype.prepareNextSource = function() {
            this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
          }, s.prototype.registerPrevious = function(e2) {
            this._sources.push(e2);
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.closedSource(t2.previous.streamInfo), t2._sources.length ? t2.prepareNextSource() : t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
          }, s.prototype.error = function(e2) {
            var t2 = this._sources;
            if (!i.prototype.error.call(this, e2)) return false;
            for (var r2 = 0; r2 < t2.length; r2++) try {
              t2[r2].error(e2);
            } catch (e3) {
            }
            return true;
          }, s.prototype.lock = function() {
            i.prototype.lock.call(this);
            for (var e2 = this._sources, t2 = 0; t2 < e2.length; t2++) e2[t2].lock();
          }, t.exports = s;
        }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e, t, r) {
          "use strict";
          var u = e("../compressions"), n = e("./ZipFileWorker");
          r.generateWorker = function(e2, a, t2) {
            var o = new n(a.streamFiles, t2, a.platform, a.encodeFileName), h = 0;
            try {
              e2.forEach(function(e3, t3) {
                h++;
                var r2 = (function(e4, t4) {
                  var r3 = e4 || t4, n3 = u[r3];
                  if (!n3) throw new Error(r3 + " is not a valid compression method !");
                  return n3;
                })(t3.options.compression, a.compression), n2 = t3.options.compressionOptions || a.compressionOptions || {}, i = t3.dir, s = t3.date;
                t3._compressWorker(r2, n2).withStreamInfo("file", { name: e3, dir: i, date: s, comment: t3.comment || "", unixPermissions: t3.unixPermissions, dosPermissions: t3.dosPermissions }).pipe(o);
              }), o.entriesCount = h;
            } catch (e3) {
              o.error(e3);
            }
            return o;
          };
        }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e, t, r) {
          "use strict";
          function n() {
            if (!(this instanceof n)) return new n();
            if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
              var e2 = new n();
              for (var t2 in this) "function" != typeof this[t2] && (e2[t2] = this[t2]);
              return e2;
            };
          }
          (n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.10.1", n.loadAsync = function(e2, t2) {
            return new n().loadAsync(e2, t2);
          }, n.external = e("./external"), t.exports = n;
        }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e, t, r) {
          "use strict";
          var u = e("./utils"), i = e("./external"), n = e("./utf8"), s = e("./zipEntries"), a = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
          function f(n2) {
            return new i.Promise(function(e2, t2) {
              var r2 = n2.decompressed.getContentWorker().pipe(new a());
              r2.on("error", function(e3) {
                t2(e3);
              }).on("end", function() {
                r2.streamInfo.crc32 !== n2.decompressed.crc32 ? t2(new Error("Corrupted zip : CRC32 mismatch")) : e2();
              }).resume();
            });
          }
          t.exports = function(e2, o) {
            var h = this;
            return o = u.extend(o || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n.utf8decode }), l.isNode && l.isStream(e2) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e2, true, o.optimizedBinaryString, o.base64).then(function(e3) {
              var t2 = new s(o);
              return t2.load(e3), t2;
            }).then(function(e3) {
              var t2 = [i.Promise.resolve(e3)], r2 = e3.files;
              if (o.checkCRC32) for (var n2 = 0; n2 < r2.length; n2++) t2.push(f(r2[n2]));
              return i.Promise.all(t2);
            }).then(function(e3) {
              for (var t2 = e3.shift(), r2 = t2.files, n2 = 0; n2 < r2.length; n2++) {
                var i2 = r2[n2], s2 = i2.fileNameStr, a2 = u.resolve(i2.fileNameStr);
                h.file(a2, i2.decompressed, { binary: true, optimizedBinaryString: true, date: i2.date, dir: i2.dir, comment: i2.fileCommentStr.length ? i2.fileCommentStr : null, unixPermissions: i2.unixPermissions, dosPermissions: i2.dosPermissions, createFolders: o.createFolders }), i2.dir || (h.file(a2).unsafeOriginalName = s2);
              }
              return t2.zipComment.length && (h.comment = t2.zipComment), h;
            });
          };
        }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("../stream/GenericWorker");
          function s(e2, t2) {
            i.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t2);
          }
          n.inherits(s, i), s.prototype._bindStream = function(e2) {
            var t2 = this;
            (this._stream = e2).pause(), e2.on("data", function(e3) {
              t2.push({ data: e3, meta: { percent: 0 } });
            }).on("error", function(e3) {
              t2.isPaused ? this.generatedError = e3 : t2.error(e3);
            }).on("end", function() {
              t2.isPaused ? t2._upstreamEnded = true : t2.end();
            });
          }, s.prototype.pause = function() {
            return !!i.prototype.pause.call(this) && (this._stream.pause(), true);
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
          }, t.exports = s;
        }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e, t, r) {
          "use strict";
          var i = e("readable-stream").Readable;
          function n(e2, t2, r2) {
            i.call(this, t2), this._helper = e2;
            var n2 = this;
            e2.on("data", function(e3, t3) {
              n2.push(e3) || n2._helper.pause(), r2 && r2(t3);
            }).on("error", function(e3) {
              n2.emit("error", e3);
            }).on("end", function() {
              n2.push(null);
            });
          }
          e("../utils").inherits(n, i), n.prototype._read = function() {
            this._helper.resume();
          }, t.exports = n;
        }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e, t, r) {
          "use strict";
          t.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e2, t2) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t2);
            if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
            return new Buffer(e2, t2);
          }, allocBuffer: function(e2) {
            if (Buffer.alloc) return Buffer.alloc(e2);
            var t2 = new Buffer(e2);
            return t2.fill(0), t2;
          }, isBuffer: function(e2) {
            return Buffer.isBuffer(e2);
          }, isStream: function(e2) {
            return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
          } };
        }, {}], 15: [function(e, t, r) {
          "use strict";
          function s(e2, t2, r2) {
            var n2, i2 = u.getTypeOf(t2), s2 = u.extend(r2 || {}, f);
            s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e2 = g(e2)), s2.createFolders && (n2 = _(e2)) && b.call(this, n2, true);
            var a2 = "string" === i2 && false === s2.binary && false === s2.base64;
            r2 && void 0 !== r2.binary || (s2.binary = !a2), (t2 instanceof c && 0 === t2.uncompressedSize || s2.dir || !t2 || 0 === t2.length) && (s2.base64 = false, s2.binary = true, t2 = "", s2.compression = "STORE", i2 = "string");
            var o2 = null;
            o2 = t2 instanceof c || t2 instanceof l ? t2 : p.isNode && p.isStream(t2) ? new m(e2, t2) : u.prepareContent(e2, t2, s2.binary, s2.optimizedBinaryString, s2.base64);
            var h2 = new d(e2, o2, s2);
            this.files[e2] = h2;
          }
          var i = e("./utf8"), u = e("./utils"), l = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), f = e("./defaults"), c = e("./compressedObject"), d = e("./zipObject"), o = e("./generate"), p = e("./nodejsUtils"), m = e("./nodejs/NodejsStreamInputAdapter"), _ = function(e2) {
            "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
            var t2 = e2.lastIndexOf("/");
            return 0 < t2 ? e2.substring(0, t2) : "";
          }, g = function(e2) {
            return "/" !== e2.slice(-1) && (e2 += "/"), e2;
          }, b = function(e2, t2) {
            return t2 = void 0 !== t2 ? t2 : f.createFolders, e2 = g(e2), this.files[e2] || s.call(this, e2, null, { dir: true, createFolders: t2 }), this.files[e2];
          };
          function h(e2) {
            return "[object RegExp]" === Object.prototype.toString.call(e2);
          }
          var n = { load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, forEach: function(e2) {
            var t2, r2, n2;
            for (t2 in this.files) n2 = this.files[t2], (r2 = t2.slice(this.root.length, t2.length)) && t2.slice(0, this.root.length) === this.root && e2(r2, n2);
          }, filter: function(r2) {
            var n2 = [];
            return this.forEach(function(e2, t2) {
              r2(e2, t2) && n2.push(t2);
            }), n2;
          }, file: function(e2, t2, r2) {
            if (1 !== arguments.length) return e2 = this.root + e2, s.call(this, e2, t2, r2), this;
            if (h(e2)) {
              var n2 = e2;
              return this.filter(function(e3, t3) {
                return !t3.dir && n2.test(e3);
              });
            }
            var i2 = this.files[this.root + e2];
            return i2 && !i2.dir ? i2 : null;
          }, folder: function(r2) {
            if (!r2) return this;
            if (h(r2)) return this.filter(function(e3, t3) {
              return t3.dir && r2.test(e3);
            });
            var e2 = this.root + r2, t2 = b.call(this, e2), n2 = this.clone();
            return n2.root = t2.name, n2;
          }, remove: function(r2) {
            r2 = this.root + r2;
            var e2 = this.files[r2];
            if (e2 || ("/" !== r2.slice(-1) && (r2 += "/"), e2 = this.files[r2]), e2 && !e2.dir) delete this.files[r2];
            else for (var t2 = this.filter(function(e3, t3) {
              return t3.name.slice(0, r2.length) === r2;
            }), n2 = 0; n2 < t2.length; n2++) delete this.files[t2[n2].name];
            return this;
          }, generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, generateInternalStream: function(e2) {
            var t2, r2 = {};
            try {
              if ((r2 = u.extend(e2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type) throw new Error("No output type specified.");
              u.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
              var n2 = r2.comment || this.comment || "";
              t2 = o.generateWorker(this, r2, n2);
            } catch (e3) {
              (t2 = new l("error")).error(e3);
            }
            return new a(t2, r2.type || "string", r2.mimeType);
          }, generateAsync: function(e2, t2) {
            return this.generateInternalStream(e2).accumulate(t2);
          }, generateNodeStream: function(e2, t2) {
            return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t2);
          } };
          t.exports = n;
        }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e, t, r) {
          "use strict";
          t.exports = e("stream");
        }, { stream: void 0 }], 17: [function(e, t, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
            for (var t2 = 0; t2 < this.data.length; t2++) e2[t2] = 255 & e2[t2];
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data[this.zero + e2];
          }, i.prototype.lastIndexOfSignature = function(e2) {
            for (var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t2 && this.data[s + 1] === r2 && this.data[s + 2] === n2 && this.data[s + 3] === i2) return s - this.zero;
            return -1;
          }, i.prototype.readAndCheckSignature = function(e2) {
            var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.readData(4);
            return t2 === s[0] && r2 === s[1] && n2 === s[2] && i2 === s[3];
          }, i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return [];
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e, t, r) {
          "use strict";
          var n = e("../utils");
          function i(e2) {
            this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
          }
          i.prototype = { checkOffset: function(e2) {
            this.checkIndex(this.index + e2);
          }, checkIndex: function(e2) {
            if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
          }, setIndex: function(e2) {
            this.checkIndex(e2), this.index = e2;
          }, skip: function(e2) {
            this.setIndex(this.index + e2);
          }, byteAt: function() {
          }, readInt: function(e2) {
            var t2, r2 = 0;
            for (this.checkOffset(e2), t2 = this.index + e2 - 1; t2 >= this.index; t2--) r2 = (r2 << 8) + this.byteAt(t2);
            return this.index += e2, r2;
          }, readString: function(e2) {
            return n.transformTo("string", this.readData(e2));
          }, readData: function() {
          }, lastIndexOfSignature: function() {
          }, readAndCheckSignature: function() {
          }, readDate: function() {
            var e2 = this.readInt(4);
            return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
          } }, t.exports = i;
        }, { "../utils": 32 }], 19: [function(e, t, r) {
          "use strict";
          var n = e("./Uint8ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e, t, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data.charCodeAt(this.zero + e2);
          }, i.prototype.lastIndexOfSignature = function(e2) {
            return this.data.lastIndexOf(e2) - this.zero;
          }, i.prototype.readAndCheckSignature = function(e2) {
            return e2 === this.readData(4);
          }, i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e, t, r) {
          "use strict";
          var n = e("./ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
            var t2 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("../support"), s = e("./ArrayReader"), a = e("./StringReader"), o = e("./NodeBufferReader"), h = e("./Uint8ArrayReader");
          t.exports = function(e2) {
            var t2 = n.getTypeOf(e2);
            return n.checkSupport(t2), "string" !== t2 || i.uint8array ? "nodebuffer" === t2 ? new o(e2) : i.uint8array ? new h(n.transformTo("uint8array", e2)) : new s(n.transformTo("array", e2)) : new a(e2);
          };
        }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e, t, r) {
          "use strict";
          r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
        }, {}], 24: [function(e, t, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../utils");
          function s(e2) {
            n.call(this, "ConvertWorker to " + e2), this.destType = e2;
          }
          i.inherits(s, n), s.prototype.processChunk = function(e2) {
            this.push({ data: i.transformTo(this.destType, e2.data), meta: e2.meta });
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e, t, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../crc32");
          function s() {
            n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
          }
          e("../utils").inherits(s, n), s.prototype.processChunk = function(e2) {
            this.streamInfo.crc32 = i(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
          }, t.exports = s;
        }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
          }
          n.inherits(s, i), s.prototype.processChunk = function(e2) {
            if (e2) {
              var t2 = this.streamInfo[this.propName] || 0;
              this.streamInfo[this.propName] = t2 + e2.data.length;
            }
            i.prototype.processChunk.call(this, e2);
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataWorker");
            var t2 = this;
            this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
              t2.dataIsReady = true, t2.data = e3, t2.max = e3 && e3.length || 0, t2.type = n.getTypeOf(e3), t2.isPaused || t2._tickAndRepeat();
            }, function(e3) {
              t2.error(e3);
            });
          }
          n.inherits(s, i), s.prototype.cleanUp = function() {
            i.prototype.cleanUp.call(this), this.data = null;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n.delay(this._tickAndRepeat, [], this)), true);
          }, s.prototype._tickAndRepeat = function() {
            this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
          }, s.prototype._tick = function() {
            if (this.isPaused || this.isFinished) return false;
            var e2 = null, t2 = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max) return this.end();
            switch (this.type) {
              case "string":
                e2 = this.data.substring(this.index, t2);
                break;
              case "uint8array":
                e2 = this.data.subarray(this.index, t2);
                break;
              case "array":
              case "nodebuffer":
                e2 = this.data.slice(this.index, t2);
            }
            return this.index = t2, this.push({ data: e2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e, t, r) {
          "use strict";
          function n(e2) {
            this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
          }
          n.prototype = { push: function(e2) {
            this.emit("data", e2);
          }, end: function() {
            if (this.isFinished) return false;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = true;
            } catch (e2) {
              this.emit("error", e2);
            }
            return true;
          }, error: function(e2) {
            return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
          }, on: function(e2, t2) {
            return this._listeners[e2].push(t2), this;
          }, cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          }, emit: function(e2, t2) {
            if (this._listeners[e2]) for (var r2 = 0; r2 < this._listeners[e2].length; r2++) this._listeners[e2][r2].call(this, t2);
          }, pipe: function(e2) {
            return e2.registerPrevious(this);
          }, registerPrevious: function(e2) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          }, pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
          }, resume: function() {
            if (!this.isPaused || this.isFinished) return false;
            var e2 = this.isPaused = false;
            return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
          }, flush: function() {
          }, processChunk: function(e2) {
            this.push(e2);
          }, withStreamInfo: function(e2, t2) {
            return this.extraStreamInfo[e2] = t2, this.mergeStreamInfo(), this;
          }, mergeStreamInfo: function() {
            for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
          }, lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = true, this.previous && this.previous.lock();
          }, toString: function() {
            var e2 = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + e2 : e2;
          } }, t.exports = n;
        }, {}], 29: [function(e, t, r) {
          "use strict";
          var h = e("../utils"), i = e("./ConvertWorker"), s = e("./GenericWorker"), u = e("../base64"), n = e("../support"), a = e("../external"), o = null;
          if (n.nodestream) try {
            o = e("../nodejs/NodejsStreamOutputAdapter");
          } catch (e2) {
          }
          function l(e2, o2) {
            return new a.Promise(function(t2, r2) {
              var n2 = [], i2 = e2._internalType, s2 = e2._outputType, a2 = e2._mimeType;
              e2.on("data", function(e3, t3) {
                n2.push(e3), o2 && o2(t3);
              }).on("error", function(e3) {
                n2 = [], r2(e3);
              }).on("end", function() {
                try {
                  var e3 = (function(e4, t3, r3) {
                    switch (e4) {
                      case "blob":
                        return h.newBlob(h.transformTo("arraybuffer", t3), r3);
                      case "base64":
                        return u.encode(t3);
                      default:
                        return h.transformTo(e4, t3);
                    }
                  })(s2, (function(e4, t3) {
                    var r3, n3 = 0, i3 = null, s3 = 0;
                    for (r3 = 0; r3 < t3.length; r3++) s3 += t3[r3].length;
                    switch (e4) {
                      case "string":
                        return t3.join("");
                      case "array":
                        return Array.prototype.concat.apply([], t3);
                      case "uint8array":
                        for (i3 = new Uint8Array(s3), r3 = 0; r3 < t3.length; r3++) i3.set(t3[r3], n3), n3 += t3[r3].length;
                        return i3;
                      case "nodebuffer":
                        return Buffer.concat(t3);
                      default:
                        throw new Error("concat : unsupported type '" + e4 + "'");
                    }
                  })(i2, n2), a2);
                  t2(e3);
                } catch (e4) {
                  r2(e4);
                }
                n2 = [];
              }).resume();
            });
          }
          function f(e2, t2, r2) {
            var n2 = t2;
            switch (t2) {
              case "blob":
              case "arraybuffer":
                n2 = "uint8array";
                break;
              case "base64":
                n2 = "string";
            }
            try {
              this._internalType = n2, this._outputType = t2, this._mimeType = r2, h.checkSupport(n2), this._worker = e2.pipe(new i(n2)), e2.lock();
            } catch (e3) {
              this._worker = new s("error"), this._worker.error(e3);
            }
          }
          f.prototype = { accumulate: function(e2) {
            return l(this, e2);
          }, on: function(e2, t2) {
            var r2 = this;
            return "data" === e2 ? this._worker.on(e2, function(e3) {
              t2.call(r2, e3.data, e3.meta);
            }) : this._worker.on(e2, function() {
              h.delay(t2, arguments, r2);
            }), this;
          }, resume: function() {
            return h.delay(this._worker.resume, [], this._worker), this;
          }, pause: function() {
            return this._worker.pause(), this;
          }, toNodejsStream: function(e2) {
            if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
            return new o(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
          } }, t.exports = f;
        }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e, t, r) {
          "use strict";
          if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = false;
          else {
            var n = new ArrayBuffer(0);
            try {
              r.blob = 0 === new Blob([n], { type: "application/zip" }).size;
            } catch (e2) {
              try {
                var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                i.append(n), r.blob = 0 === i.getBlob("application/zip").size;
              } catch (e3) {
                r.blob = false;
              }
            }
          }
          try {
            r.nodestream = !!e("readable-stream").Readable;
          } catch (e2) {
            r.nodestream = false;
          }
        }, { "readable-stream": 16 }], 31: [function(e, t, s) {
          "use strict";
          for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
          u[254] = u[254] = 1;
          function a() {
            n.call(this, "utf-8 decode"), this.leftOver = null;
          }
          function l() {
            n.call(this, "utf-8 encode");
          }
          s.utf8encode = function(e2) {
            return h.nodebuffer ? r.newBufferFrom(e2, "utf-8") : (function(e3) {
              var t2, r2, n2, i2, s2, a2 = e3.length, o2 = 0;
              for (i2 = 0; i2 < a2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
              for (t2 = h.uint8array ? new Uint8Array(o2) : new Array(o2), i2 = s2 = 0; s2 < o2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
              return t2;
            })(e2);
          }, s.utf8decode = function(e2) {
            return h.nodebuffer ? o.transformTo("nodebuffer", e2).toString("utf-8") : (function(e3) {
              var t2, r2, n2, i2, s2 = e3.length, a2 = new Array(2 * s2);
              for (t2 = r2 = 0; t2 < s2; ) if ((n2 = e3[t2++]) < 128) a2[r2++] = n2;
              else if (4 < (i2 = u[n2])) a2[r2++] = 65533, t2 += i2 - 1;
              else {
                for (n2 &= 2 === i2 ? 31 : 3 === i2 ? 15 : 7; 1 < i2 && t2 < s2; ) n2 = n2 << 6 | 63 & e3[t2++], i2--;
                1 < i2 ? a2[r2++] = 65533 : n2 < 65536 ? a2[r2++] = n2 : (n2 -= 65536, a2[r2++] = 55296 | n2 >> 10 & 1023, a2[r2++] = 56320 | 1023 & n2);
              }
              return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o.applyFromCharCode(a2);
            })(e2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2));
          }, o.inherits(a, n), a.prototype.processChunk = function(e2) {
            var t2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2.data);
            if (this.leftOver && this.leftOver.length) {
              if (h.uint8array) {
                var r2 = t2;
                (t2 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t2.set(r2, this.leftOver.length);
              } else t2 = this.leftOver.concat(t2);
              this.leftOver = null;
            }
            var n2 = (function(e3, t3) {
              var r3;
              for ((t3 = t3 || e3.length) > e3.length && (t3 = e3.length), r3 = t3 - 1; 0 <= r3 && 128 == (192 & e3[r3]); ) r3--;
              return r3 < 0 ? t3 : 0 === r3 ? t3 : r3 + u[e3[r3]] > t3 ? r3 : t3;
            })(t2), i2 = t2;
            n2 !== t2.length && (h.uint8array ? (i2 = t2.subarray(0, n2), this.leftOver = t2.subarray(n2, t2.length)) : (i2 = t2.slice(0, n2), this.leftOver = t2.slice(n2, t2.length))), this.push({ data: s.utf8decode(i2), meta: e2.meta });
          }, a.prototype.flush = function() {
            this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
          }, s.Utf8DecodeWorker = a, o.inherits(l, n), l.prototype.processChunk = function(e2) {
            this.push({ data: s.utf8encode(e2.data), meta: e2.meta });
          }, s.Utf8EncodeWorker = l;
        }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e, t, a) {
          "use strict";
          var o = e("./support"), h = e("./base64"), r = e("./nodejsUtils"), u = e("./external");
          function n(e2) {
            return e2;
          }
          function l(e2, t2) {
            for (var r2 = 0; r2 < e2.length; ++r2) t2[r2] = 255 & e2.charCodeAt(r2);
            return t2;
          }
          e("setimmediate"), a.newBlob = function(t2, r2) {
            a.checkSupport("blob");
            try {
              return new Blob([t2], { type: r2 });
            } catch (e2) {
              try {
                var n2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                return n2.append(t2), n2.getBlob(r2);
              } catch (e3) {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          };
          var i = { stringifyByChunk: function(e2, t2, r2) {
            var n2 = [], i2 = 0, s2 = e2.length;
            if (s2 <= r2) return String.fromCharCode.apply(null, e2);
            for (; i2 < s2; ) "array" === t2 || "nodebuffer" === t2 ? n2.push(String.fromCharCode.apply(null, e2.slice(i2, Math.min(i2 + r2, s2)))) : n2.push(String.fromCharCode.apply(null, e2.subarray(i2, Math.min(i2 + r2, s2)))), i2 += r2;
            return n2.join("");
          }, stringifyByChar: function(e2) {
            for (var t2 = "", r2 = 0; r2 < e2.length; r2++) t2 += String.fromCharCode(e2[r2]);
            return t2;
          }, applyCanBeUsed: { uint8array: (function() {
            try {
              return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
            } catch (e2) {
              return false;
            }
          })(), nodebuffer: (function() {
            try {
              return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
            } catch (e2) {
              return false;
            }
          })() } };
          function s(e2) {
            var t2 = 65536, r2 = a.getTypeOf(e2), n2 = true;
            if ("uint8array" === r2 ? n2 = i.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n2 = i.applyCanBeUsed.nodebuffer), n2) for (; 1 < t2; ) try {
              return i.stringifyByChunk(e2, r2, t2);
            } catch (e3) {
              t2 = Math.floor(t2 / 2);
            }
            return i.stringifyByChar(e2);
          }
          function f(e2, t2) {
            for (var r2 = 0; r2 < e2.length; r2++) t2[r2] = e2[r2];
            return t2;
          }
          a.applyFromCharCode = s;
          var c = {};
          c.string = { string: n, array: function(e2) {
            return l(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.string.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return l(e2, new Uint8Array(e2.length));
          }, nodebuffer: function(e2) {
            return l(e2, r.allocBuffer(e2.length));
          } }, c.array = { string: s, array: n, arraybuffer: function(e2) {
            return new Uint8Array(e2).buffer;
          }, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.arraybuffer = { string: function(e2) {
            return s(new Uint8Array(e2));
          }, array: function(e2) {
            return f(new Uint8Array(e2), new Array(e2.byteLength));
          }, arraybuffer: n, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(new Uint8Array(e2));
          } }, c.uint8array = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return e2.buffer;
          }, uint8array: n, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.nodebuffer = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.nodebuffer.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return f(e2, new Uint8Array(e2.length));
          }, nodebuffer: n }, a.transformTo = function(e2, t2) {
            if (t2 = t2 || "", !e2) return t2;
            a.checkSupport(e2);
            var r2 = a.getTypeOf(t2);
            return c[r2][e2](t2);
          }, a.resolve = function(e2) {
            for (var t2 = e2.split("/"), r2 = [], n2 = 0; n2 < t2.length; n2++) {
              var i2 = t2[n2];
              "." === i2 || "" === i2 && 0 !== n2 && n2 !== t2.length - 1 || (".." === i2 ? r2.pop() : r2.push(i2));
            }
            return r2.join("/");
          }, a.getTypeOf = function(e2) {
            return "string" == typeof e2 ? "string" : "[object Array]" === Object.prototype.toString.call(e2) ? "array" : o.nodebuffer && r.isBuffer(e2) ? "nodebuffer" : o.uint8array && e2 instanceof Uint8Array ? "uint8array" : o.arraybuffer && e2 instanceof ArrayBuffer ? "arraybuffer" : void 0;
          }, a.checkSupport = function(e2) {
            if (!o[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
          }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e2) {
            var t2, r2, n2 = "";
            for (r2 = 0; r2 < (e2 || "").length; r2++) n2 += "\\x" + ((t2 = e2.charCodeAt(r2)) < 16 ? "0" : "") + t2.toString(16).toUpperCase();
            return n2;
          }, a.delay = function(e2, t2, r2) {
            setImmediate(function() {
              e2.apply(r2 || null, t2 || []);
            });
          }, a.inherits = function(e2, t2) {
            function r2() {
            }
            r2.prototype = t2.prototype, e2.prototype = new r2();
          }, a.extend = function() {
            var e2, t2, r2 = {};
            for (e2 = 0; e2 < arguments.length; e2++) for (t2 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t2) && void 0 === r2[t2] && (r2[t2] = arguments[e2][t2]);
            return r2;
          }, a.prepareContent = function(r2, e2, n2, i2, s2) {
            return u.Promise.resolve(e2).then(function(n3) {
              return o.blob && (n3 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n3))) && "undefined" != typeof FileReader ? new u.Promise(function(t2, r3) {
                var e3 = new FileReader();
                e3.onload = function(e4) {
                  t2(e4.target.result);
                }, e3.onerror = function(e4) {
                  r3(e4.target.error);
                }, e3.readAsArrayBuffer(n3);
              }) : n3;
            }).then(function(e3) {
              var t2 = a.getTypeOf(e3);
              return t2 ? ("arraybuffer" === t2 ? e3 = a.transformTo("uint8array", e3) : "string" === t2 && (s2 ? e3 = h.decode(e3) : n2 && true !== i2 && (e3 = (function(e4) {
                return l(e4, o.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
              })(e3))), e3) : u.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
            });
          };
        }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e, t, r) {
          "use strict";
          var n = e("./reader/readerFor"), i = e("./utils"), s = e("./signature"), a = e("./zipEntry"), o = e("./support");
          function h(e2) {
            this.files = [], this.loadOptions = e2;
          }
          h.prototype = { checkSignature: function(e2) {
            if (!this.reader.readAndCheckSignature(e2)) {
              this.reader.index -= 4;
              var t2 = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t2) + ", expected " + i.pretty(e2) + ")");
            }
          }, isSignature: function(e2, t2) {
            var r2 = this.reader.index;
            this.reader.setIndex(e2);
            var n2 = this.reader.readString(4) === t2;
            return this.reader.setIndex(r2), n2;
          }, readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var e2 = this.reader.readData(this.zipCommentLength), t2 = o.uint8array ? "uint8array" : "array", r2 = i.transformTo(t2, e2);
            this.zipComment = this.loadOptions.decodeFileName(r2);
          }, readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var e2, t2, r2, n2 = this.zip64EndOfCentralSize - 44; 0 < n2; ) e2 = this.reader.readInt(2), t2 = this.reader.readInt(4), r2 = this.reader.readData(t2), this.zip64ExtensibleData[e2] = { id: e2, length: t2, value: r2 };
          }, readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          }, readLocalFiles: function() {
            var e2, t2;
            for (e2 = 0; e2 < this.files.length; e2++) t2 = this.files[e2], this.reader.setIndex(t2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t2.readLocalPart(this.reader), t2.handleUTF8(), t2.processAttributes();
          }, readCentralDir: function() {
            var e2;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
            if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          }, readEndOfCentral: function() {
            var e2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
            if (e2 < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
            this.reader.setIndex(e2);
            var t2 = e2;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
              if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(e2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var r2 = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
            var n2 = t2 - r2;
            if (0 < n2) this.isSignature(t2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n2);
            else if (n2 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n2) + " bytes.");
          }, prepareReader: function(e2) {
            this.reader = n(e2);
          }, load: function(e2) {
            this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          } }, t.exports = h;
        }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e, t, r) {
          "use strict";
          var n = e("./reader/readerFor"), s = e("./utils"), i = e("./compressedObject"), a = e("./crc32"), o = e("./utf8"), h = e("./compressions"), u = e("./support");
          function l(e2, t2) {
            this.options = e2, this.loadOptions = t2;
          }
          l.prototype = { isEncrypted: function() {
            return 1 == (1 & this.bitFlag);
          }, useUTF8: function() {
            return 2048 == (2048 & this.bitFlag);
          }, readLocalPart: function(e2) {
            var t2, r2;
            if (e2.skip(22), this.fileNameLength = e2.readInt(2), r2 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if (null === (t2 = (function(e3) {
              for (var t3 in h) if (Object.prototype.hasOwnProperty.call(h, t3) && h[t3].magic === e3) return h[t3];
              return null;
            })(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
            this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t2, e2.readData(this.compressedSize));
          }, readCentralPart: function(e2) {
            this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
            var t2 = e2.readInt(2);
            if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            e2.skip(t2), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
          }, processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var e2 = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
          }, parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var e2 = n(this.extraFields[1].value);
              this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
            }
          }, readExtraFields: function(e2) {
            var t2, r2, n2, i2 = e2.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i2; ) t2 = e2.readInt(2), r2 = e2.readInt(2), n2 = e2.readData(r2), this.extraFields[t2] = { id: t2, length: r2, value: n2 };
            e2.setIndex(i2);
          }, handleUTF8: function() {
            var e2 = u.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
            else {
              var t2 = this.findExtraFieldUnicodePath();
              if (null !== t2) this.fileNameStr = t2;
              else {
                var r2 = s.transformTo(e2, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(r2);
              }
              var n2 = this.findExtraFieldUnicodeComment();
              if (null !== n2) this.fileCommentStr = n2;
              else {
                var i2 = s.transformTo(e2, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(i2);
              }
            }
          }, findExtraFieldUnicodePath: function() {
            var e2 = this.extraFields[28789];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileName) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          }, findExtraFieldUnicodeComment: function() {
            var e2 = this.extraFields[25461];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileComment) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          } }, t.exports = l;
        }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e, t, r) {
          "use strict";
          function n(e2, t2, r2) {
            this.name = e2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t2, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
          }
          var s = e("./stream/StreamHelper"), i = e("./stream/DataWorker"), a = e("./utf8"), o = e("./compressedObject"), h = e("./stream/GenericWorker");
          n.prototype = { internalStream: function(e2) {
            var t2 = null, r2 = "string";
            try {
              if (!e2) throw new Error("No output type specified.");
              var n2 = "string" === (r2 = e2.toLowerCase()) || "text" === r2;
              "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t2 = this._decompressWorker();
              var i2 = !this._dataBinary;
              i2 && !n2 && (t2 = t2.pipe(new a.Utf8EncodeWorker())), !i2 && n2 && (t2 = t2.pipe(new a.Utf8DecodeWorker()));
            } catch (e3) {
              (t2 = new h("error")).error(e3);
            }
            return new s(t2, r2, "");
          }, async: function(e2, t2) {
            return this.internalStream(e2).accumulate(t2);
          }, nodeStream: function(e2, t2) {
            return this.internalStream(e2 || "nodebuffer").toNodejsStream(t2);
          }, _compressWorker: function(e2, t2) {
            if (this._data instanceof o && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
            var r2 = this._decompressWorker();
            return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r2, e2, t2);
          }, _decompressWorker: function() {
            return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
          } };
          for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, f = 0; f < u.length; f++) n.prototype[u[f]] = l;
          t.exports = n;
        }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e, l, t) {
          (function(t2) {
            "use strict";
            var r, n, e2 = t2.MutationObserver || t2.WebKitMutationObserver;
            if (e2) {
              var i = 0, s = new e2(u), a = t2.document.createTextNode("");
              s.observe(a, { characterData: true }), r = function() {
                a.data = i = ++i % 2;
              };
            } else if (t2.setImmediate || void 0 === t2.MessageChannel) r = "document" in t2 && "onreadystatechange" in t2.document.createElement("script") ? function() {
              var e3 = t2.document.createElement("script");
              e3.onreadystatechange = function() {
                u(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
              }, t2.document.documentElement.appendChild(e3);
            } : function() {
              setTimeout(u, 0);
            };
            else {
              var o = new t2.MessageChannel();
              o.port1.onmessage = u, r = function() {
                o.port2.postMessage(0);
              };
            }
            var h = [];
            function u() {
              var e3, t3;
              n = true;
              for (var r2 = h.length; r2; ) {
                for (t3 = h, h = [], e3 = -1; ++e3 < r2; ) t3[e3]();
                r2 = h.length;
              }
              n = false;
            }
            l.exports = function(e3) {
              1 !== h.push(e3) || n || r();
            };
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}], 37: [function(e, t, r) {
          "use strict";
          var i = e("immediate");
          function u() {
          }
          var l = {}, s = ["REJECTED"], a = ["FULFILLED"], n = ["PENDING"];
          function o(e2) {
            if ("function" != typeof e2) throw new TypeError("resolver must be a function");
            this.state = n, this.queue = [], this.outcome = void 0, e2 !== u && d(this, e2);
          }
          function h(e2, t2, r2) {
            this.promise = e2, "function" == typeof t2 && (this.onFulfilled = t2, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
          }
          function f(t2, r2, n2) {
            i(function() {
              var e2;
              try {
                e2 = r2(n2);
              } catch (e3) {
                return l.reject(t2, e3);
              }
              e2 === t2 ? l.reject(t2, new TypeError("Cannot resolve promise with itself")) : l.resolve(t2, e2);
            });
          }
          function c(e2) {
            var t2 = e2 && e2.then;
            if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t2) return function() {
              t2.apply(e2, arguments);
            };
          }
          function d(t2, e2) {
            var r2 = false;
            function n2(e3) {
              r2 || (r2 = true, l.reject(t2, e3));
            }
            function i2(e3) {
              r2 || (r2 = true, l.resolve(t2, e3));
            }
            var s2 = p(function() {
              e2(i2, n2);
            });
            "error" === s2.status && n2(s2.value);
          }
          function p(e2, t2) {
            var r2 = {};
            try {
              r2.value = e2(t2), r2.status = "success";
            } catch (e3) {
              r2.status = "error", r2.value = e3;
            }
            return r2;
          }
          (t.exports = o).prototype.finally = function(t2) {
            if ("function" != typeof t2) return this;
            var r2 = this.constructor;
            return this.then(function(e2) {
              return r2.resolve(t2()).then(function() {
                return e2;
              });
            }, function(e2) {
              return r2.resolve(t2()).then(function() {
                throw e2;
              });
            });
          }, o.prototype.catch = function(e2) {
            return this.then(null, e2);
          }, o.prototype.then = function(e2, t2) {
            if ("function" != typeof e2 && this.state === a || "function" != typeof t2 && this.state === s) return this;
            var r2 = new this.constructor(u);
            this.state !== n ? f(r2, this.state === a ? e2 : t2, this.outcome) : this.queue.push(new h(r2, e2, t2));
            return r2;
          }, h.prototype.callFulfilled = function(e2) {
            l.resolve(this.promise, e2);
          }, h.prototype.otherCallFulfilled = function(e2) {
            f(this.promise, this.onFulfilled, e2);
          }, h.prototype.callRejected = function(e2) {
            l.reject(this.promise, e2);
          }, h.prototype.otherCallRejected = function(e2) {
            f(this.promise, this.onRejected, e2);
          }, l.resolve = function(e2, t2) {
            var r2 = p(c, t2);
            if ("error" === r2.status) return l.reject(e2, r2.value);
            var n2 = r2.value;
            if (n2) d(e2, n2);
            else {
              e2.state = a, e2.outcome = t2;
              for (var i2 = -1, s2 = e2.queue.length; ++i2 < s2; ) e2.queue[i2].callFulfilled(t2);
            }
            return e2;
          }, l.reject = function(e2, t2) {
            e2.state = s, e2.outcome = t2;
            for (var r2 = -1, n2 = e2.queue.length; ++r2 < n2; ) e2.queue[r2].callRejected(t2);
            return e2;
          }, o.resolve = function(e2) {
            if (e2 instanceof this) return e2;
            return l.resolve(new this(u), e2);
          }, o.reject = function(e2) {
            var t2 = new this(u);
            return l.reject(t2, e2);
          }, o.all = function(e2) {
            var r2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var n2 = e2.length, i2 = false;
            if (!n2) return this.resolve([]);
            var s2 = new Array(n2), a2 = 0, t2 = -1, o2 = new this(u);
            for (; ++t2 < n2; ) h2(e2[t2], t2);
            return o2;
            function h2(e3, t3) {
              r2.resolve(e3).then(function(e4) {
                s2[t3] = e4, ++a2 !== n2 || i2 || (i2 = true, l.resolve(o2, s2));
              }, function(e4) {
                i2 || (i2 = true, l.reject(o2, e4));
              });
            }
          }, o.race = function(e2) {
            var t2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var r2 = e2.length, n2 = false;
            if (!r2) return this.resolve([]);
            var i2 = -1, s2 = new this(u);
            for (; ++i2 < r2; ) a2 = e2[i2], t2.resolve(a2).then(function(e3) {
              n2 || (n2 = true, l.resolve(s2, e3));
            }, function(e3) {
              n2 || (n2 = true, l.reject(s2, e3));
            });
            var a2;
            return s2;
          };
        }, { immediate: 36 }], 38: [function(e, t, r) {
          "use strict";
          var n = {};
          (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
        }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e, t, r) {
          "use strict";
          var a = e("./zlib/deflate"), o = e("./utils/common"), h = e("./utils/strings"), i = e("./zlib/messages"), s = e("./zlib/zstream"), u = Object.prototype.toString, l = 0, f = -1, c = 0, d = 8;
          function p(e2) {
            if (!(this instanceof p)) return new p(e2);
            this.options = o.assign({ level: f, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e2 || {});
            var t2 = this.options;
            t2.raw && 0 < t2.windowBits ? t2.windowBits = -t2.windowBits : t2.gzip && 0 < t2.windowBits && t2.windowBits < 16 && (t2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
            var r2 = a.deflateInit2(this.strm, t2.level, t2.method, t2.windowBits, t2.memLevel, t2.strategy);
            if (r2 !== l) throw new Error(i[r2]);
            if (t2.header && a.deflateSetHeader(this.strm, t2.header), t2.dictionary) {
              var n2;
              if (n2 = "string" == typeof t2.dictionary ? h.string2buf(t2.dictionary) : "[object ArrayBuffer]" === u.call(t2.dictionary) ? new Uint8Array(t2.dictionary) : t2.dictionary, (r2 = a.deflateSetDictionary(this.strm, n2)) !== l) throw new Error(i[r2]);
              this._dict_set = true;
            }
          }
          function n(e2, t2) {
            var r2 = new p(t2);
            if (r2.push(e2, true), r2.err) throw r2.msg || i[r2.err];
            return r2.result;
          }
          p.prototype.push = function(e2, t2) {
            var r2, n2, i2 = this.strm, s2 = this.options.chunkSize;
            if (this.ended) return false;
            n2 = t2 === ~~t2 ? t2 : true === t2 ? 4 : 0, "string" == typeof e2 ? i2.input = h.string2buf(e2) : "[object ArrayBuffer]" === u.call(e2) ? i2.input = new Uint8Array(e2) : i2.input = e2, i2.next_in = 0, i2.avail_in = i2.input.length;
            do {
              if (0 === i2.avail_out && (i2.output = new o.Buf8(s2), i2.next_out = 0, i2.avail_out = s2), 1 !== (r2 = a.deflate(i2, n2)) && r2 !== l) return this.onEnd(r2), !(this.ended = true);
              0 !== i2.avail_out && (0 !== i2.avail_in || 4 !== n2 && 2 !== n2) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i2.output, i2.next_out))) : this.onData(o.shrinkBuf(i2.output, i2.next_out)));
            } while ((0 < i2.avail_in || 0 === i2.avail_out) && 1 !== r2);
            return 4 === n2 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : 2 !== n2 || (this.onEnd(l), !(i2.avail_out = 0));
          }, p.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, p.prototype.onEnd = function(e2) {
            e2 === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Deflate = p, r.deflate = n, r.deflateRaw = function(e2, t2) {
            return (t2 = t2 || {}).raw = true, n(e2, t2);
          }, r.gzip = function(e2, t2) {
            return (t2 = t2 || {}).gzip = true, n(e2, t2);
          };
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e, t, r) {
          "use strict";
          var c = e("./zlib/inflate"), d = e("./utils/common"), p = e("./utils/strings"), m = e("./zlib/constants"), n = e("./zlib/messages"), i = e("./zlib/zstream"), s = e("./zlib/gzheader"), _ = Object.prototype.toString;
          function a(e2) {
            if (!(this instanceof a)) return new a(e2);
            this.options = d.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e2 || {});
            var t2 = this.options;
            t2.raw && 0 <= t2.windowBits && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, 0 === t2.windowBits && (t2.windowBits = -15)), !(0 <= t2.windowBits && t2.windowBits < 16) || e2 && e2.windowBits || (t2.windowBits += 32), 15 < t2.windowBits && t2.windowBits < 48 && 0 == (15 & t2.windowBits) && (t2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
            var r2 = c.inflateInit2(this.strm, t2.windowBits);
            if (r2 !== m.Z_OK) throw new Error(n[r2]);
            this.header = new s(), c.inflateGetHeader(this.strm, this.header);
          }
          function o(e2, t2) {
            var r2 = new a(t2);
            if (r2.push(e2, true), r2.err) throw r2.msg || n[r2.err];
            return r2.result;
          }
          a.prototype.push = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f = false;
            if (this.ended) return false;
            n2 = t2 === ~~t2 ? t2 : true === t2 ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e2 ? h.input = p.binstring2buf(e2) : "[object ArrayBuffer]" === _.call(e2) ? h.input = new Uint8Array(e2) : h.input = e2, h.next_in = 0, h.avail_in = h.input.length;
            do {
              if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o2 = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r2 = c.inflateSetDictionary(this.strm, o2)), r2 === m.Z_BUF_ERROR && true === f && (r2 = m.Z_OK, f = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK) return this.onEnd(r2), !(this.ended = true);
              h.next_out && (0 !== h.avail_out && r2 !== m.Z_STREAM_END && (0 !== h.avail_in || n2 !== m.Z_FINISH && n2 !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i2 = p.utf8border(h.output, h.next_out), s2 = h.next_out - i2, a2 = p.buf2string(h.output, i2), h.next_out = s2, h.avail_out = u - s2, s2 && d.arraySet(h.output, h.output, i2, s2, 0), this.onData(a2)) : this.onData(d.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = true);
            } while ((0 < h.avail_in || 0 === h.avail_out) && r2 !== m.Z_STREAM_END);
            return r2 === m.Z_STREAM_END && (n2 = m.Z_FINISH), n2 === m.Z_FINISH ? (r2 = c.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : n2 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
          }, a.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, a.prototype.onEnd = function(e2) {
            e2 === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Inflate = a, r.inflate = o, r.inflateRaw = function(e2, t2) {
            return (t2 = t2 || {}).raw = true, o(e2, t2);
          }, r.ungzip = o;
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e, t, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
          r.assign = function(e2) {
            for (var t2 = Array.prototype.slice.call(arguments, 1); t2.length; ) {
              var r2 = t2.shift();
              if (r2) {
                if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
                for (var n2 in r2) r2.hasOwnProperty(n2) && (e2[n2] = r2[n2]);
              }
            }
            return e2;
          }, r.shrinkBuf = function(e2, t2) {
            return e2.length === t2 ? e2 : e2.subarray ? e2.subarray(0, t2) : (e2.length = t2, e2);
          };
          var i = { arraySet: function(e2, t2, r2, n2, i2) {
            if (t2.subarray && e2.subarray) e2.set(t2.subarray(r2, r2 + n2), i2);
            else for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          }, flattenChunks: function(e2) {
            var t2, r2, n2, i2, s2, a;
            for (t2 = n2 = 0, r2 = e2.length; t2 < r2; t2++) n2 += e2[t2].length;
            for (a = new Uint8Array(n2), t2 = i2 = 0, r2 = e2.length; t2 < r2; t2++) s2 = e2[t2], a.set(s2, i2), i2 += s2.length;
            return a;
          } }, s = { arraySet: function(e2, t2, r2, n2, i2) {
            for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          }, flattenChunks: function(e2) {
            return [].concat.apply([], e2);
          } };
          r.setTyped = function(e2) {
            e2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
          }, r.setTyped(n);
        }, {}], 42: [function(e, t, r) {
          "use strict";
          var h = e("./common"), i = true, s = true;
          try {
            String.fromCharCode.apply(null, [0]);
          } catch (e2) {
            i = false;
          }
          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (e2) {
            s = false;
          }
          for (var u = new h.Buf8(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
          function l(e2, t2) {
            if (t2 < 65537 && (e2.subarray && s || !e2.subarray && i)) return String.fromCharCode.apply(null, h.shrinkBuf(e2, t2));
            for (var r2 = "", n2 = 0; n2 < t2; n2++) r2 += String.fromCharCode(e2[n2]);
            return r2;
          }
          u[254] = u[254] = 1, r.string2buf = function(e2) {
            var t2, r2, n2, i2, s2, a = e2.length, o = 0;
            for (i2 = 0; i2 < a; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
            for (t2 = new h.Buf8(o), i2 = s2 = 0; s2 < o; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
            return t2;
          }, r.buf2binstring = function(e2) {
            return l(e2, e2.length);
          }, r.binstring2buf = function(e2) {
            for (var t2 = new h.Buf8(e2.length), r2 = 0, n2 = t2.length; r2 < n2; r2++) t2[r2] = e2.charCodeAt(r2);
            return t2;
          }, r.buf2string = function(e2, t2) {
            var r2, n2, i2, s2, a = t2 || e2.length, o = new Array(2 * a);
            for (r2 = n2 = 0; r2 < a; ) if ((i2 = e2[r2++]) < 128) o[n2++] = i2;
            else if (4 < (s2 = u[i2])) o[n2++] = 65533, r2 += s2 - 1;
            else {
              for (i2 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r2 < a; ) i2 = i2 << 6 | 63 & e2[r2++], s2--;
              1 < s2 ? o[n2++] = 65533 : i2 < 65536 ? o[n2++] = i2 : (i2 -= 65536, o[n2++] = 55296 | i2 >> 10 & 1023, o[n2++] = 56320 | 1023 & i2);
            }
            return l(o, n2);
          }, r.utf8border = function(e2, t2) {
            var r2;
            for ((t2 = t2 || e2.length) > e2.length && (t2 = e2.length), r2 = t2 - 1; 0 <= r2 && 128 == (192 & e2[r2]); ) r2--;
            return r2 < 0 ? t2 : 0 === r2 ? t2 : r2 + u[e2[r2]] > t2 ? r2 : t2;
          };
        }, { "./common": 41 }], 43: [function(e, t, r) {
          "use strict";
          t.exports = function(e2, t2, r2, n) {
            for (var i = 65535 & e2 | 0, s = e2 >>> 16 & 65535 | 0, a = 0; 0 !== r2; ) {
              for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (i = i + t2[n++] | 0) | 0, --a; ) ;
              i %= 65521, s %= 65521;
            }
            return i | s << 16 | 0;
          };
        }, {}], 44: [function(e, t, r) {
          "use strict";
          t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
        }, {}], 45: [function(e, t, r) {
          "use strict";
          var o = (function() {
            for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n = 0; n < 8; n++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t2[r2] = e2;
            }
            return t2;
          })();
          t.exports = function(e2, t2, r2, n) {
            var i = o, s = n + r2;
            e2 ^= -1;
            for (var a = n; a < s; a++) e2 = e2 >>> 8 ^ i[255 & (e2 ^ t2[a])];
            return -1 ^ e2;
          };
        }, {}], 46: [function(e, t, r) {
          "use strict";
          var h, c = e("../utils/common"), u = e("./trees"), d = e("./adler32"), p = e("./crc32"), n = e("./messages"), l = 0, f = 4, m = 0, _ = -2, g = -1, b = 4, i = 2, v = 8, y = 9, s = 286, a = 30, o = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E = 113, A = 1, I = 2, O = 3, B = 4;
          function R(e2, t2) {
            return e2.msg = n[t2], t2;
          }
          function T(e2) {
            return (e2 << 1) - (4 < e2 ? 9 : 0);
          }
          function D(e2) {
            for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
          }
          function F(e2) {
            var t2 = e2.state, r2 = t2.pending;
            r2 > e2.avail_out && (r2 = e2.avail_out), 0 !== r2 && (c.arraySet(e2.output, t2.pending_buf, t2.pending_out, r2, e2.next_out), e2.next_out += r2, t2.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, t2.pending -= r2, 0 === t2.pending && (t2.pending_out = 0));
          }
          function N(e2, t2) {
            u._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, F(e2.strm);
          }
          function U(e2, t2) {
            e2.pending_buf[e2.pending++] = t2;
          }
          function P(e2, t2) {
            e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t2;
          }
          function L(e2, t2) {
            var r2, n2, i2 = e2.max_chain_length, s2 = e2.strstart, a2 = e2.prev_length, o2 = e2.nice_match, h2 = e2.strstart > e2.w_size - z ? e2.strstart - (e2.w_size - z) : 0, u2 = e2.window, l2 = e2.w_mask, f2 = e2.prev, c2 = e2.strstart + S, d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
            e2.prev_length >= e2.good_match && (i2 >>= 2), o2 > e2.lookahead && (o2 = e2.lookahead);
            do {
              if (u2[(r2 = t2) + a2] === p2 && u2[r2 + a2 - 1] === d2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
                s2 += 2, r2++;
                do {
                } while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < c2);
                if (n2 = S - (c2 - s2), s2 = c2 - S, a2 < n2) {
                  if (e2.match_start = t2, o2 <= (a2 = n2)) break;
                  d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
                }
              }
            } while ((t2 = f2[t2 & l2]) > h2 && 0 != --i2);
            return a2 <= e2.lookahead ? a2 : e2.lookahead;
          }
          function j(e2) {
            var t2, r2, n2, i2, s2, a2, o2, h2, u2, l2, f2 = e2.w_size;
            do {
              if (i2 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f2 + (f2 - z)) {
                for (c.arraySet(e2.window, e2.window, f2, f2, 0), e2.match_start -= f2, e2.strstart -= f2, e2.block_start -= f2, t2 = r2 = e2.hash_size; n2 = e2.head[--t2], e2.head[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                for (t2 = r2 = f2; n2 = e2.prev[--t2], e2.prev[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                i2 += f2;
              }
              if (0 === e2.strm.avail_in) break;
              if (a2 = e2.strm, o2 = e2.window, h2 = e2.strstart + e2.lookahead, u2 = i2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = 0 === l2 ? 0 : (a2.avail_in -= l2, c.arraySet(o2, a2.input, a2.next_in, l2, h2), 1 === a2.state.wrap ? a2.adler = d(a2.adler, o2, l2, h2) : 2 === a2.state.wrap && (a2.adler = p(a2.adler, o2, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), e2.lookahead += r2, e2.lookahead + e2.insert >= x) for (s2 = e2.strstart - e2.insert, e2.ins_h = e2.window[s2], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + x - 1]) & e2.hash_mask, e2.prev[s2 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s2, s2++, e2.insert--, !(e2.lookahead + e2.insert < x)); ) ;
            } while (e2.lookahead < z && 0 !== e2.strm.avail_in);
          }
          function Z(e2, t2) {
            for (var r2, n2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r2 && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2)), e2.match_length >= x) if (n2 = u._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x) {
                for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
                e2.strstart++;
              } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
              else n2 = u._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
              if (n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function W(e2, t2) {
            for (var r2, n2, i2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x - 1, 0 !== r2 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x - 1)), e2.prev_length >= x && e2.match_length <= e2.prev_length) {
                for (i2 = e2.strstart + e2.lookahead - x, n2 = u._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
                if (e2.match_available = 0, e2.match_length = x - 1, e2.strstart++, n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
              } else if (e2.match_available) {
                if ((n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A;
              } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
            }
            return e2.match_available && (n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function M(e2, t2, r2, n2, i2) {
            this.good_length = e2, this.max_lazy = t2, this.nice_length = r2, this.max_chain = n2, this.func = i2;
          }
          function H() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k + 1), this.heap = new c.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
          }
          function G(e2) {
            var t2;
            return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i, (t2 = e2.state).pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap ? C : E, e2.adler = 2 === t2.wrap ? 0 : 1, t2.last_flush = l, u._tr_init(t2), m) : R(e2, _);
          }
          function K(e2) {
            var t2 = G(e2);
            return t2 === m && (function(e3) {
              e3.window_size = 2 * e3.w_size, D(e3.head), e3.max_lazy_match = h[e3.level].max_lazy, e3.good_match = h[e3.level].good_length, e3.nice_match = h[e3.level].nice_length, e3.max_chain_length = h[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x - 1, e3.match_available = 0, e3.ins_h = 0;
            })(e2.state), t2;
          }
          function Y(e2, t2, r2, n2, i2, s2) {
            if (!e2) return _;
            var a2 = 1;
            if (t2 === g && (t2 = 6), n2 < 0 ? (a2 = 0, n2 = -n2) : 15 < n2 && (a2 = 2, n2 -= 16), i2 < 1 || y < i2 || r2 !== v || n2 < 8 || 15 < n2 || t2 < 0 || 9 < t2 || s2 < 0 || b < s2) return R(e2, _);
            8 === n2 && (n2 = 9);
            var o2 = new H();
            return (e2.state = o2).strm = e2, o2.wrap = a2, o2.gzhead = null, o2.w_bits = n2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = i2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x - 1) / x), o2.window = new c.Buf8(2 * o2.w_size), o2.head = new c.Buf16(o2.hash_size), o2.prev = new c.Buf16(o2.w_size), o2.lit_bufsize = 1 << i2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new c.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = t2, o2.strategy = s2, o2.method = r2, K(e2);
          }
          h = [new M(0, 0, 0, 0, function(e2, t2) {
            var r2 = 65535;
            for (r2 > e2.pending_buf_size - 5 && (r2 = e2.pending_buf_size - 5); ; ) {
              if (e2.lookahead <= 1) {
                if (j(e2), 0 === e2.lookahead && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              e2.strstart += e2.lookahead, e2.lookahead = 0;
              var n2 = e2.block_start + r2;
              if ((0 === e2.strstart || e2.strstart >= n2) && (e2.lookahead = e2.strstart - n2, e2.strstart = n2, N(e2, false), 0 === e2.strm.avail_out)) return A;
              if (e2.strstart - e2.block_start >= e2.w_size - z && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = 0, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : (e2.strstart > e2.block_start && (N(e2, false), e2.strm.avail_out), A);
          }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function(e2, t2) {
            return Y(e2, t2, v, 15, 8, 0);
          }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(e2, t2) {
            return e2 && e2.state ? 2 !== e2.state.wrap ? _ : (e2.state.gzhead = t2, m) : _;
          }, r.deflate = function(e2, t2) {
            var r2, n2, i2, s2;
            if (!e2 || !e2.state || 5 < t2 || t2 < 0) return e2 ? R(e2, _) : _;
            if (n2 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n2.status && t2 !== f) return R(e2, 0 === e2.avail_out ? -5 : _);
            if (n2.strm = e2, r2 = n2.last_flush, n2.last_flush = t2, n2.status === C) if (2 === n2.wrap) e2.adler = 0, U(n2, 31), U(n2, 139), U(n2, 8), n2.gzhead ? (U(n2, (n2.gzhead.text ? 1 : 0) + (n2.gzhead.hcrc ? 2 : 0) + (n2.gzhead.extra ? 4 : 0) + (n2.gzhead.name ? 8 : 0) + (n2.gzhead.comment ? 16 : 0)), U(n2, 255 & n2.gzhead.time), U(n2, n2.gzhead.time >> 8 & 255), U(n2, n2.gzhead.time >> 16 & 255), U(n2, n2.gzhead.time >> 24 & 255), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 255 & n2.gzhead.os), n2.gzhead.extra && n2.gzhead.extra.length && (U(n2, 255 & n2.gzhead.extra.length), U(n2, n2.gzhead.extra.length >> 8 & 255)), n2.gzhead.hcrc && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending, 0)), n2.gzindex = 0, n2.status = 69) : (U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 3), n2.status = E);
            else {
              var a2 = v + (n2.w_bits - 8 << 4) << 8;
              a2 |= (2 <= n2.strategy || n2.level < 2 ? 0 : n2.level < 6 ? 1 : 6 === n2.level ? 2 : 3) << 6, 0 !== n2.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n2.status = E, P(n2, a2), 0 !== n2.strstart && (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), e2.adler = 1;
            }
            if (69 === n2.status) if (n2.gzhead.extra) {
              for (i2 = n2.pending; n2.gzindex < (65535 & n2.gzhead.extra.length) && (n2.pending !== n2.pending_buf_size || (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending !== n2.pending_buf_size)); ) U(n2, 255 & n2.gzhead.extra[n2.gzindex]), n2.gzindex++;
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), n2.gzindex === n2.gzhead.extra.length && (n2.gzindex = 0, n2.status = 73);
            } else n2.status = 73;
            if (73 === n2.status) if (n2.gzhead.name) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.name.length ? 255 & n2.gzhead.name.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.gzindex = 0, n2.status = 91);
            } else n2.status = 91;
            if (91 === n2.status) if (n2.gzhead.comment) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.comment.length ? 255 & n2.gzhead.comment.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.status = 103);
            } else n2.status = 103;
            if (103 === n2.status && (n2.gzhead.hcrc ? (n2.pending + 2 > n2.pending_buf_size && F(e2), n2.pending + 2 <= n2.pending_buf_size && (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), e2.adler = 0, n2.status = E)) : n2.status = E), 0 !== n2.pending) {
              if (F(e2), 0 === e2.avail_out) return n2.last_flush = -1, m;
            } else if (0 === e2.avail_in && T(t2) <= T(r2) && t2 !== f) return R(e2, -5);
            if (666 === n2.status && 0 !== e2.avail_in) return R(e2, -5);
            if (0 !== e2.avail_in || 0 !== n2.lookahead || t2 !== l && 666 !== n2.status) {
              var o2 = 2 === n2.strategy ? (function(e3, t3) {
                for (var r3; ; ) {
                  if (0 === e3.lookahead && (j(e3), 0 === e3.lookahead)) {
                    if (t3 === l) return A;
                    break;
                  }
                  if (e3.match_length = 0, r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              })(n2, t2) : 3 === n2.strategy ? (function(e3, t3) {
                for (var r3, n3, i3, s3, a3 = e3.window; ; ) {
                  if (e3.lookahead <= S) {
                    if (j(e3), e3.lookahead <= S && t3 === l) return A;
                    if (0 === e3.lookahead) break;
                  }
                  if (e3.match_length = 0, e3.lookahead >= x && 0 < e3.strstart && (n3 = a3[i3 = e3.strstart - 1]) === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3]) {
                    s3 = e3.strstart + S;
                    do {
                    } while (n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && i3 < s3);
                    e3.match_length = S - (s3 - i3), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
                  }
                  if (e3.match_length >= x ? (r3 = u._tr_tally(e3, 1, e3.match_length - x), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              })(n2, t2) : h[n2.level].func(n2, t2);
              if (o2 !== O && o2 !== B || (n2.status = 666), o2 === A || o2 === O) return 0 === e2.avail_out && (n2.last_flush = -1), m;
              if (o2 === I && (1 === t2 ? u._tr_align(n2) : 5 !== t2 && (u._tr_stored_block(n2, 0, 0, false), 3 === t2 && (D(n2.head), 0 === n2.lookahead && (n2.strstart = 0, n2.block_start = 0, n2.insert = 0))), F(e2), 0 === e2.avail_out)) return n2.last_flush = -1, m;
            }
            return t2 !== f ? m : n2.wrap <= 0 ? 1 : (2 === n2.wrap ? (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), U(n2, e2.adler >> 16 & 255), U(n2, e2.adler >> 24 & 255), U(n2, 255 & e2.total_in), U(n2, e2.total_in >> 8 & 255), U(n2, e2.total_in >> 16 & 255), U(n2, e2.total_in >> 24 & 255)) : (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), F(e2), 0 < n2.wrap && (n2.wrap = -n2.wrap), 0 !== n2.pending ? m : 1);
          }, r.deflateEnd = function(e2) {
            var t2;
            return e2 && e2.state ? (t2 = e2.state.status) !== C && 69 !== t2 && 73 !== t2 && 91 !== t2 && 103 !== t2 && t2 !== E && 666 !== t2 ? R(e2, _) : (e2.state = null, t2 === E ? R(e2, -3) : m) : _;
          }, r.deflateSetDictionary = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2 = t2.length;
            if (!e2 || !e2.state) return _;
            if (2 === (s2 = (r2 = e2.state).wrap) || 1 === s2 && r2.status !== C || r2.lookahead) return _;
            for (1 === s2 && (e2.adler = d(e2.adler, t2, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (0 === s2 && (D(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new c.Buf8(r2.w_size), c.arraySet(u2, t2, l2 - r2.w_size, r2.w_size, 0), t2 = u2, l2 = r2.w_size), a2 = e2.avail_in, o2 = e2.next_in, h2 = e2.input, e2.avail_in = l2, e2.next_in = 0, e2.input = t2, j(r2); r2.lookahead >= x; ) {
              for (n2 = r2.strstart, i2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n2 + x - 1]) & r2.hash_mask, r2.prev[n2 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n2, n2++, --i2; ) ;
              r2.strstart = n2, r2.lookahead = x - 1, j(r2);
            }
            return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, e2.next_in = o2, e2.input = h2, e2.avail_in = a2, r2.wrap = s2, m;
          }, r.deflateInfo = "pako deflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e, t, r) {
          "use strict";
          t.exports = function() {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
          };
        }, {}], 48: [function(e, t, r) {
          "use strict";
          t.exports = function(e2, t2) {
            var r2, n, i, s, a, o, h, u, l, f, c, d, p, m, _, g, b, v, y, w, k, x, S, z, C;
            r2 = e2.state, n = e2.next_in, z = e2.input, i = n + (e2.avail_in - 5), s = e2.next_out, C = e2.output, a = s - (t2 - e2.avail_out), o = s + (e2.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f = r2.wnext, c = r2.window, d = r2.hold, p = r2.bits, m = r2.lencode, _ = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
            e: do {
              p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = m[d & g];
              t: for (; ; ) {
                if (d >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;
                else {
                  if (!(16 & y)) {
                    if (0 == (64 & y)) {
                      v = m[(65535 & v) + (d & (1 << y) - 1)];
                      continue t;
                    }
                    if (32 & y) {
                      r2.mode = 12;
                      break e;
                    }
                    e2.msg = "invalid literal/length code", r2.mode = 30;
                    break e;
                  }
                  w = 65535 & v, (y &= 15) && (p < y && (d += z[n++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y), p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = _[d & b];
                  r: for (; ; ) {
                    if (d >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                      if (0 == (64 & y)) {
                        v = _[(65535 & v) + (d & (1 << y) - 1)];
                        continue r;
                      }
                      e2.msg = "invalid distance code", r2.mode = 30;
                      break e;
                    }
                    if (k = 65535 & v, p < (y &= 15) && (d += z[n++] << p, (p += 8) < y && (d += z[n++] << p, p += 8)), h < (k += d & (1 << y) - 1)) {
                      e2.msg = "invalid distance too far back", r2.mode = 30;
                      break e;
                    }
                    if (d >>>= y, p -= y, (y = s - a) < k) {
                      if (l < (y = k - y) && r2.sane) {
                        e2.msg = "invalid distance too far back", r2.mode = 30;
                        break e;
                      }
                      if (S = c, (x = 0) === f) {
                        if (x += u - y, y < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          x = s - k, S = C;
                        }
                      } else if (f < y) {
                        if (x += u + f - y, (y -= f) < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          if (x = 0, f < w) {
                            for (w -= y = f; C[s++] = c[x++], --y; ) ;
                            x = s - k, S = C;
                          }
                        }
                      } else if (x += f - y, y < w) {
                        for (w -= y; C[s++] = c[x++], --y; ) ;
                        x = s - k, S = C;
                      }
                      for (; 2 < w; ) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                      w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                    } else {
                      for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); ) ;
                      w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                    }
                    break;
                  }
                }
                break;
              }
            } while (n < i && s < o);
            n -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, e2.next_in = n, e2.next_out = s, e2.avail_in = n < i ? i - n + 5 : 5 - (n - i), e2.avail_out = s < o ? o - s + 257 : 257 - (s - o), r2.hold = d, r2.bits = p;
          };
        }, {}], 49: [function(e, t, r) {
          "use strict";
          var I = e("../utils/common"), O = e("./adler32"), B = e("./crc32"), R = e("./inffast"), T = e("./inftrees"), D = 1, F = 2, N = 0, U = -2, P = 1, n = 852, i = 592;
          function L(e2) {
            return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
          }
          function s() {
            this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
          }
          function a(e2) {
            var t2;
            return e2 && e2.state ? (t2 = e2.state, e2.total_in = e2.total_out = t2.total = 0, e2.msg = "", t2.wrap && (e2.adler = 1 & t2.wrap), t2.mode = P, t2.last = 0, t2.havedict = 0, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new I.Buf32(n), t2.distcode = t2.distdyn = new I.Buf32(i), t2.sane = 1, t2.back = -1, N) : U;
          }
          function o(e2) {
            var t2;
            return e2 && e2.state ? ((t2 = e2.state).wsize = 0, t2.whave = 0, t2.wnext = 0, a(e2)) : U;
          }
          function h(e2, t2) {
            var r2, n2;
            return e2 && e2.state ? (n2 = e2.state, t2 < 0 ? (r2 = 0, t2 = -t2) : (r2 = 1 + (t2 >> 4), t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || 15 < t2) ? U : (null !== n2.window && n2.wbits !== t2 && (n2.window = null), n2.wrap = r2, n2.wbits = t2, o(e2))) : U;
          }
          function u(e2, t2) {
            var r2, n2;
            return e2 ? (n2 = new s(), (e2.state = n2).window = null, (r2 = h(e2, t2)) !== N && (e2.state = null), r2) : U;
          }
          var l, f, c = true;
          function j(e2) {
            if (c) {
              var t2;
              for (l = new I.Buf32(512), f = new I.Buf32(32), t2 = 0; t2 < 144; ) e2.lens[t2++] = 8;
              for (; t2 < 256; ) e2.lens[t2++] = 9;
              for (; t2 < 280; ) e2.lens[t2++] = 7;
              for (; t2 < 288; ) e2.lens[t2++] = 8;
              for (T(D, e2.lens, 0, 288, l, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
              T(F, e2.lens, 0, 32, f, 0, e2.work, { bits: 5 }), c = false;
            }
            e2.lencode = l, e2.lenbits = 9, e2.distcode = f, e2.distbits = 5;
          }
          function Z(e2, t2, r2, n2) {
            var i2, s2 = e2.state;
            return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), n2 >= s2.wsize ? (I.arraySet(s2.window, t2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n2 < (i2 = s2.wsize - s2.wnext) && (i2 = n2), I.arraySet(s2.window, t2, r2 - n2, i2, s2.wnext), (n2 -= i2) ? (I.arraySet(s2.window, t2, r2 - n2, n2, 0), s2.wnext = n2, s2.whave = s2.wsize) : (s2.wnext += i2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i2))), 0;
          }
          r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(e2) {
            return u(e2, 15);
          }, r.inflateInit2 = u, r.inflate = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2, f2, c2, d, p, m, _, g, b, v, y, w, k, x, S, z, C = 0, E = new I.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U;
            12 === (r2 = e2.state).mode && (r2.mode = 13), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, f2 = o2, c2 = h2, x = N;
            e: for (; ; ) switch (r2.mode) {
              case P:
                if (0 === r2.wrap) {
                  r2.mode = 13;
                  break;
                }
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (2 & r2.wrap && 35615 === u2) {
                  E[r2.check = 0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0), l2 = u2 = 0, r2.mode = 2;
                  break;
                }
                if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                  e2.msg = "incorrect header check", r2.mode = 30;
                  break;
                }
                if (8 != (15 & u2)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), 0 === r2.wbits) r2.wbits = k;
                else if (k > r2.wbits) {
                  e2.msg = "invalid window size", r2.mode = 30;
                  break;
                }
                r2.dmax = 1 << k, e2.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
                break;
              case 2:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.flags = u2, 8 != (255 & r2.flags)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (57344 & r2.flags) {
                  e2.msg = "unknown header flags set", r2.mode = 30;
                  break;
                }
                r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 3;
              case 3:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.time = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, E[2] = u2 >>> 16 & 255, E[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E, 4, 0)), l2 = u2 = 0, r2.mode = 4;
              case 4:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 5;
              case 5:
                if (1024 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0;
                } else r2.head && (r2.head.extra = null);
                r2.mode = 6;
              case 6:
                if (1024 & r2.flags && (o2 < (d = r2.length) && (d = o2), d && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, n2, s2, d, k)), 512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, r2.length -= d), r2.length)) break e;
                r2.length = 0, r2.mode = 7;
              case 7:
                if (2048 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.name = null);
                r2.length = 0, r2.mode = 8;
              case 8:
                if (4096 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.comment = null);
                r2.mode = 9;
              case 9:
                if (512 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (65535 & r2.check)) {
                    e2.msg = "header crc mismatch", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = 12;
                break;
              case 10:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                e2.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
              case 11:
                if (0 === r2.havedict) return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, 2;
                e2.adler = r2.check = 1, r2.mode = 12;
              case 12:
                if (5 === t2 || 6 === t2) break e;
              case 13:
                if (r2.last) {
                  u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                  break;
                }
                for (; l2 < 3; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                  case 0:
                    r2.mode = 14;
                    break;
                  case 1:
                    if (j(r2), r2.mode = 20, 6 !== t2) break;
                    u2 >>>= 2, l2 -= 2;
                    break e;
                  case 2:
                    r2.mode = 17;
                    break;
                  case 3:
                    e2.msg = "invalid block type", r2.mode = 30;
                }
                u2 >>>= 2, l2 -= 2;
                break;
              case 14:
                for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                  e2.msg = "invalid stored block lengths", r2.mode = 30;
                  break;
                }
                if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, 6 === t2) break e;
              case 15:
                r2.mode = 16;
              case 16:
                if (d = r2.length) {
                  if (o2 < d && (d = o2), h2 < d && (d = h2), 0 === d) break e;
                  I.arraySet(i2, n2, s2, d, a2), o2 -= d, s2 += d, h2 -= d, a2 += d, r2.length -= d;
                  break;
                }
                r2.mode = 12;
                break;
              case 17:
                for (; l2 < 14; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                  e2.msg = "too many length or distance symbols", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 18;
              case 18:
                for (; r2.have < r2.ncode; ) {
                  for (; l2 < 3; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
                }
                for (; r2.have < 19; ) r2.lens[A[r2.have++]] = 0;
                if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid code lengths set", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 19;
              case 19:
                for (; r2.have < r2.nlen + r2.ndist; ) {
                  for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (b < 16) u2 >>>= _, l2 -= _, r2.lens[r2.have++] = b;
                  else {
                    if (16 === b) {
                      for (z = _ + 2; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      if (u2 >>>= _, l2 -= _, 0 === r2.have) {
                        e2.msg = "invalid bit length repeat", r2.mode = 30;
                        break;
                      }
                      k = r2.lens[r2.have - 1], d = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                    } else if (17 === b) {
                      for (z = _ + 3; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 3 + (7 & (u2 >>>= _)), u2 >>>= 3, l2 -= 3;
                    } else {
                      for (z = _ + 7; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 11 + (127 & (u2 >>>= _)), u2 >>>= 7, l2 -= 7;
                    }
                    if (r2.have + d > r2.nlen + r2.ndist) {
                      e2.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    for (; d--; ) r2.lens[r2.have++] = k;
                  }
                }
                if (30 === r2.mode) break;
                if (0 === r2.lens[256]) {
                  e2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                  break;
                }
                if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid literal/lengths set", r2.mode = 30;
                  break;
                }
                if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                  e2.msg = "invalid distances set", r2.mode = 30;
                  break;
                }
                if (r2.mode = 20, 6 === t2) break e;
              case 20:
                r2.mode = 21;
              case 21:
                if (6 <= o2 && 258 <= h2) {
                  e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, R(e2, c2), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, 12 === r2.mode && (r2.back = -1);
                  break;
                }
                for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (g && 0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, r2.length = b, 0 === g) {
                  r2.mode = 26;
                  break;
                }
                if (32 & g) {
                  r2.back = -1, r2.mode = 12;
                  break;
                }
                if (64 & g) {
                  e2.msg = "invalid literal/length code", r2.mode = 30;
                  break;
                }
                r2.extra = 15 & g, r2.mode = 22;
              case 22:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                r2.was = r2.length, r2.mode = 23;
              case 23:
                for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, 64 & g) {
                  e2.msg = "invalid distance code", r2.mode = 30;
                  break;
                }
                r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
              case 24:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                if (r2.offset > r2.dmax) {
                  e2.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                r2.mode = 25;
              case 25:
                if (0 === h2) break e;
                if (d = c2 - h2, r2.offset > d) {
                  if ((d = r2.offset - d) > r2.whave && r2.sane) {
                    e2.msg = "invalid distance too far back", r2.mode = 30;
                    break;
                  }
                  p = d > r2.wnext ? (d -= r2.wnext, r2.wsize - d) : r2.wnext - d, d > r2.length && (d = r2.length), m = r2.window;
                } else m = i2, p = a2 - r2.offset, d = r2.length;
                for (h2 < d && (d = h2), h2 -= d, r2.length -= d; i2[a2++] = m[p++], --d; ) ;
                0 === r2.length && (r2.mode = 21);
                break;
              case 26:
                if (0 === h2) break e;
                i2[a2++] = r2.length, h2--, r2.mode = 21;
                break;
              case 27:
                if (r2.wrap) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 |= n2[s2++] << l2, l2 += 8;
                  }
                  if (c2 -= h2, e2.total_out += c2, r2.total += c2, c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, a2 - c2) : O(r2.check, i2, c2, a2 - c2)), c2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                    e2.msg = "incorrect data check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 28;
              case 28:
                if (r2.wrap && r2.flags) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (4294967295 & r2.total)) {
                    e2.msg = "incorrect length check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 29;
              case 29:
                x = 1;
                break e;
              case 30:
                x = -3;
                break e;
              case 31:
                return -4;
              case 32:
              default:
                return U;
            }
            return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, (r2.wsize || c2 !== e2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t2)) && Z(e2, e2.output, e2.next_out, c2 - e2.avail_out) ? (r2.mode = 31, -4) : (f2 -= e2.avail_in, c2 -= e2.avail_out, e2.total_in += f2, e2.total_out += c2, r2.total += c2, r2.wrap && c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, e2.next_out - c2) : O(r2.check, i2, c2, e2.next_out - c2)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f2 && 0 === c2 || 4 === t2) && x === N && (x = -5), x);
          }, r.inflateEnd = function(e2) {
            if (!e2 || !e2.state) return U;
            var t2 = e2.state;
            return t2.window && (t2.window = null), e2.state = null, N;
          }, r.inflateGetHeader = function(e2, t2) {
            var r2;
            return e2 && e2.state ? 0 == (2 & (r2 = e2.state).wrap) ? U : ((r2.head = t2).done = false, N) : U;
          }, r.inflateSetDictionary = function(e2, t2) {
            var r2, n2 = t2.length;
            return e2 && e2.state ? 0 !== (r2 = e2.state).wrap && 11 !== r2.mode ? U : 11 === r2.mode && O(1, t2, n2, 0) !== r2.check ? -3 : Z(e2, t2, n2, n2) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
          }, r.inflateInfo = "pako inflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e, t, r) {
          "use strict";
          var D = e("../utils/common"), F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
          t.exports = function(e2, t2, r2, n, i, s, a, o) {
            var h, u, l, f, c, d, p, m, _, g = o.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E = 0, A = null, I = 0, O = new D.Buf16(16), B = new D.Buf16(16), R = null, T = 0;
            for (b = 0; b <= 15; b++) O[b] = 0;
            for (v = 0; v < n; v++) O[t2[r2 + v]]++;
            for (k = g, w = 15; 1 <= w && 0 === O[w]; w--) ;
            if (w < k && (k = w), 0 === w) return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;
            for (y = 1; y < w && 0 === O[y]; y++) ;
            for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;
            if (0 < z && (0 === e2 || 1 !== w)) return -1;
            for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];
            for (v = 0; v < n; v++) 0 !== t2[r2 + v] && (a[B[t2[r2 + v]]++] = v);
            if (d = 0 === e2 ? (A = R = a, 19) : 1 === e2 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, c = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
            for (; ; ) {
              for (p = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u; ) ;
              for (h = 1 << b - 1; E & h; ) h >>= 1;
              if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
                if (b === w) break;
                b = t2[r2 + a[v]];
              }
              if (k < b && (E & f) !== l) {
                for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); ) x++, z <<= 1;
                if (C += 1 << x, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
                i[l = E & f] = k << 24 | x << 16 | c - s | 0;
              }
            }
            return 0 !== E && (i[c + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
          };
        }, { "../utils/common": 41 }], 51: [function(e, t, r) {
          "use strict";
          t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
        }, {}], 52: [function(e, t, r) {
          "use strict";
          var i = e("../utils/common"), o = 0, h = 1;
          function n(e2) {
            for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
          }
          var s = 0, a = 29, u = 256, l = u + 1 + a, f = 30, c = 19, _ = 2 * l + 1, g = 15, d = 16, p = 7, m = 256, b = 16, v = 17, y = 18, w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(2 * (l + 2));
          n(z);
          var C = new Array(2 * f);
          n(C);
          var E = new Array(512);
          n(E);
          var A = new Array(256);
          n(A);
          var I = new Array(a);
          n(I);
          var O, B, R, T = new Array(f);
          function D(e2, t2, r2, n2, i2) {
            this.static_tree = e2, this.extra_bits = t2, this.extra_base = r2, this.elems = n2, this.max_length = i2, this.has_stree = e2 && e2.length;
          }
          function F(e2, t2) {
            this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
          }
          function N(e2) {
            return e2 < 256 ? E[e2] : E[256 + (e2 >>> 7)];
          }
          function U(e2, t2) {
            e2.pending_buf[e2.pending++] = 255 & t2, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
          }
          function P(e2, t2, r2) {
            e2.bi_valid > d - r2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, U(e2, e2.bi_buf), e2.bi_buf = t2 >> d - e2.bi_valid, e2.bi_valid += r2 - d) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += r2);
          }
          function L(e2, t2, r2) {
            P(e2, r2[2 * t2], r2[2 * t2 + 1]);
          }
          function j(e2, t2) {
            for (var r2 = 0; r2 |= 1 & e2, e2 >>>= 1, r2 <<= 1, 0 < --t2; ) ;
            return r2 >>> 1;
          }
          function Z(e2, t2, r2) {
            var n2, i2, s2 = new Array(g + 1), a2 = 0;
            for (n2 = 1; n2 <= g; n2++) s2[n2] = a2 = a2 + r2[n2 - 1] << 1;
            for (i2 = 0; i2 <= t2; i2++) {
              var o2 = e2[2 * i2 + 1];
              0 !== o2 && (e2[2 * i2] = j(s2[o2]++, o2));
            }
          }
          function W(e2) {
            var t2;
            for (t2 = 0; t2 < l; t2++) e2.dyn_ltree[2 * t2] = 0;
            for (t2 = 0; t2 < f; t2++) e2.dyn_dtree[2 * t2] = 0;
            for (t2 = 0; t2 < c; t2++) e2.bl_tree[2 * t2] = 0;
            e2.dyn_ltree[2 * m] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
          }
          function M(e2) {
            8 < e2.bi_valid ? U(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
          }
          function H(e2, t2, r2, n2) {
            var i2 = 2 * t2, s2 = 2 * r2;
            return e2[i2] < e2[s2] || e2[i2] === e2[s2] && n2[t2] <= n2[r2];
          }
          function G(e2, t2, r2) {
            for (var n2 = e2.heap[r2], i2 = r2 << 1; i2 <= e2.heap_len && (i2 < e2.heap_len && H(t2, e2.heap[i2 + 1], e2.heap[i2], e2.depth) && i2++, !H(t2, n2, e2.heap[i2], e2.depth)); ) e2.heap[r2] = e2.heap[i2], r2 = i2, i2 <<= 1;
            e2.heap[r2] = n2;
          }
          function K(e2, t2, r2) {
            var n2, i2, s2, a2, o2 = 0;
            if (0 !== e2.last_lit) for (; n2 = e2.pending_buf[e2.d_buf + 2 * o2] << 8 | e2.pending_buf[e2.d_buf + 2 * o2 + 1], i2 = e2.pending_buf[e2.l_buf + o2], o2++, 0 === n2 ? L(e2, i2, t2) : (L(e2, (s2 = A[i2]) + u + 1, t2), 0 !== (a2 = w[s2]) && P(e2, i2 -= I[s2], a2), L(e2, s2 = N(--n2), r2), 0 !== (a2 = k[s2]) && P(e2, n2 -= T[s2], a2)), o2 < e2.last_lit; ) ;
            L(e2, m, t2);
          }
          function Y(e2, t2) {
            var r2, n2, i2, s2 = t2.dyn_tree, a2 = t2.stat_desc.static_tree, o2 = t2.stat_desc.has_stree, h2 = t2.stat_desc.elems, u2 = -1;
            for (e2.heap_len = 0, e2.heap_max = _, r2 = 0; r2 < h2; r2++) 0 !== s2[2 * r2] ? (e2.heap[++e2.heap_len] = u2 = r2, e2.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
            for (; e2.heap_len < 2; ) s2[2 * (i2 = e2.heap[++e2.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, e2.depth[i2] = 0, e2.opt_len--, o2 && (e2.static_len -= a2[2 * i2 + 1]);
            for (t2.max_code = u2, r2 = e2.heap_len >> 1; 1 <= r2; r2--) G(e2, s2, r2);
            for (i2 = h2; r2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G(e2, s2, 1), n2 = e2.heap[1], e2.heap[--e2.heap_max] = r2, e2.heap[--e2.heap_max] = n2, s2[2 * i2] = s2[2 * r2] + s2[2 * n2], e2.depth[i2] = (e2.depth[r2] >= e2.depth[n2] ? e2.depth[r2] : e2.depth[n2]) + 1, s2[2 * r2 + 1] = s2[2 * n2 + 1] = i2, e2.heap[1] = i2++, G(e2, s2, 1), 2 <= e2.heap_len; ) ;
            e2.heap[--e2.heap_max] = e2.heap[1], (function(e3, t3) {
              var r3, n3, i3, s3, a3, o3, h3 = t3.dyn_tree, u3 = t3.max_code, l2 = t3.stat_desc.static_tree, f2 = t3.stat_desc.has_stree, c2 = t3.stat_desc.extra_bits, d2 = t3.stat_desc.extra_base, p2 = t3.stat_desc.max_length, m2 = 0;
              for (s3 = 0; s3 <= g; s3++) e3.bl_count[s3] = 0;
              for (h3[2 * e3.heap[e3.heap_max] + 1] = 0, r3 = e3.heap_max + 1; r3 < _; r3++) p2 < (s3 = h3[2 * h3[2 * (n3 = e3.heap[r3]) + 1] + 1] + 1) && (s3 = p2, m2++), h3[2 * n3 + 1] = s3, u3 < n3 || (e3.bl_count[s3]++, a3 = 0, d2 <= n3 && (a3 = c2[n3 - d2]), o3 = h3[2 * n3], e3.opt_len += o3 * (s3 + a3), f2 && (e3.static_len += o3 * (l2[2 * n3 + 1] + a3)));
              if (0 !== m2) {
                do {
                  for (s3 = p2 - 1; 0 === e3.bl_count[s3]; ) s3--;
                  e3.bl_count[s3]--, e3.bl_count[s3 + 1] += 2, e3.bl_count[p2]--, m2 -= 2;
                } while (0 < m2);
                for (s3 = p2; 0 !== s3; s3--) for (n3 = e3.bl_count[s3]; 0 !== n3; ) u3 < (i3 = e3.heap[--r3]) || (h3[2 * i3 + 1] !== s3 && (e3.opt_len += (s3 - h3[2 * i3 + 1]) * h3[2 * i3], h3[2 * i3 + 1] = s3), n3--);
              }
            })(e2, t2), Z(s2, u2, e2.bl_count);
          }
          function X(e2, t2, r2) {
            var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), t2[2 * (r2 + 1) + 1] = 65535, n2 = 0; n2 <= r2; n2++) i2 = a2, a2 = t2[2 * (n2 + 1) + 1], ++o2 < h2 && i2 === a2 || (o2 < u2 ? e2.bl_tree[2 * i2] += o2 : 0 !== i2 ? (i2 !== s2 && e2.bl_tree[2 * i2]++, e2.bl_tree[2 * b]++) : o2 <= 10 ? e2.bl_tree[2 * v]++ : e2.bl_tree[2 * y]++, s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
          }
          function V(e2, t2, r2) {
            var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), n2 = 0; n2 <= r2; n2++) if (i2 = a2, a2 = t2[2 * (n2 + 1) + 1], !(++o2 < h2 && i2 === a2)) {
              if (o2 < u2) for (; L(e2, i2, e2.bl_tree), 0 != --o2; ) ;
              else 0 !== i2 ? (i2 !== s2 && (L(e2, i2, e2.bl_tree), o2--), L(e2, b, e2.bl_tree), P(e2, o2 - 3, 2)) : o2 <= 10 ? (L(e2, v, e2.bl_tree), P(e2, o2 - 3, 3)) : (L(e2, y, e2.bl_tree), P(e2, o2 - 11, 7));
              s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
            }
          }
          n(T);
          var q = false;
          function J(e2, t2, r2, n2) {
            P(e2, (s << 1) + (n2 ? 1 : 0), 3), (function(e3, t3, r3, n3) {
              M(e3), n3 && (U(e3, r3), U(e3, ~r3)), i.arraySet(e3.pending_buf, e3.window, t3, r3, e3.pending), e3.pending += r3;
            })(e2, t2, r2, true);
          }
          r._tr_init = function(e2) {
            q || ((function() {
              var e3, t2, r2, n2, i2, s2 = new Array(g + 1);
              for (n2 = r2 = 0; n2 < a - 1; n2++) for (I[n2] = r2, e3 = 0; e3 < 1 << w[n2]; e3++) A[r2++] = n2;
              for (A[r2 - 1] = n2, n2 = i2 = 0; n2 < 16; n2++) for (T[n2] = i2, e3 = 0; e3 < 1 << k[n2]; e3++) E[i2++] = n2;
              for (i2 >>= 7; n2 < f; n2++) for (T[n2] = i2 << 7, e3 = 0; e3 < 1 << k[n2] - 7; e3++) E[256 + i2++] = n2;
              for (t2 = 0; t2 <= g; t2++) s2[t2] = 0;
              for (e3 = 0; e3 <= 143; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (; e3 <= 255; ) z[2 * e3 + 1] = 9, e3++, s2[9]++;
              for (; e3 <= 279; ) z[2 * e3 + 1] = 7, e3++, s2[7]++;
              for (; e3 <= 287; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (Z(z, l + 1, s2), e3 = 0; e3 < f; e3++) C[2 * e3 + 1] = 5, C[2 * e3] = j(e3, 5);
              O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, c, p);
            })(), q = true), e2.l_desc = new F(e2.dyn_ltree, O), e2.d_desc = new F(e2.dyn_dtree, B), e2.bl_desc = new F(e2.bl_tree, R), e2.bi_buf = 0, e2.bi_valid = 0, W(e2);
          }, r._tr_stored_block = J, r._tr_flush_block = function(e2, t2, r2, n2) {
            var i2, s2, a2 = 0;
            0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = (function(e3) {
              var t3, r3 = 4093624447;
              for (t3 = 0; t3 <= 31; t3++, r3 >>>= 1) if (1 & r3 && 0 !== e3.dyn_ltree[2 * t3]) return o;
              if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h;
              for (t3 = 32; t3 < u; t3++) if (0 !== e3.dyn_ltree[2 * t3]) return h;
              return o;
            })(e2)), Y(e2, e2.l_desc), Y(e2, e2.d_desc), a2 = (function(e3) {
              var t3;
              for (X(e3, e3.dyn_ltree, e3.l_desc.max_code), X(e3, e3.dyn_dtree, e3.d_desc.max_code), Y(e3, e3.bl_desc), t3 = c - 1; 3 <= t3 && 0 === e3.bl_tree[2 * S[t3] + 1]; t3--) ;
              return e3.opt_len += 3 * (t3 + 1) + 5 + 5 + 4, t3;
            })(e2), i2 = e2.opt_len + 3 + 7 >>> 3, (s2 = e2.static_len + 3 + 7 >>> 3) <= i2 && (i2 = s2)) : i2 = s2 = r2 + 5, r2 + 4 <= i2 && -1 !== t2 ? J(e2, t2, r2, n2) : 4 === e2.strategy || s2 === i2 ? (P(e2, 2 + (n2 ? 1 : 0), 3), K(e2, z, C)) : (P(e2, 4 + (n2 ? 1 : 0), 3), (function(e3, t3, r3, n3) {
              var i3;
              for (P(e3, t3 - 257, 5), P(e3, r3 - 1, 5), P(e3, n3 - 4, 4), i3 = 0; i3 < n3; i3++) P(e3, e3.bl_tree[2 * S[i3] + 1], 3);
              V(e3, e3.dyn_ltree, t3 - 1), V(e3, e3.dyn_dtree, r3 - 1);
            })(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a2 + 1), K(e2, e2.dyn_ltree, e2.dyn_dtree)), W(e2), n2 && M(e2);
          }, r._tr_tally = function(e2, t2, r2) {
            return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t2 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t2, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r2, e2.last_lit++, 0 === t2 ? e2.dyn_ltree[2 * r2]++ : (e2.matches++, t2--, e2.dyn_ltree[2 * (A[r2] + u + 1)]++, e2.dyn_dtree[2 * N(t2)]++), e2.last_lit === e2.lit_bufsize - 1;
          }, r._tr_align = function(e2) {
            P(e2, 2, 3), L(e2, m, z), (function(e3) {
              16 === e3.bi_valid ? (U(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
            })(e2);
          };
        }, { "../utils/common": 41 }], 53: [function(e, t, r) {
          "use strict";
          t.exports = function() {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
          };
        }, {}], 54: [function(e, t, r) {
          (function(e2) {
            !(function(r2, n) {
              "use strict";
              if (!r2.setImmediate) {
                var i, s, t2, a, o = 1, h = {}, u = false, l = r2.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
                e3 = e3 && e3.setTimeout ? e3 : r2, i = "[object process]" === {}.toString.call(r2.process) ? function(e4) {
                  process.nextTick(function() {
                    c(e4);
                  });
                } : (function() {
                  if (r2.postMessage && !r2.importScripts) {
                    var e4 = true, t3 = r2.onmessage;
                    return r2.onmessage = function() {
                      e4 = false;
                    }, r2.postMessage("", "*"), r2.onmessage = t3, e4;
                  }
                })() ? (a = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d, false) : r2.attachEvent("onmessage", d), function(e4) {
                  r2.postMessage(a + e4, "*");
                }) : r2.MessageChannel ? ((t2 = new MessageChannel()).port1.onmessage = function(e4) {
                  c(e4.data);
                }, function(e4) {
                  t2.port2.postMessage(e4);
                }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function(e4) {
                  var t3 = l.createElement("script");
                  t3.onreadystatechange = function() {
                    c(e4), t3.onreadystatechange = null, s.removeChild(t3), t3 = null;
                  }, s.appendChild(t3);
                }) : function(e4) {
                  setTimeout(c, 0, e4);
                }, e3.setImmediate = function(e4) {
                  "function" != typeof e4 && (e4 = new Function("" + e4));
                  for (var t3 = new Array(arguments.length - 1), r3 = 0; r3 < t3.length; r3++) t3[r3] = arguments[r3 + 1];
                  var n2 = { callback: e4, args: t3 };
                  return h[o] = n2, i(o), o++;
                }, e3.clearImmediate = f;
              }
              function f(e4) {
                delete h[e4];
              }
              function c(e4) {
                if (u) setTimeout(c, 0, e4);
                else {
                  var t3 = h[e4];
                  if (t3) {
                    u = true;
                    try {
                      !(function(e5) {
                        var t4 = e5.callback, r3 = e5.args;
                        switch (r3.length) {
                          case 0:
                            t4();
                            break;
                          case 1:
                            t4(r3[0]);
                            break;
                          case 2:
                            t4(r3[0], r3[1]);
                            break;
                          case 3:
                            t4(r3[0], r3[1], r3[2]);
                            break;
                          default:
                            t4.apply(n, r3);
                        }
                      })(t3);
                    } finally {
                      f(e4), u = false;
                    }
                  }
                }
              }
              function d(e4) {
                e4.source === r2 && "string" == typeof e4.data && 0 === e4.data.indexOf(a) && c(+e4.data.slice(a.length));
              }
            })("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}] }, {}, [10])(10);
      });
    }
  });

  // node_modules/live2d-renderer/build/renderer/Live2DCubismModel.js
  var require_Live2DCubismModel = __commonJS({
    "node_modules/live2d-renderer/build/renderer/Live2DCubismModel.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      }) : (function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      }));
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }) : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
        var ownKeys = function(o) {
          ownKeys = Object.getOwnPropertyNames || function(o2) {
            var ar = [];
            for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
            return ar;
          };
          return ownKeys(o);
        };
        return function(mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null) {
            for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
          }
          __setModuleDefault(result, mod);
          return result;
        };
      })();
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Live2DCubismModel = exports.compressLive2DTextures = exports.isLive2DZip = void 0;
      var cubismmodelsettingjson_1 = require_cubismmodelsettingjson();
      var cubismdefaultparameterid_1 = require_cubismdefaultparameterid();
      var cubismeyeblink_1 = require_cubismeyeblink();
      var cubismbreath_1 = require_cubismbreath();
      var cubismmotionqueuemanager_1 = require_cubismmotionqueuemanager();
      var live2dcubismframework_1 = require_live2dcubismframework();
      var cubismviewmatrix_1 = require_cubismviewmatrix();
      var cubismmatrix44_1 = require_cubismmatrix44();
      var cubismmoc_1 = require_cubismmoc();
      var csmvector_1 = require_csmvector();
      var csmmap_1 = require_csmmap();
      var Live2DCubismUserModel_1 = require_Live2DCubismUserModel();
      var WavFileController_1 = require_WavFileController();
      var TouchController_1 = require_TouchController();
      var MotionController_1 = require_MotionController();
      var ExpressionController_1 = require_ExpressionController();
      var CameraController_1 = require_CameraController();
      var WebGLRenderer_1 = require_WebGLRenderer();
      var path_1 = __importDefault(require_path_browser());
      var id = null;
      var isLive2DZip = async (arrayBuffer) => {
        var _a;
        let fileType;
        let JSZip;
        try {
          fileType = await Promise.resolve().then(() => __importStar(__require("magic-bytes.js"))).then((r) => r.default);
          JSZip = await Promise.resolve().then(() => __importStar(require_jszip_min())).then((r) => r.default);
        } catch (_b) {
          return Promise.reject("jszip and magic-bytes.js required");
        }
        let isZip = false;
        const result = ((_a = fileType(new Uint8Array(arrayBuffer))) === null || _a === void 0 ? void 0 : _a[0]) || { mime: "" };
        if (result.mime === "application/zip")
          isZip = true;
        if (!isZip)
          return false;
        const zip = await JSZip.loadAsync(arrayBuffer);
        let hasModel = false;
        let hasMoc3 = false;
        let hasTexture = false;
        for (const [relativePath, file] of Object.entries(zip.files)) {
          if (relativePath.startsWith("__MACOSX") || file.dir)
            continue;
          if (relativePath.endsWith("model3.json"))
            hasModel = true;
          if (relativePath.endsWith("moc3"))
            hasMoc3 = true;
          if (relativePath.match(/\.(png|jpg|webp|avif)$/))
            hasTexture = true;
        }
        return hasModel && hasMoc3 && hasTexture;
      };
      exports.isLive2DZip = isLive2DZip;
      var compressLive2DTextures = async (arrayBuffer, maxSize = 8192, quality = 0.8, format = "webp") => {
        var _a, _b;
        let fileType;
        let JSZip;
        try {
          fileType = await Promise.resolve().then(() => __importStar(__require("magic-bytes.js"))).then((r) => r.default);
          JSZip = await Promise.resolve().then(() => __importStar(require_jszip_min())).then((r) => r.default);
        } catch (_c) {
          return Promise.reject("jszip and magic-bytes.js required");
        }
        const result = ((_a = fileType(new Uint8Array(arrayBuffer))) === null || _a === void 0 ? void 0 : _a[0]) || { mime: "" };
        if (result.mime !== "application/zip")
          return arrayBuffer;
        const zip = await JSZip.loadAsync(arrayBuffer);
        const newZip = new JSZip();
        for (const [relativePath, file] of Object.entries(zip.files)) {
          if (relativePath.startsWith("__MACOSX") || file.dir)
            continue;
          if (relativePath.endsWith("model3.json")) {
            const json = JSON.parse(await file.async("string"));
            for (let i = 0; i < ((_b = json.FileReferences.Textures) === null || _b === void 0 ? void 0 : _b.length); i++) {
              const texture = json.FileReferences.Textures[i];
              json.FileReferences.Textures[i] = texture.replace(/\.(png|jpg|webp|avif)$/, `.${format}`);
            }
            newZip.file(relativePath, JSON.stringify(json, null, 4));
          } else if (relativePath.match(/\.(png|jpg|webp|avif)$/)) {
            const blob = await file.async("blob");
            const image = await createImageBitmap(blob);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (image.width > maxSize || image.height > maxSize) {
              const aspectRatio = image.width / image.height;
              if (image.width > image.height) {
                canvas.width = maxSize;
                canvas.height = maxSize / aspectRatio;
              } else {
                canvas.height = maxSize;
                canvas.width = maxSize * aspectRatio;
              }
            } else {
              canvas.width = image.width;
              canvas.height = image.height;
            }
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            const newBlob = await new Promise((resolve) => canvas.toBlob(resolve, `image/${format}`, quality));
            newZip.file(relativePath.replace(/\.(png|jpg|webp|avif)$/, `.${format}`), newBlob);
          } else {
            newZip.file(relativePath, await file.async("arraybuffer"));
          }
        }
        const newBuffer = await newZip.generateAsync({ type: "arraybuffer" });
        return newBuffer;
      };
      exports.compressLive2DTextures = compressLive2DTextures;
      var Live2DCubismModel2 = class extends Live2DCubismUserModel_1.Live2DCubismUserModel {
        on(event, listener) {
          if (!this.events[event]) {
            this.events[event] = [];
          }
          this.events[event].push(listener);
        }
        emit(event, ...args) {
          if (this.events[event]) {
            this.events[event].forEach((listener) => listener(...args));
          }
        }
        off(event, listener) {
          if (this.events[event]) {
            this.events[event] = this.events[event].filter((l) => l !== listener);
          }
        }
        get zoomEnabled() {
          return this.cameraController.zoomEnabled;
        }
        set zoomEnabled(zoomEnabled) {
          this.cameraController.zoomEnabled = zoomEnabled;
        }
        get minScale() {
          return this.cameraController.minScale;
        }
        set minScale(minScale) {
          this.cameraController.minScale = minScale;
        }
        get maxScale() {
          return this.cameraController.maxScale;
        }
        set maxScale(maxScale) {
          this.cameraController.maxScale = maxScale;
        }
        get panSpeed() {
          return this.cameraController.panSpeed;
        }
        set panSpeed(panSpeed) {
          this.cameraController.panSpeed = panSpeed;
        }
        get zoomStep() {
          return this.cameraController.zoomStep;
        }
        set zoomStep(zoomStep) {
          this.cameraController.zoomStep = zoomStep;
        }
        get scale() {
          return this.cameraController.scale;
        }
        set scale(scale) {
          this.cameraController.scale = scale;
        }
        get x() {
          return this.cameraController.x;
        }
        set x(x) {
          this.cameraController.x = x;
        }
        get y() {
          return this.cameraController.y;
        }
        set y(y) {
          this.cameraController.y = y;
        }
        get lipsyncSmoothing() {
          return this.wavController.smoothingFactor;
        }
        set lipsyncSmoothing(lipsyncSmoothing) {
          this.wavController.smoothingFactor = lipsyncSmoothing;
        }
        get volume() {
          return this.wavController.volumeNode.gain.value;
        }
        set volume(volume) {
          this.wavController.volumeNode.gain.value = volume;
        }
        get doubleClickReset() {
          return this.cameraController.doubleClickReset;
        }
        set doubleClickReset(doubleClickReset) {
          this.cameraController.doubleClickReset = doubleClickReset;
        }
        get paused() {
          return this._paused;
        }
        set paused(paused) {
          if (paused)
            this.stopMotions();
          this._paused = paused;
        }
        constructor(canvas, options) {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
          if (!options)
            options = {};
          super();
          this.events = {};
          this.totalMotionCount = 0;
          this.needsResize = false;
          this.loaded = false;
          this.cubismLoaded = false;
          this.destroy = (destroyCubism = false) => {
            cancelAnimationFrame(id);
            this.motions.clear();
            this.expressions.clear();
            this.eyeBlinkIds.clear();
            this.lipSyncIds.clear();
            this.webGLRenderer.deleteTextures();
            this.webGLRenderer.deleteShader();
            this.touchController.cancelInteractions();
            this.cameraController.removeListeners();
            this.expressionIds = [];
            this.motionIds = [];
            Object.keys(this.events).forEach((event) => {
              this.events[event] = [];
            });
            if (this.buffers) {
              this.buffers.modelBuffer = null;
              this.buffers.expressionBuffers = [];
              this.buffers.physicsBuffer = null;
              this.buffers.poseBuffer = null;
              this.buffers.userDataBuffer = null;
              this.buffers.motionGroups = [];
              this.buffers.textureImages = [];
            }
            this.buffers = null;
            this.loaded = false;
            this.cubismLoaded = false;
            this.model.release();
            if (destroyCubism)
              live2dcubismframework_1.CubismFramework.dispose();
          };
          this.loadCubismCore = async () => {
            await new Promise(async (resolve, reject) => {
              if (document.querySelector(`script[src="${this.cubismCorePath}"]`)) {
                return resolve();
              }
              const script = document.createElement("script");
              script.src = this.cubismCorePath;
              document.body.appendChild(script);
              script.onload = () => resolve();
              script.onerror = (err) => reject(err);
            });
          };
          this.loadFramework = async () => {
            live2dcubismframework_1.CubismFramework.startUp({ logFunction: (msg) => console.log(msg), loggingLevel: 5 });
            live2dcubismframework_1.CubismFramework.initialize();
          };
          this.initializeCubism = async () => {
            await this.loadCubismCore().catch(() => null);
            await this.loadFramework().catch(() => null);
            this.cubismLoaded = true;
          };
          this.loadBuffers = async (link) => {
            var _a2;
            let fileType;
            let JSZip;
            try {
              fileType = await Promise.resolve().then(() => __importStar(__require("magic-bytes.js"))).then((r) => r.default);
              JSZip = await Promise.resolve().then(() => __importStar(require_jszip_min())).then((r) => r.default);
            } catch (_b2) {
              fileType = null;
              JSZip = null;
            }
            let isZip = false;
            let arrayBuffer = link instanceof ArrayBuffer ? link : new ArrayBuffer(0);
            if (typeof link === "string") {
              isZip = path_1.default.extname(link).replace(".", "") === "zip";
              arrayBuffer = await fetch(link).then((r) => r.arrayBuffer()).catch(() => new ArrayBuffer(0));
            }
            if (!arrayBuffer.byteLength)
              return Promise.reject(`Failed to load ${link}`);
            if (fileType) {
              const result = ((_a2 = fileType(new Uint8Array(arrayBuffer))) === null || _a2 === void 0 ? void 0 : _a2[0]) || { mime: "" };
              if (result.mime === "application/zip")
                isZip = true;
            }
            let files = {};
            let basename = link instanceof ArrayBuffer ? "." : path_1.default.dirname(link);
            if (isZip && JSZip) {
              const zip = await JSZip.loadAsync(arrayBuffer);
              this.size = arrayBuffer.byteLength;
              for (const [relativePath, file] of Object.entries(zip.files)) {
                if (relativePath.startsWith("__MACOSX") || file.dir)
                  continue;
                const key = relativePath.split("/").slice(1).join("/");
                const contents = await file.async("arraybuffer");
                files[key] = contents;
                if (!this.settings && key.endsWith("model3.json"))
                  this.settings = new cubismmodelsettingjson_1.CubismModelSettingJson(contents, contents.byteLength);
                if (!this.vtubeSettings && key.endsWith("vtube.json"))
                  this.vtubeSettings = JSON.parse(await file.async("string"));
                if (!this.displayInfo && key.endsWith("cdi3.json"))
                  this.displayInfo = JSON.parse(await file.async("string"));
              }
            } else {
              this.settings = new cubismmodelsettingjson_1.CubismModelSettingJson(arrayBuffer, arrayBuffer.byteLength);
            }
            const getBuffer = async (filename) => {
              if (isZip) {
                let name = filename.startsWith(".") ? filename.split("/").slice(2).join("/") : filename;
                let buffer = null;
                for (const [key, value] of Object.entries(files)) {
                  if (key.includes(name)) {
                    buffer = value;
                    break;
                  }
                }
                if (!(buffer === null || buffer === void 0 ? void 0 : buffer.byteLength))
                  return Promise.reject(`Failed to load ${name}`);
                return buffer;
              } else {
                const filePath = path_1.default.join(basename, filename);
                const buffer = await fetch(filePath).then((r) => r.arrayBuffer()).catch(() => new ArrayBuffer(0));
                if (!buffer.byteLength)
                  return Promise.reject(`Failed to load ${filePath}`);
                return buffer;
              }
            };
            const getBufferOptional = async (getFilenameFn) => {
              try {
                const filename = getFilenameFn();
                return filename ? await getBuffer(filename) : null;
              } catch (_a3) {
                return null;
              }
            };
            const getBufferArray = async (count, getFilenameFn) => {
              const buffers = [];
              for (let i = 0; i < count; i++) {
                buffers.push(await getBuffer(getFilenameFn(i)));
              }
              return buffers;
            };
            const modelBuffer = await getBuffer(this.settings.getModelFileName());
            this.size = modelBuffer.byteLength;
            const physicsBuffer = await getBufferOptional(() => this.settings.getPhysicsFileName());
            const poseBuffer = await getBufferOptional(() => this.settings.getPoseFileName());
            const userDataBuffer = await getBufferOptional(() => this.settings.getUserDataFile());
            const expressionBuffers = [];
            if (this.settings.getExpressionCount()) {
              expressionBuffers.push(...await getBufferArray(this.settings.getExpressionCount(), (i) => this.settings.getExpressionFileName(i)));
              this.expressionIds = Array.from({ length: this.settings.getExpressionCount() }).map((_, i) => this.settings.getExpressionFileName(i));
            } else if (this.vtubeSettings) {
              this.expressionIds = this.vtubeSettings.Hotkeys.filter((h) => h.Action === "ToggleExpression").map((e) => e.File);
              expressionBuffers.push(...await getBufferArray(this.expressionIds.length, (i) => this.expressionIds[i]));
            }
            const motionGroups = [];
            if (this.settings.getMotionGroupCount()) {
              for (let i = 0; i < this.settings.getMotionGroupCount(); i++) {
                const group = this.settings.getMotionGroupName(i);
                const motionBuffers = await getBufferArray(this.settings.getMotionCount(group), (i2) => this.settings.getMotionFileName(group, i2));
                const wavBuffer = await getBufferOptional(() => this.settings.getMotionSoundFileName(group, i));
                motionGroups.push({ group, motionData: { motionBuffers, wavBuffer } });
                this.motionIds.push(...Array.from({ length: this.settings.getMotionCount(group) }).map((_, i2) => `${group}_${i2}`));
              }
            } else if (this.vtubeSettings) {
              const motions = [this.vtubeSettings.FileReferences.IdleAnimation];
              motions.push(...this.vtubeSettings.Hotkeys.filter((h) => h.Action === "TriggerAnimation").map((e) => e.File));
              for (let i = 0; i < motions.length; i++) {
                const buffer = await getBuffer(motions[i]);
                motionGroups.push({ group: motions[i], motionData: { motionBuffers: [buffer], wavBuffer: null } });
                this.motionIds.push(`${motions[i]}_0`);
              }
            }
            const textureImages = [];
            for (let i = 0; i < this.settings.getTextureCount(); i++) {
              const filename = this.settings.getTextureFileName(i);
              const buffer = await getBuffer(filename);
              const blob = new Blob([buffer]);
              const url = URL.createObjectURL(blob);
              const img = new Image();
              img.src = url;
              await new Promise((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = (err) => reject(err);
              });
              URL.revokeObjectURL(url);
              textureImages.push(img);
            }
            this.buffers = { modelBuffer, expressionBuffers, physicsBuffer, poseBuffer, userDataBuffer, motionGroups, textureImages };
            return this.buffers;
          };
          this.load = async (link) => {
            var _a2;
            if (!this.cubismLoaded)
              await this.initializeCubism();
            const { modelBuffer, physicsBuffer, poseBuffer, userDataBuffer } = await this.loadBuffers(link);
            this.touchController.initInteractions();
            this.cameraController.initListeners();
            this.loadModel(modelBuffer, this._mocConsistency);
            this.initialize();
            await this.expressionController.load();
            if (physicsBuffer) {
              this.loadPhysics(physicsBuffer, physicsBuffer.byteLength);
            }
            if (poseBuffer) {
              this.loadPose(poseBuffer, poseBuffer.byteLength);
            }
            if (this.settings.getEyeBlinkParameterCount() > 0) {
              this.eyeBlink = cubismeyeblink_1.CubismEyeBlink.create(this.settings);
            }
            this.breath = cubismbreath_1.CubismBreath.create();
            const breathParameters = new csmvector_1.csmVector();
            const manager = (_a2 = live2dcubismframework_1.CubismFramework === null || live2dcubismframework_1.CubismFramework === void 0 ? void 0 : live2dcubismframework_1.CubismFramework.getIdManager) === null || _a2 === void 0 ? void 0 : _a2.call(live2dcubismframework_1.CubismFramework);
            const paramAngleX = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleX);
            const paramAngleY = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleY);
            const paramAngleZ = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleZ);
            const paramBodyAngleX = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamBodyAngleX);
            const paramBreath = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamBreath);
            if (paramAngleX)
              breathParameters.pushBack(new cubismbreath_1.BreathParameterData(paramAngleX, 0, 15, 6.5345, 0.5));
            if (paramAngleY)
              breathParameters.pushBack(new cubismbreath_1.BreathParameterData(paramAngleY, 0, 8, 3.5345, 0.5));
            if (paramAngleZ)
              breathParameters.pushBack(new cubismbreath_1.BreathParameterData(paramAngleZ, 0, 10, 5.5345, 0.5));
            if (paramBodyAngleX)
              breathParameters.pushBack(new cubismbreath_1.BreathParameterData(paramBodyAngleX, 0, 4, 15.5345, 0.5));
            if (paramBreath)
              breathParameters.pushBack(new cubismbreath_1.BreathParameterData(paramBreath, 0.5, 0.5, 3.2345, 1));
            this.breath.setParameters(breathParameters);
            if (userDataBuffer) {
              this.loadUserData(userDataBuffer, userDataBuffer.byteLength);
            }
            const eyeBlinkCount = this.settings.getEyeBlinkParameterCount();
            for (let i = 0; i < eyeBlinkCount; ++i) {
              this.eyeBlinkIds.pushBack(this.settings.getEyeBlinkParameterId(i));
            }
            const lipSyncCount = this.settings.getLipSyncParameterCount();
            for (let i = 0; i < lipSyncCount; ++i) {
              this.lipSyncIds.pushBack(this.settings.getLipSyncParameterId(i));
            }
            if (!lipSyncCount) {
              const index = this.parameters.ids.indexOf("ParamMouthOpenY");
              if (index !== -1)
                this.lipSyncIds.pushBack(this.model.getParameterId(index));
              this.lipsync = Boolean(this.lipSyncIds.getSize());
            }
            const layout = new csmmap_1.csmMap();
            this.settings.getLayoutMap(layout);
            this.modelMatrix.setupFromLayout(layout);
            await this.motionController.load();
            this.createRenderer();
            await this.loadTextures();
            this.loaded = true;
            this.webGLRenderer.start();
            this.resize();
            this.animationLoop();
            this.centerModel();
          };
          this.loadTextures = async () => {
            const { textureImages } = this.buffers;
            for (let i = 0; i < textureImages.length; i++) {
              const img = textureImages[i];
              this.webGLRenderer.loadTexture(i, img);
            }
          };
          this.resize = () => {
            if (this.keepAspect) {
              const ratio = this.width / this.height;
              if (this.canvas.width / this.canvas.height >= ratio) {
                this.canvas.height = this.canvas.height;
                this.canvas.width = this.canvas.height * ratio;
              } else {
                this.canvas.width = this.canvas.width;
                this.canvas.height = this.canvas.width / ratio;
              }
            } else {
              this.canvas.width = this.canvas.clientWidth ? this.canvas.clientWidth : this.canvas.width;
              this.canvas.height = this.canvas.clientHeight ? this.canvas.clientHeight : this.canvas.height;
            }
            const aspectRatio = this.canvas.width / this.canvas.height;
            const logicalHeight = 2;
            const logicalWidth = logicalHeight * aspectRatio;
            this.logicalLeft = -logicalWidth / 2;
            this.logicalRight = logicalWidth / 2;
            this.logicalBottom = -logicalHeight / 2;
            this.logicalTop = logicalHeight / 2;
            this.viewMatrix.setScreenRect(this.logicalLeft, this.logicalRight, this.logicalBottom, this.logicalTop);
            this.viewMatrix.scale(1, 1);
            this.deviceToScreen.loadIdentity();
            const screenScale = logicalHeight / this.canvas.height;
            this.deviceToScreen.scaleRelative(screenScale, -screenScale);
            this.deviceToScreen.translateRelative(-this.canvas.width * 0.5, -this.canvas.height * 0.5);
            this.viewMatrix.setMinScale(this.minScale);
            this.viewMatrix.setMaxScale(this.maxScale);
            this.viewMatrix.setMaxScreenRect(this.logicalLeft, this.logicalRight, this.logicalBottom, this.logicalTop);
          };
          this.updateTime = () => {
            this.currentFrame = performance.now();
            this.deltaTime = (this.currentFrame - this.lastFrame) / 1e3;
            this.lastFrame = this.currentFrame;
          };
          this.updateCamera = () => {
            const { x, y, scale } = this.cameraController;
            const logicalX = this.logicalLeft + x / this.canvas.width * (this.logicalRight - this.logicalLeft);
            const logicalY = this.logicalTop + y / this.canvas.height * (this.logicalTop - this.logicalBottom);
            const centerX = (this.logicalLeft + this.logicalRight) / 2;
            this.viewMatrix.scale(scale, scale);
            this.viewMatrix.translate(centerX - logicalX, this.logicalTop - logicalY * (this.scaledYPos ? scale : 1));
          };
          this.updateProjection = () => {
            const { width, height } = this.canvas;
            const projection = new cubismmatrix44_1.CubismMatrix44();
            const canvasAspect = width / height;
            if (this.model.getCanvasWidth() > 1 && width < height) {
              this.modelMatrix.setWidth(2);
              projection.scale(1, canvasAspect);
            } else {
              projection.scale(1 / canvasAspect, 1);
            }
            if (this.viewMatrix) {
              projection.multiplyByMatrix(this.viewMatrix);
            }
            this.projection = projection;
          };
          this.update = () => {
            var _a2;
            if (!this.model || this.webGLRenderer.contextLost())
              return;
            this.updateTime();
            this.updateCamera();
            this.updateProjection();
            this.webGLRenderer.prepare();
            this.deltaTime *= this.speed;
            if (this.needsResize) {
              this.resize();
              this.needsResize = false;
            }
            this.model.saveParameters();
            let motionUpdated = this.motionController.update(this.deltaTime);
            this.expressionController.update(this.deltaTime);
            if (!this.paused) {
              this.dragManager.update(this.deltaTime);
              this.dragX = this.dragManager.getX();
              this.dragY = this.dragManager.getY();
              if (!motionUpdated) {
                if (this.eyeBlink !== null && this.enableEyeblink) {
                  this.eyeBlink.updateParameters(this.model, this.deltaTime);
                }
              }
              if (this.enableMovement) {
                const manager = (_a2 = live2dcubismframework_1.CubismFramework.getIdManager) === null || _a2 === void 0 ? void 0 : _a2.call(live2dcubismframework_1.CubismFramework);
                const paramAngleX = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleX);
                const paramAngleY = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleY);
                const paramAngleZ = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamAngleZ);
                const paramBodyAngleX = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamBodyAngleX);
                const paramEyeBallX = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamEyeBallX);
                const paramEyeBallY = manager === null || manager === void 0 ? void 0 : manager.getId(cubismdefaultparameterid_1.CubismDefaultParameterId.ParamEyeBallY);
                if (paramAngleX)
                  this.model.addParameterValueById(paramAngleX, this.dragX * 30);
                if (paramAngleY)
                  this.model.addParameterValueById(paramAngleY, this.dragY * 30);
                if (paramAngleZ)
                  this.model.addParameterValueById(paramAngleZ, this.dragX * this._dragY * -30);
                if (paramBodyAngleX)
                  this.model.addParameterValueById(paramBodyAngleX, this._dragX * 10);
                if (paramEyeBallX)
                  this.model.addParameterValueById(paramEyeBallX, this.dragX);
                if (paramEyeBallY)
                  this.model.addParameterValueById(paramEyeBallY, this.dragY);
              }
              if (this.breath !== null && this.enableBreath) {
                this.breath.updateParameters(this.model, this.deltaTime);
              }
              if (this.physics !== null && this.enablePhysics) {
                this.physics.evaluate(this.model, this.deltaTime);
              }
              if (this.lipsync && this.enableLipsync) {
                this.wavController.update(this.deltaTime);
                let value = this.wavController.getRms();
                for (let i = 0; i < this.lipSyncIds.getSize(); ++i) {
                  const parameterIndex = this.model.getParameterIndex(this.lipSyncIds.at(i));
                  const minValue = this.model.getParameterMinimumValue(parameterIndex);
                  const maxValue = this.model.getParameterMaximumValue(parameterIndex);
                  const scaledValue = minValue + (maxValue - minValue) * value;
                  this.model.addParameterValueById(this.lipSyncIds.at(i), scaledValue, 0.8);
                }
              }
              if (this.pose !== null && this.enablePose) {
                this.pose.updateParameters(this.model, this.deltaTime);
              }
            }
            this.model.update();
            this.model.loadParameters();
            this.webGLRenderer.draw();
          };
          this.animationLoop = () => {
            this.update();
            if (!this.autoAnimate)
              return;
            const loop = async () => {
              this.update();
              id = window.requestAnimationFrame(loop);
            };
            loop();
          };
          this.stopMotions = () => {
            if (!this.loaded)
              return;
            this.motionController.stopMotions();
          };
          this.startMotion = async (group, i, priority, onStartMotion, onEndMotion) => {
            return this.motionController.startMotion(group, i, priority, onStartMotion, onEndMotion);
          };
          this.startRandomMotion = async (group, priority, onStartMotion, onEndMotion) => {
            return this.motionController.startRandomMotion(group, priority, onStartMotion, onEndMotion);
          };
          this.getExpressions = () => {
            return this.expressionIds;
          };
          this.getMotions = () => {
            return this.motionIds;
          };
          this.hasLipsync = () => {
            return this.lipsync;
          };
          this.setExpression = (expression) => {
            return this.expressionController.setExpression(expression);
          };
          this.setRandomExpression = () => {
            return this.expressionController.setRandomExpression();
          };
          this.inputAudio = async (wavBuffer, playAudio = false) => {
            return this.wavController.start(wavBuffer, playAudio);
          };
          this.stopAudio = () => {
            return this.wavController.stop();
          };
          this.hitTest = (areaName, x, y) => {
            if (!this.loaded)
              return;
            if (this.opacity < 1)
              return;
            for (let i = 0; i < this.settings.getHitAreasCount(); i++) {
              if (this.settings.getHitAreaName(i) == areaName) {
                const drawId = this.settings.getHitAreaId(i);
                return this.isHit(drawId, x, y);
              }
            }
          };
          this.isMocConsistent = () => {
            const { modelBuffer } = this.buffers;
            return cubismmoc_1.CubismMoc.hasMocConsistency(modelBuffer);
          };
          this.transformX = (pointX) => {
            const screenX = this.deviceToScreen.transformX(pointX);
            return this.viewMatrix.invertTransformX(screenX);
          };
          this.transformY = (pointY) => {
            const screenY = this.deviceToScreen.transformY(pointY);
            return this.viewMatrix.invertTransformY(screenY);
          };
          this.takeScreenshot = async (format = "png", faceCrop = false) => {
            this.centerModel();
            this.update();
            if (faceCrop) {
              const clonedCanvas = document.createElement("canvas");
              const cropSize = this.canvas.width / 4;
              clonedCanvas.width = cropSize;
              clonedCanvas.height = cropSize;
              const ctx = clonedCanvas.getContext("2d");
              const startX = (this.canvas.width - cropSize) / 2;
              ctx.drawImage(this.canvas, startX, 0, cropSize, cropSize, 0, 0, cropSize, cropSize);
              return clonedCanvas.toDataURL(`image/${format}`);
            } else {
              return this.canvas.toDataURL(`image/${format}`);
            }
          };
          this.zoomIn = (factor = 0.1) => {
            return this.cameraController.zoomIn(factor);
          };
          this.zoomOut = (factor = 0.1) => {
            return this.cameraController.zoomOut(factor);
          };
          this.centerModel = () => {
            this.x = this.canvas.width / 2;
            this.y = 0;
            this.update();
            const clonedCanvas = document.createElement("canvas");
            clonedCanvas.width = this.canvas.width / this.scale;
            clonedCanvas.height = this.canvas.height / this.scale;
            const ctx = clonedCanvas.getContext("2d");
            ctx.scale(1 / this.scale, 1 / this.scale);
            ctx.drawImage(this.canvas, 0, 0);
            const imageData = ctx.getImageData(0, 0, clonedCanvas.width, clonedCanvas.height).data;
            let firstNonTransparentY = clonedCanvas.height;
            let lastNonTransparentY = 0;
            for (let y = 0; y < clonedCanvas.height; y++) {
              for (let x = 0; x < clonedCanvas.width; x++) {
                if (imageData[(y * clonedCanvas.width + x) * 4 + 3] !== 0) {
                  firstNonTransparentY = Math.min(firstNonTransparentY, y);
                  lastNonTransparentY = Math.max(lastNonTransparentY, y);
                }
              }
            }
            const characterHeight = lastNonTransparentY - firstNonTransparentY;
            let marginHeight = this.canvas.height / 15 / this.scale;
            let centerOffset = characterHeight / 2 * (this.scale - 1) * this.scale;
            let offsetY = firstNonTransparentY * (1.5 * this.scale ** this.scale) * (this.scale - 1);
            if (this.scaledYPos) {
              this.y = -firstNonTransparentY * 1.1 + marginHeight + this.appendYOffset;
            } else {
              if (this.scale === 1) {
                offsetY = firstNonTransparentY - this.canvas.height / 15;
                marginHeight = 0;
              }
              this.y = centerOffset - marginHeight - offsetY + this.appendYOffset;
            }
          };
          this.characterPosition = () => {
            const savedX = this.x;
            const savedY = this.y;
            this.x = this.canvas.width / 2;
            this.y = 0;
            this.update();
            const clonedCanvas = document.createElement("canvas");
            clonedCanvas.width = this.canvas.width / this.scale;
            clonedCanvas.height = this.canvas.height / this.scale;
            const ctx = clonedCanvas.getContext("2d");
            ctx.scale(1 / this.scale, 1 / this.scale);
            ctx.drawImage(this.canvas, 0, 0, clonedCanvas.width, clonedCanvas.height);
            this.x = savedX;
            this.y = savedY;
            const imageData = ctx.getImageData(0, 0, clonedCanvas.width, clonedCanvas.height).data;
            let firstNonTransparentY = clonedCanvas.height;
            let lastNonTransparentY = 0;
            for (let y = 0; y < clonedCanvas.height; y++) {
              for (let x = 0; x < clonedCanvas.width; x++) {
                if (imageData[(y * clonedCanvas.width + x) * 4 + 3] !== 0) {
                  firstNonTransparentY = Math.min(firstNonTransparentY, y);
                  lastNonTransparentY = Math.max(lastNonTransparentY, y);
                }
              }
            }
            const characterHeight = lastNonTransparentY - firstNonTransparentY;
            let marginHeight = this.canvas.height / 15;
            return { firstNonTransparentY, lastNonTransparentY, characterHeight, marginHeight };
          };
          this.getParameterName = (parameter) => {
            var _a2, _b2;
            if (!this.displayInfo)
              return parameter;
            return (_b2 = (_a2 = this.displayInfo.Parameters.find((p) => p.Id === parameter)) === null || _a2 === void 0 ? void 0 : _a2.Name) !== null && _b2 !== void 0 ? _b2 : parameter;
          };
          this.getPartName = (part) => {
            var _a2, _b2;
            if (!this.displayInfo)
              return part;
            return (_b2 = (_a2 = this.displayInfo.Parts.find((p) => p.Id === part)) === null || _a2 === void 0 ? void 0 : _a2.Name) !== null && _b2 !== void 0 ? _b2 : part;
          };
          this.getParameterNames = () => {
            return this.parameters.ids.map((id2) => this.getParameterName(id2));
          };
          this.getPartNames = () => {
            return this.parts.ids.map((id2) => this.getPartName(id2));
          };
          this.canvas = canvas;
          this.motions = new csmmap_1.csmMap();
          this.expressions = new csmmap_1.csmMap();
          this.expressionIds = [];
          this.motionIds = [];
          this.textures = new csmvector_1.csmVector();
          this.eyeBlinkIds = new csmvector_1.csmVector();
          this.lipSyncIds = new csmvector_1.csmVector();
          this.viewMatrix = new cubismviewmatrix_1.CubismViewMatrix();
          this.projection = new cubismmatrix44_1.CubismMatrix44();
          this.deviceToScreen = new cubismmatrix44_1.CubismMatrix44();
          this.queueManager = new cubismmotionqueuemanager_1.CubismMotionQueueManager();
          this.cubismCorePath = (_a = options.cubismCorePath) !== null && _a !== void 0 ? _a : "/live2dcubismcore.min.js";
          this.mocConsistency = (_b = options.checkMocConsistency) !== null && _b !== void 0 ? _b : true;
          this.premultipliedAlpha = (_c = options.premultipliedAlpha) !== null && _c !== void 0 ? _c : true;
          this.autoAnimate = (_d = options.autoAnimate) !== null && _d !== void 0 ? _d : true;
          this.autoInteraction = (_e = options.autoInteraction) !== null && _e !== void 0 ? _e : true;
          this.tapInteraction = (_f = options.tapInteraction) !== null && _f !== void 0 ? _f : true;
          this.keepAspect = (_g = options.keepAspect) !== null && _g !== void 0 ? _g : false;
          this.randomMotion = (_h = options.randomMotion) !== null && _h !== void 0 ? _h : true;
          this._paused = (_j = options.paused) !== null && _j !== void 0 ? _j : false;
          this.speed = (_k = options.speed) !== null && _k !== void 0 ? _k : 1;
          this.audioContext = (_l = options.audioContext) !== null && _l !== void 0 ? _l : new AudioContext();
          this.scaledYPos = (_m = options.scaledYPos) !== null && _m !== void 0 ? _m : false;
          this.appendYOffset = (_o = options.appendYOffset) !== null && _o !== void 0 ? _o : 0;
          if (options.maxTextureSize)
            this.maxTextureSize = options.maxTextureSize;
          if (options.connectNode)
            this.connectNode = options.connectNode;
          this.wavController = new WavFileController_1.WavFileController(this);
          this.touchController = new TouchController_1.TouchController(this);
          this.motionController = new MotionController_1.MotionController(this);
          this.expressionController = new ExpressionController_1.ExpressionController(this);
          this.cameraController = new CameraController_1.CameraController(this);
          this.webGLRenderer = new WebGLRenderer_1.WebGLRenderer(this);
          this.cameraController.zoomEnabled = (_p = options.zoomEnabled) !== null && _p !== void 0 ? _p : true;
          this.cameraController.enablePan = (_q = options.enablePan) !== null && _q !== void 0 ? _q : true;
          this.cameraController.doubleClickReset = (_r = options.doubleClickReset) !== null && _r !== void 0 ? _r : true;
          this.cameraController.minScale = (_s = options.minScale) !== null && _s !== void 0 ? _s : 0.1;
          this.cameraController.maxScale = (_t = options.maxScale) !== null && _t !== void 0 ? _t : 10;
          this.cameraController.panSpeed = (_u = options.panSpeed) !== null && _u !== void 0 ? _u : 1;
          this.cameraController.zoomStep = (_v = options.zoomStep) !== null && _v !== void 0 ? _v : 5e-3;
          this.cameraController.scale = (_w = options.scale) !== null && _w !== void 0 ? _w : 1;
          this.cameraController.x = (_x = options.x) !== null && _x !== void 0 ? _x : this.canvas.width / 2;
          this.cameraController.y = (_y = options.y) !== null && _y !== void 0 ? _y : 0;
          this.wavController.smoothingFactor = (_z = options.lipsyncSmoothing) !== null && _z !== void 0 ? _z : 0.1;
          this.wavController.volumeNode.gain.value = (_0 = options.volume) !== null && _0 !== void 0 ? _0 : 1;
          this.enablePhysics = (_1 = options.enablePhysics) !== null && _1 !== void 0 ? _1 : true;
          this.enableBreath = (_2 = options.enableBreath) !== null && _2 !== void 0 ? _2 : true;
          this.enableEyeblink = (_3 = options.enableEyeblink) !== null && _3 !== void 0 ? _3 : true;
          this.enableLipsync = (_4 = options.enableLipsync) !== null && _4 !== void 0 ? _4 : true;
          this.enableMotion = (_5 = options.enableMotion) !== null && _5 !== void 0 ? _5 : true;
          this.enableExpression = (_6 = options.enableExpression) !== null && _6 !== void 0 ? _6 : true;
          this.enableMovement = (_7 = options.enableMovement) !== null && _7 !== void 0 ? _7 : true;
          this.enablePose = (_8 = options.enablePose) !== null && _8 !== void 0 ? _8 : true;
          this.updateTime();
        }
      };
      exports.Live2DCubismModel = Live2DCubismModel2;
    }
  });

  // node_modules/live2d-renderer/build/live2dcubism.js
  var require_live2dcubism = __commonJS({
    "node_modules/live2d-renderer/build/live2dcubism.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.compressLive2DTextures = exports.isLive2DZip = exports.WebGLRenderer = exports.MotionController = exports.ExpressionController = exports.TouchController = exports.CameraController = exports.WavFileController = exports.Live2DCubismUserModel = exports.Live2DCubismModel = void 0;
      var Live2DCubismModel_1 = require_Live2DCubismModel();
      Object.defineProperty(exports, "Live2DCubismModel", { enumerable: true, get: function() {
        return Live2DCubismModel_1.Live2DCubismModel;
      } });
      var Live2DCubismUserModel_1 = require_Live2DCubismUserModel();
      Object.defineProperty(exports, "Live2DCubismUserModel", { enumerable: true, get: function() {
        return Live2DCubismUserModel_1.Live2DCubismUserModel;
      } });
      var WavFileController_1 = require_WavFileController();
      Object.defineProperty(exports, "WavFileController", { enumerable: true, get: function() {
        return WavFileController_1.WavFileController;
      } });
      var CameraController_1 = require_CameraController();
      Object.defineProperty(exports, "CameraController", { enumerable: true, get: function() {
        return CameraController_1.CameraController;
      } });
      var ExpressionController_1 = require_ExpressionController();
      Object.defineProperty(exports, "ExpressionController", { enumerable: true, get: function() {
        return ExpressionController_1.ExpressionController;
      } });
      var MotionController_1 = require_MotionController();
      Object.defineProperty(exports, "MotionController", { enumerable: true, get: function() {
        return MotionController_1.MotionController;
      } });
      var TouchController_1 = require_TouchController();
      Object.defineProperty(exports, "TouchController", { enumerable: true, get: function() {
        return TouchController_1.TouchController;
      } });
      var WebGLRenderer_1 = require_WebGLRenderer();
      Object.defineProperty(exports, "WebGLRenderer", { enumerable: true, get: function() {
        return WebGLRenderer_1.WebGLRenderer;
      } });
      var Live2DCubismModel_2 = require_Live2DCubismModel();
      Object.defineProperty(exports, "isLive2DZip", { enumerable: true, get: function() {
        return Live2DCubismModel_2.isLive2DZip;
      } });
      Object.defineProperty(exports, "compressLive2DTextures", { enumerable: true, get: function() {
        return Live2DCubismModel_2.compressLive2DTextures;
      } });
      exports.default = Live2DCubismModel_1.Live2DCubismModel;
    }
  });

  // src/renderer/shared/live2d-bundle-entry.js
  var live2d_bundle_entry_exports = {};
  __export(live2d_bundle_entry_exports, {
    Live2DCubismModel: () => import_live2d_renderer.Live2DCubismModel
  });
  var import_live2d_renderer = __toESM(require_live2dcubism());
  return __toCommonJS(live2d_bundle_entry_exports);
})();
/*! Bundled license information:

jszip/dist/jszip.min.js:
  (*!
  
  JSZip v3.10.1 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  *)
*/
