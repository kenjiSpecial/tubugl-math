(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('gl-matrix'), require('tubugl-utils')) :
  typeof define === 'function' && define.amd ? define(['exports', 'gl-matrix', 'tubugl-utils'], factory) :
  (factory((global.Tubu = {}),global.glMatrix,global.tubuglUtils));
}(this, (function (exports,glMatrix,tubuglUtils) { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Vector3 = function () {
  	function Vector3() {
  		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  		var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  		classCallCheck(this, Vector3);

  		this.needsUpdate = true;

  		this._x = x;
  		this._y = y;
  		this._z = z;

  		this.array = new Float32Array([x, y, z]);
  		this.matrix = glMatrix.mat4.create();
  	}

  	createClass(Vector3, [{
  		key: 'update',
  		value: function update() {
  			glMatrix.mat4.fromTranslation(this.matrix, this.array);
  		}
  	}, {
  		key: 'setArray',
  		value: function setArray(arr) {
  			this._x = arr[0];
  			this._y = arr[1];
  			this._z = arr[2];

  			this.array[0] = arr[0];
  			this.array[1] = arr[1];
  			this.array[2] = arr[2];

  			this.update();
  		}
  	}, {
  		key: 'x',
  		set: function set$$1(value) {
  			this.needsUpdate = true;
  			this._x = value;
  			this.array[0] = value;

  			this.update();
  		},
  		get: function get$$1() {
  			return this._x;
  		}
  	}, {
  		key: 'y',
  		set: function set$$1(value) {
  			this.needsUpdate = true;
  			this._y = value;
  			this.array[1] = value;

  			this.update();
  		},
  		get: function get$$1() {
  			return this._y;
  		}
  	}, {
  		key: 'z',
  		set: function set$$1(value) {
  			this.needsUpdate = true;
  			this._z = value;
  			this.array[2] = value;

  			this.update();
  		},
  		get: function get$$1() {
  			return this._z;
  		}
  	}]);
  	return Vector3;
  }();

  /**
   * this calss is imported from Euler.js in threejs
   * https://github.com/mrdoob/three.js/blob/master/src/math/Euler.js
   */

  var Euler = function () {
  	function Euler() {
  		var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  		var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  		var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  		var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'XYZ';
  		classCallCheck(this, Euler);

  		this._x = x;
  		this._y = y;
  		this._z = z;
  		this.array = new Float32Array(3);
  		this.matrix = glMatrix.mat4.create();
  		this.order = order;

  		this.update();
  	}

  	createClass(Euler, [{
  		key: 'setFromRotationMatrix',
  		value: function setFromRotationMatrix(m, order) {
  			// var clamp = _Math.clamp;

  			// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
  			var te = m;
  			var m11 = te[0],
  			    m12 = te[4],
  			    m13 = te[8];
  			var m21 = te[1],
  			    m22 = te[5],
  			    m23 = te[9];
  			var m31 = te[2],
  			    m32 = te[6],
  			    m33 = te[10];

  			order = order || this.order;

  			if (order === 'XYZ') {
  				this._y = Math.asin(tubuglUtils.mathUtils.clamp(m13, -1, 1));

  				if (Math.abs(m13) < 0.99999) {
  					this._x = Math.atan2(-m23, m33);
  					this._z = Math.atan2(-m12, m11);
  				} else {
  					this._x = Math.atan2(m32, m22);
  					this._z = 0;
  				}
  			} else if (order === 'YXZ') {
  				this._x = Math.asin(-tubuglUtils.mathUtils.clamp(m23, -1, 1));

  				if (Math.abs(m23) < 0.99999) {
  					this._y = Math.atan2(m13, m33);
  					this._z = Math.atan2(m21, m22);
  				} else {
  					this._y = Math.atan2(-m31, m11);
  					this._z = 0;
  				}
  			} else if (order === 'ZXY') {
  				this._x = Math.asin(tubuglUtils.mathUtils.clamp(m32, -1, 1));

  				if (Math.abs(m32) < 0.99999) {
  					this._y = Math.atan2(-m31, m33);
  					this._z = Math.atan2(-m12, m22);
  				} else {
  					this._y = 0;
  					this._z = Math.atan2(m21, m11);
  				}
  			} else if (order === 'ZYX') {
  				this._y = Math.asin(-tubuglUtils.mathUtils.clamp(m31, -1, 1));

  				if (Math.abs(m31) < 0.99999) {
  					this._x = Math.atan2(m32, m33);
  					this._z = Math.atan2(m21, m11);
  				} else {
  					this._x = 0;
  					this._z = Math.atan2(-m12, m22);
  				}
  			} else if (order === 'YZX') {
  				this._z = Math.asin(tubuglUtils.mathUtils.clamp(m21, -1, 1));

  				if (Math.abs(m21) < 0.99999) {
  					this._x = Math.atan2(-m23, m22);
  					this._y = Math.atan2(-m31, m11);
  				} else {
  					this._x = 0;
  					this._y = Math.atan2(m13, m33);
  				}
  			} else if (order === 'XZY') {
  				this._z = Math.asin(-tubuglUtils.mathUtils.clamp(m12, -1, 1));

  				if (Math.abs(m12) < 0.99999) {
  					this._x = Math.atan2(m32, m22);
  					this._y = Math.atan2(m13, m11);
  				} else {
  					this._x = Math.atan2(-m23, m33);
  					this._y = 0;
  				}
  			} else {
  				console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
  			}

  			this._order = order;

  			this.update();

  			return this;
  		}
  	}, {
  		key: 'update',
  		value: function update() {
  			this.array[0] = this._x;
  			this.array[1] = this._y;
  			this.array[2] = this._z;

  			this.needsMatrixUpdate = true;
  		}
  	}, {
  		key: 'updateMatrix',
  		value: function updateMatrix(isForceUpdate) {
  			if (this.needsMatrixUpdate || isForceUpdate) {
  				Euler.makeRotationFromEuler(this.matrix, this);
  				this.needsMatrixUpdate = false;
  			}
  		}
  	}, {
  		key: 'toMatrix4',
  		value: function toMatrix4(out) {
  			Euler.makeRotationFromEuler(out, this);
  			return out;
  		}

  		/**
     *
     * https://threejs.org/docs/index.html#api/math/Matrix4
     * @param {mat4} out
     * @param {euler} euler
     *
     *
     */

  	}, {
  		key: 'x',
  		set: function set$$1(value) {
  			this._x = value;
  			this.update();
  		},
  		get: function get$$1() {
  			return this._x;
  		}
  	}, {
  		key: 'y',
  		set: function set$$1(value) {
  			this._y = value;
  			this.update();
  		},
  		get: function get$$1() {
  			return this._y;
  		}
  	}, {
  		key: 'z',
  		set: function set$$1(value) {
  			this._z = value;
  			this.update();
  		},
  		get: function get$$1() {
  			return this._z;
  		}
  	}], [{
  		key: 'makeRotationFromEuler',
  		value: function makeRotationFromEuler(out, euler) {
  			var te = out;

  			var x = euler.x,
  			    y = euler.y,
  			    z = euler.z;
  			var a = Math.cos(x),
  			    b = Math.sin(x);
  			var c = Math.cos(y),
  			    d = Math.sin(y);
  			var e = Math.cos(z),
  			    f = Math.sin(z);

  			if (euler.order === 'XYZ') {
  				var ae = a * e,
  				    af = a * f,
  				    be = b * e,
  				    bf = b * f;

  				te[0] = c * e;
  				te[4] = -c * f;
  				te[8] = d;

  				te[1] = af + be * d;
  				te[5] = ae - bf * d;
  				te[9] = -b * c;

  				te[2] = bf - ae * d;
  				te[6] = be + af * d;
  				te[10] = a * c;
  			} else if (euler.order === 'YXZ') {
  				var ce = c * e,
  				    cf = c * f,
  				    de = d * e,
  				    df = d * f;

  				te[0] = ce + df * b;
  				te[4] = de * b - cf;
  				te[8] = a * d;

  				te[1] = a * f;
  				te[5] = a * e;
  				te[9] = -b;

  				te[2] = cf * b - de;
  				te[6] = df + ce * b;
  				te[10] = a * c;
  			} else if (euler.order === 'ZXY') {
  				var ce = c * e,
  				    cf = c * f,
  				    de = d * e,
  				    df = d * f;

  				te[0] = ce - df * b;
  				te[4] = -a * f;
  				te[8] = de + cf * b;

  				te[1] = cf + de * b;
  				te[5] = a * e;
  				te[9] = df - ce * b;

  				te[2] = -a * d;
  				te[6] = b;
  				te[10] = a * c;
  			} else if (euler.order === 'ZYX') {
  				var ae = a * e,
  				    af = a * f,
  				    be = b * e,
  				    bf = b * f;

  				te[0] = c * e;
  				te[4] = be * d - af;
  				te[8] = ae * d + bf;

  				te[1] = c * f;
  				te[5] = bf * d + ae;
  				te[9] = af * d - be;

  				te[2] = -d;
  				te[6] = b * c;
  				te[10] = a * c;
  			} else if (euler.order === 'YZX') {
  				var ac = a * c,
  				    ad = a * d,
  				    bc = b * c,
  				    bd = b * d;

  				te[0] = c * e;
  				te[4] = bd - ac * f;
  				te[8] = bc * f + ad;

  				te[1] = f;
  				te[5] = a * e;
  				te[9] = -b * e;

  				te[2] = -d * e;
  				te[6] = ad * f + bc;
  				te[10] = ac - bd * f;
  			} else if (euler.order === 'XZY') {
  				var ac = a * c,
  				    ad = a * d,
  				    bc = b * c,
  				    bd = b * d;

  				te[0] = c * e;
  				te[4] = -f;
  				te[8] = d * e;

  				te[1] = ac * f + bd;
  				te[5] = a * e;
  				te[9] = ad * f - bc;

  				te[2] = bc * f - ad;
  				te[6] = b * e;
  				te[10] = bd * f + ac;
  			}

  			// last column
  			te[3] = 0;
  			te[7] = 0;
  			te[11] = 0;

  			// bottom row
  			te[12] = 0;
  			te[13] = 0;
  			te[14] = 0;
  			te[15] = 1;

  			return out;
  		}
  	}]);
  	return Euler;
  }();

  exports.Vector3 = Vector3;
  exports.Euler = Euler;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
