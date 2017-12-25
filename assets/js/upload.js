(function (factory) {
    if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // Browser globals (with support for web workers)
        var glob;

        try {
            glob = window;
        } catch (e) {
            glob = self;
        }

        glob.SparkMD5 = factory();
    }
}(function (undefined) {

    'use strict';

    /*
     * Fastest md5 implementation around (JKM md5).
     * Credits: Joseph Myers
     *
     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
     * @see http://jsperf.com/md5-shootout/7
     */

    /* this function is much faster,
      so if possible we use it. Some IEs
      are the only ones I know of that
      need the idiotic second function,
      generated by an if clause.  */
    var add32 = function (a, b) {
            return (a + b) & 0xFFFFFFFF;
        },
        hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];


    function cmn(q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }

    function md5cycle(x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];

        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b = (b << 22 | b >>> 10) + c | 0;

        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b = (b << 20 | b >>> 12) + c | 0;

        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b = (b << 23 | b >>> 9) + c | 0;

        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b = (b << 21 | b >>> 11) + c | 0;

        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
    }

    function md5blk(s) {
        var md5blks = [],
            i;
        /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    function md5blk_array(a) {
        var md5blks = [],
            i;
        /* Andy King said do it this way. */

        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
        }
        return md5blks;
    }

    function md51(s) {
        var n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        length = s.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        }
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);
        return state;
    }

    function md51_array(a) {
        var n = a.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i,
            length,
            tail,
            tmp,
            lo,
            hi;

        for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
        }

        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
        // containing the last element of the parent array if the sub array specified starts
        // beyond the length of the parent array - weird.
        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);

        length = a.length;
        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a[i] << ((i % 4) << 3);
        }

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Beware that the final length might not fit in 32 bits so we take care of that
        tmp = n * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;

        md5cycle(state, tail);

        return state;
    }

    function rhex(n) {
        var s = '',
            j;
        for (j = 0; j < 4; j += 1) {
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        }
        return s;
    }

    function hex(x) {
        var i;
        for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i]);
        }
        return x.join('');
    }

    // In some cases the fast add32 function cannot be used..
    if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') {
        add32 = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        };
    }

    // ---------------------------------------------------

    /**
     * ArrayBuffer slice polyfill.
     *
     * @see https://github.com/ttaubert/node-arraybuffer-slice
     */

    if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {
        (function () {
            function clamp(val, length) {
                val = (val | 0) || 0;

                if (val < 0) {
                    return Math.max(val + length, 0);
                }

                return Math.min(val, length);
            }

            ArrayBuffer.prototype.slice = function (from, to) {
                var length = this.byteLength,
                    begin = clamp(from, length),
                    end = length,
                    num,
                    target,
                    targetArray,
                    sourceArray;

                if (to !== undefined) {
                    end = clamp(to, length);
                }

                if (begin > end) {
                    return new ArrayBuffer(0);
                }

                num = end - begin;
                target = new ArrayBuffer(num);
                targetArray = new Uint8Array(target);

                sourceArray = new Uint8Array(this, begin, num);
                targetArray.set(sourceArray);

                return target;
            };
        })();
    }

    // ---------------------------------------------------

    /**
     * Helpers.
     */

    function toUtf8(str) {
        if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
        }

        return str;
    }

    function utf8Str2ArrayBuffer(str, returnUInt8Array) {
        var length = str.length,
            buff = new ArrayBuffer(length),
            arr = new Uint8Array(buff),
            i;

        for (i = 0; i < length; i += 1) {
            arr[i] = str.charCodeAt(i);
        }

        return returnUInt8Array ? arr : buff;
    }

    function arrayBuffer2Utf8Str(buff) {
        return String.fromCharCode.apply(null, new Uint8Array(buff));
    }

    function concatenateArrayBuffers(first, second, returnUInt8Array) {
        var result = new Uint8Array(first.byteLength + second.byteLength);

        result.set(new Uint8Array(first));
        result.set(new Uint8Array(second), first.byteLength);

        return returnUInt8Array ? result : result.buffer;
    }

    function hexToBinaryString(hex) {
        var bytes = [],
            length = hex.length,
            x;

        for (x = 0; x < length - 1; x += 2) {
            bytes.push(parseInt(hex.substr(x, 2), 16));
        }

        return String.fromCharCode.apply(String, bytes);
    }

    // ---------------------------------------------------

    /**
     * SparkMD5 OOP implementation.
     *
     * Use this class to perform an incremental md5, otherwise use the
     * static methods instead.
     */

    function SparkMD5() {
        // call reset to init the instance
        this.reset();
    }

    /**
     * Appends a string.
     * A conversion will be applied if an utf8 string is detected.
     *
     * @param {String} str The string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.append = function (str) {
        // Converts the string to utf8 bytes if necessary
        // Then append as binary
        this.appendBinary(toUtf8(str));

        return this;
    };

    /**
     * Appends a binary string.
     *
     * @param {String} contents The binary string to be appended
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.appendBinary = function (contents) {
        this._buff += contents;
        this._length += contents.length;

        var length = this._buff.length,
            i;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
        }

        this._buff = this._buff.substring(i - 64);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     *
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            i,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = hex(this._hash);

        if (raw) {
            ret = hexToBinaryString(ret);
        }

        this.reset();

        return ret;
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.reset = function () {
        this._buff = '';
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @return {Object} The state
     */
    SparkMD5.prototype.getState = function () {
        return {
            buff: this._buff,
            length: this._length,
            hash: this._hash
        };
    };

    /**
     * Gets the internal state of the computation.
     *
     * @param {Object} state The state
     *
     * @return {SparkMD5} The instance itself
     */
    SparkMD5.prototype.setState = function (state) {
        this._buff = state.buff;
        this._length = state.length;
        this._hash = state.hash;

        return this;
    };

    /**
     * Releases memory used by the incremental buffer and other additional
     * resources. If you plan to use the instance again, use reset instead.
     */
    SparkMD5.prototype.destroy = function () {
        delete this._hash;
        delete this._buff;
        delete this._length;
    };

    /**
     * Finish the final calculation based on the tail.
     *
     * @param {Array}  tail   The tail (will be modified)
     * @param {Number} length The length of the remaining buffer
     */
    SparkMD5.prototype._finish = function (tail, length) {
        var i = length,
            tmp,
            lo,
            hi;

        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(this._hash, tail);
            for (i = 0; i < 16; i += 1) {
                tail[i] = 0;
            }
        }

        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        tmp = this._length * 8;
        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
        lo = parseInt(tmp[2], 16);
        hi = parseInt(tmp[1], 16) || 0;

        tail[14] = lo;
        tail[15] = hi;
        md5cycle(this._hash, tail);
    };

    /**
     * Performs the md5 hash on a string.
     * A conversion will be applied if utf8 string is detected.
     *
     * @param {String}  str The string
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.hash = function (str, raw) {
        // Converts the string to utf8 bytes if necessary
        // Then compute it using the binary function
        return SparkMD5.hashBinary(toUtf8(str), raw);
    };

    /**
     * Performs the md5 hash on a binary string.
     *
     * @param {String}  content The binary string
     * @param {Boolean} raw     True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.hashBinary = function (content, raw) {
        var hash = md51(content),
            ret = hex(hash);

        return raw ? hexToBinaryString(ret) : ret;
    };

    // ---------------------------------------------------

    /**
     * SparkMD5 OOP implementation for array buffers.
     *
     * Use this class to perform an incremental md5 ONLY for array buffers.
     */
    SparkMD5.ArrayBuffer = function () {
        // call reset to init the instance
        this.reset();
    };

    /**
     * Appends an array buffer.
     *
     * @param {ArrayBuffer} arr The array to be appended
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.append = function (arr) {
        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
            length = buff.length,
            i;

        this._length += arr.byteLength;

        for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
        }

        this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);

        return this;
    };

    /**
     * Finishes the incremental computation, reseting the internal state and
     * returning the result.
     *
     * @param {Boolean} raw True to get the raw string, false to get the hex string
     *
     * @return {String} The result
     */
    SparkMD5.ArrayBuffer.prototype.end = function (raw) {
        var buff = this._buff,
            length = buff.length,
            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            i,
            ret;

        for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff[i] << ((i % 4) << 3);
        }

        this._finish(tail, length);
        ret = hex(this._hash);

        if (raw) {
            ret = hexToBinaryString(ret);
        }

        this.reset();

        return ret;
    };

    /**
     * Resets the internal state of the computation.
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.reset = function () {
        this._buff = new Uint8Array(0);
        this._length = 0;
        this._hash = [1732584193, -271733879, -1732584194, 271733878];

        return this;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @return {Object} The state
     */
    SparkMD5.ArrayBuffer.prototype.getState = function () {
        var state = SparkMD5.prototype.getState.call(this);

        // Convert buffer to a string
        state.buff = arrayBuffer2Utf8Str(state.buff);

        return state;
    };

    /**
     * Gets the internal state of the computation.
     *
     * @param {Object} state The state
     *
     * @return {SparkMD5.ArrayBuffer} The instance itself
     */
    SparkMD5.ArrayBuffer.prototype.setState = function (state) {
        // Convert string to buffer
        state.buff = utf8Str2ArrayBuffer(state.buff, true);

        return SparkMD5.prototype.setState.call(this, state);
    };

    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;

    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;

    /**
     * Performs the md5 hash on an array buffer.
     *
     * @param {ArrayBuffer} arr The array buffer
     * @param {Boolean}     raw True to get the raw string, false to get the hex one
     *
     * @return {String} The result
     */
    SparkMD5.ArrayBuffer.hash = function (arr, raw) {
        var hash = md51_array(new Uint8Array(arr)),
            ret = hex(hash);

        return raw ? hexToBinaryString(ret) : ret;
    };

    return SparkMD5;
}));

'use strict'

//上传组件
let upload = {

    //默认配置
    defaultConfig: {
        /**
         * 初始化
         * @param data
         */
        init: function (data) {
        },
        /**
         * 触发inputId
         */
        inputId: "",
        /**
         * 预处理地址 文件合并成功后返回路径
         * 返回格式 {error: 0, chunkSize: 1048576, subDir: "201712", uploadBaseName: "1514170775890", uploadExt: "chm"}
         */
        preprocessUrl: "/chen/preprocess",
        /**
         * 上传块地址
         * 返回格式 {error: 0, savedPath: ""}
         */
        uploadingUrl: "/chen/uploading",
        /**
         * md5校验进度回调
         * @param percent 校验进度百分比
         */
        cancelUrl: "/chen/uploadCancel",
        preprocess: function (percent) {
        },
        /**
         * 上传块成功回调
         * @param res 服务端返回数据
         * @param percent 上传进度百分比
         * @param speed 上传速度
         * @param time time.spendTime 上传已花费时间 time.remainTime 上传剩余时间
         */
        uploadSuccess: function (res,percent,speed,time) {
        },
        /**
         * 上传失败回调
         * @param err 错误
         */
        uploadError: function (err) {
        },
        cancelSuccess: function(){
        },
        cancelError:function(err){}
    },

    //配置
    config: function (config) {
        config = typeof(config) == "undefined" ? {} : config

        for (let i in this.defaultConfig) {
            if (this.defaultConfig.hasOwnProperty(i)) {
                config[i] = config[i] || this.defaultConfig[i]
            }
        }

        this.configs = config

        return this
    },

    //初始化处理
    initHandle: function () {
        let _this = this

        _this.config()

        if (typeof this.configs.init == "function") {
            _this.configs.init()
        }

        //监听上传事件
        _this.event.on('upload', function () {
            console.log('uploading...')
            _this.i = 0
            clearInterval(_this.uploadingInterval)
            _this.upload()
        })

        //监听暂停事件
        _this.event.on('push', function () {
            console.log('push...')
            clearInterval(_this.uploadingInterval)
        })

        //监听开始事件
        _this.event.on('start', function(){
            console.log('start...')
            _this.uploadingInterval = setInterval(_this.proxy(_this.uploading, _this), 1000)
        })

        //监听取消事件
        _this.event.on('cancel',function(){
            console.log('cancel...')
            clearInterval(_this.uploadingInterval)
            _this.cancel()
        })

        return _this
    },

    upload: function () { //上传
        this.fileDom = document.getElementById(this.configs.inputId)
        this.file = this.fileDom.files[0]
        this.fileName = this.file.name
        this.fileSize = this.file.size
        this.uploadBaseName = ""
        this.uploadExt = ""
        this.chunkSize = 0
        this.chunkCount = 0
        this.subDir = ""
        this.savedPath = ""
        this.fileHash = ""
        this.blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        this.i = 0
        this.spendTime = 0

        if (!("FileReader" in window) || !("File" in window)) {
            this.preprocess() //浏览器不支持读取本地文件，跳过计算hash
        } else {
            this.calculateHash()
        }
    },

    calculateHash: function () { //计算hash
        let _this = this,
            chunkSize = 1024 * 1024 * 1,
            chunks = Math.ceil(_this.file.size / chunkSize),
            currentChunk = 0,
            spark = new SparkMD5.ArrayBuffer(),
            fileReader = new FileReader()

        fileReader.onload = function (e) {
            spark.append(e.target.result)
            ++currentChunk
            typeof(_this.configs.preprocess) !== "undefined" ?
                _this.configs.preprocess((currentChunk / chunks * 100).toFixed(2) + "%") : null
            if (currentChunk < chunks) {
                loadNext()
            } else {
                _this.fileHash = spark.end()
                _this.preprocess()
            }
        }

        fileReader.onerror = function () {
            _this.preprocess()
        }

        function loadNext() {
            let start = currentChunk * chunkSize,
                end = start + chunkSize >= _this.file.size ? _this.file.size : start + chunkSize
            fileReader.readAsArrayBuffer(_this.blobSlice.call(_this.file, start, end))
        }

        loadNext()
    },

    preprocess: function () { //预处理
        let _this = this
        let form = new FormData()
        form.append('file_name', _this.fileName)
        form.append('file_size', _this.fileSize)
        form.append('file_hash', _this.fileHash)
        form.append('group', _this.group)
        _this.ajax({
            url: this.configs.preprocessUrl,
            type: "POST",
            data: form,
            dataType: "json",
            async: false,
            processData: false,
            contentType: false,
            success: function (rst) {
                if (rst.error) {
                    console.log(rst.error)
                    return
                }

                _this.uploadBaseName = rst.uploadBaseName
                _this.uploadExt = rst.uploadExt
                _this.chunkSize = rst.chunkSize
                _this.chunkCount = Math.ceil(_this.fileSize / _this.chunkSize)
                _this.subDir = rst.subDir

                if (rst.savedPath.length === 0) {
                    _this.uploadingInterval = setInterval(_this.proxy(_this.uploading, _this), 1000)
                } else {
                    clearInterval(_this.uploadingInterval)
                    _this.savedPath = rst.savedPath
                    typeof(_this.configs.uploadSuccess) !== "undefined" ? _this.configs.uploadSuccess(rst) : null
                }
            }
        })
    },

    uploading: function () { //上传块

        let _this = this,
            start = this.i * this.chunkSize,
            end = Math.min(this.fileSize, start + this.chunkSize),
            form = new FormData()

        form.append("file", this.file.slice(start, end))
        form.append("upload_ext", this.uploadExt)
        form.append("chunk_total", this.chunkCount)
        form.append("chunk_index", this.i + 1)
        form.append("upload_basename", this.uploadBaseName)
        form.append("group", this.group)
        form.append("sub_dir", this.subDir)

        _this.ajax({
            url: _this.configs.uploadingUrl,
            type: "POST",
            data: form,
            dataType: "json",
            async: false,
            processData: false,
            contentType: false,
            success: function (res, costTime) {
                if (res.error) {
                    console.log(res.error)
                    clearInterval(_this.uploadingInterval)
                    return
                }

                let uploadSize, remainSize, speed, percent
                let time = {}

                if (_this.i + 1 === _this.chunkCount) {
                    clearInterval(_this.uploadingInterval)
                    uploadSize = _this.fileSize - _this.i * _this.chunkSize
                    remainSize = 0
                } else {
                    uploadSize = _this.chunkSize
                    remainSize = _this.fileSize - _this.i * _this.chunkSize
                }

                speed = uploadSize / costTime
                percent = (remainSize ? ((_this.fileSize - remainSize) / _this.fileSize) * 100 : 100).toFixed(2)
                time.spendTime = ((_this.spendTime + costTime) / 1000).toFixed(2) + 's'
                time.remainTime = (remainSize / speed / 1000).toFixed(2) + 's'

                typeof(_this.configs.uploadSuccess) !== "undefined" ? _this.configs.uploadSuccess(res, percent + "%", speed, time) : null

                _this.spendTime = _this.spendTime + costTime
                ++_this.i
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status === 0) {
                    console.log('重试...')
                    _this.sleep(3000)
                } else {
                    console.log('上传失败')
                    clearInterval(_this.uploadingInterval)
                }
            }
        })
    },

    cancel:function() { //取消上传
        let _this = this,
            form = new FormData()

        form.append("upload_basename", this.uploadBaseName)
        form.append("upload_ext", this.uploadExt)
        form.append("group", this.group)
        form.append("sub_dir",this.subDir)

        _this.ajax({
            url: _this.configs.cancelUrl,
            type: "POST",
            data: form,
            dataType: "json",
            async: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.error) {
                    console.log(res.error)
                    clearInterval(_this.uploadingInterval)
                    return
                }
                console.log(res)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status === 0) {
                    console.log('重试...')
                    _this.sleep(3000)
                } else {
                    console.log('取消失败')
                    clearInterval(_this.uploadingInterval)
                }
            }
        })
    },

    sleep: function (milliSecond) { //暂停
        let wakeUpTime = new Date().getTime() + milliSecond
        while (true) {
            if (new Date().getTime() > wakeUpTime) {
                return
            }
        }
    },

    ajax: function (options) { //异步请求
        options = options || {}
        let xhr = this.xhr()
        let startTime = new Date().getTime()
        xhr.onreadystatechange = function () {
            switch (xhr.readyState) {
                case 0 :
                    //console.log(0,'未初始化....')
                    break
                case 1 :
                    //console.log(1,'请求参数已准备，尚未发送请求...')
                    break
                case 2 :
                    //console.log(2,'已经发送请求,尚未接收响应')
                    break
                case 3 :
                    //console.log(3,'正在接受部分响应.....')
                    break
                case 4 :
                    //console.log(4,'响应全部接受完毕')
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        if (typeof options.success != "undefined") {
                            let costTime = new Date().getTime() - startTime
                            options.success(JSON.parse(xhr.responseText), costTime)
                        }
                    } else {
                        if (typeof options.error != "undefined") {
                            options.error('error:' + xhr.status)
                        }
                    }
                    break
            }
        }

        xhr.open(options.type, options.url)
        xhr.send(options.data)
    },

    xhr: function () {

        // IE7+,Firefox, Opera, Chrome ,Safari
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest()
        }
        // IE6-
        else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                let versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXMLHttp"], i, len
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i])
                        arguments.callee.activeXString = versions[i]
                        break
                    } catch (ex) {
                        alert("请升级浏览器版本")
                    }
                }
            }
            return arguments.callee.activeXString
        } else {
            throw new Error("XHR对象不可用")
        }
    },

    proxy: function (fn, context) {
        let arr = []
        let slice = arr.slice
        let tmp, args, proxy
        if (typeof context === "string") {
            tmp = fn[context]
            context = fn
            fn = tmp
        }

        if (typeof fn != "function") {
            return undefined
        }

        args = slice.call(arguments, 2)

        proxy = function () {
            return fn.apply(context || this, args.concat(slice.call(arguments)))
        }

        proxy.guid = fn.guid = fn.guid

        return proxy
    },

    event: {
        // 通过on接口监听事件eventName
        // 如果事件eventName被触发，则执行callback回调函数
        on: function (eventName, callback) {
            //你的代码
            if (!this.handles) {
                //this.handles={};
                Object.defineProperty(this, "handles", {
                    value: {},
                    enumerable: false,
                    configurable: true,
                    writable: true
                })
            }

            if (!this.handles[eventName]) {
                this.handles[eventName] = [];
            }
            this.handles[eventName].push(callback);
        },
        // 触发事件 eventName
        emit: function (eventName) {
            //你的代码
            if (this.handles[arguments[0]]) {
                for (var i = 0; i < this.handles[arguments[0]].length; i++) {
                    this.handles[arguments[0]][i](arguments[1]);
                }
            }
        }
    }
}

export default upload.initHandle()