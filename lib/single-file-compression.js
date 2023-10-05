const { Array: Array$1, Object: Object$1, String: String$1, Number, BigInt, Math, Date: Date$1, Map: Map$1, Set, Response, URL: URL$1, Error: Error$1, Uint8Array: Uint8Array$1, Uint16Array, Uint32Array: Uint32Array$1, DataView, Blob: Blob$2, Promise: Promise$1, TextEncoder: TextEncoder$1, TextDecoder: TextDecoder$1, document, crypto, btoa, TransformStream, ReadableStream, WritableStream, CompressionStream, DecompressionStream, navigator, Worker } = globalThis;

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const MAX_32_BITS = 0xffffffff;
const MAX_16_BITS = 0xffff;
const COMPRESSION_METHOD_DEFLATE = 0x08;
const COMPRESSION_METHOD_STORE = 0x00;
const COMPRESSION_METHOD_AES = 0x63;

const LOCAL_FILE_HEADER_SIGNATURE = 0x04034b50;
const SPLIT_ZIP_FILE_SIGNATURE = 0x08074b50;
const DATA_DESCRIPTOR_RECORD_SIGNATURE = SPLIT_ZIP_FILE_SIGNATURE;
const CENTRAL_FILE_HEADER_SIGNATURE = 0x02014b50;
const END_OF_CENTRAL_DIR_SIGNATURE = 0x06054b50;
const ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = 0x06064b50;
const ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = 0x07064b50;
const END_OF_CENTRAL_DIR_LENGTH = 22;
const ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH = 20;
const ZIP64_END_OF_CENTRAL_DIR_LENGTH = 56;
const ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH = END_OF_CENTRAL_DIR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LENGTH;

const EXTRAFIELD_TYPE_ZIP64 = 0x0001;
const EXTRAFIELD_TYPE_AES = 0x9901;
const EXTRAFIELD_TYPE_NTFS = 0x000a;
const EXTRAFIELD_TYPE_NTFS_TAG1 = 0x0001;
const EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP = 0x5455;
const EXTRAFIELD_TYPE_USDZ = 0x1986;

const BITFLAG_ENCRYPTED = 0x01;
const BITFLAG_DATA_DESCRIPTOR = 0x0008;
const BITFLAG_LANG_ENCODING_FLAG = 0x0800;
const FILE_ATTR_MSDOS_DIR_MASK = 0x10;

const VERSION_DEFLATE = 0x14;
const VERSION_ZIP64 = 0x2D;
const VERSION_AES = 0x33;

const DIRECTORY_SIGNATURE = "/";

const MAX_DATE = new Date$1(2107, 11, 31);
const MIN_DATE = new Date$1(1980, 0, 1);

const UNDEFINED_VALUE = undefined;
const UNDEFINED_TYPE$1 = "undefined";
const FUNCTION_TYPE$1 = "function";

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class StreamAdapter {

	constructor(Codec) {
		return class extends TransformStream {
			constructor(_format, options) {
				const codec = new Codec(options);
				super({
					transform(chunk, controller) {
						controller.enqueue(codec.append(chunk));
					},
					flush(controller) {
						const chunk = codec.flush();
						if (chunk) {
							controller.enqueue(chunk);
						}
					}
				});
			}
		};
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const MINIMUM_CHUNK_SIZE = 64;
let maxWorkers = 2;
try {
	if (typeof navigator != UNDEFINED_TYPE$1 && navigator.hardwareConcurrency) {
		maxWorkers = navigator.hardwareConcurrency;
	}
} catch (_error) {
	// ignored
}
const DEFAULT_CONFIGURATION = {
	chunkSize: 512 * 1024,
	maxWorkers,
	terminateWorkerTimeout: 5000,
	useWebWorkers: true,
	useCompressionStream: true,
	workerScripts: UNDEFINED_VALUE,
	CompressionStreamNative: typeof CompressionStream != UNDEFINED_TYPE$1 && CompressionStream,
	DecompressionStreamNative: typeof DecompressionStream != UNDEFINED_TYPE$1 && DecompressionStream
};

const config = Object$1.assign({}, DEFAULT_CONFIGURATION);

function getConfiguration() {
	return config;
}

function getChunkSize(config) {
	return Math.max(config.chunkSize, MINIMUM_CHUNK_SIZE);
}

function configure(configuration) {
	const {
		baseURL,
		chunkSize,
		maxWorkers,
		terminateWorkerTimeout,
		useCompressionStream,
		useWebWorkers,
		Deflate,
		Inflate,
		CompressionStream,
		DecompressionStream,
		workerScripts
	} = configuration;
	setIfDefined("baseURL", baseURL);
	setIfDefined("chunkSize", chunkSize);
	setIfDefined("maxWorkers", maxWorkers);
	setIfDefined("terminateWorkerTimeout", terminateWorkerTimeout);
	setIfDefined("useCompressionStream", useCompressionStream);
	setIfDefined("useWebWorkers", useWebWorkers);
	if (Deflate) {
		config.CompressionStream = new StreamAdapter(Deflate);
	}
	if (Inflate) {
		config.DecompressionStream = new StreamAdapter(Inflate);
	}
	setIfDefined("CompressionStream", CompressionStream);
	setIfDefined("DecompressionStream", DecompressionStream);
	if (workerScripts !== UNDEFINED_VALUE) {
		const { deflate, inflate } = workerScripts;
		if (deflate || inflate) {
			if (!config.workerScripts) {
				config.workerScripts = {};
			}
		}
		if (deflate) {
			if (!Array$1.isArray(deflate)) {
				throw new Error$1("workerScripts.deflate must be an array");
			}
			config.workerScripts.deflate = deflate;
		}
		if (inflate) {
			if (!Array$1.isArray(inflate)) {
				throw new Error$1("workerScripts.inflate must be an array");
			}
			config.workerScripts.inflate = inflate;
		}
	}
}

function setIfDefined(propertyName, propertyValue) {
	if (propertyValue !== UNDEFINED_VALUE) {
		config[propertyName] = propertyValue;
	}
}

function e(e){const t=()=>URL$1.createObjectURL(new Blob$2(['const{Array:e,Object:t,Number:n,Math:r,Error:s,Uint8Array:a,Uint16Array:i,Uint32Array:o,Int32Array:l,Map:c,DataView:h,Promise:f,TextEncoder:u,crypto:p,postMessage:d,TransformStream:g,ReadableStream:w,WritableStream:v,CompressionStream:y,DecompressionStream:b}=self;class m{constructor(e){return class extends g{constructor(t,n){const r=new e(n);super({transform(e,t){t.enqueue(r.append(e))},flush(e){const t=r.flush();t&&e.enqueue(t)}})}}}}const _=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;_[e]=t}class k{constructor(e){this.crc=e||-1}append(e){let t=0|this.crc;for(let n=0,r=0|e.length;r>n;n++)t=t>>>8^_[255&(t^e[n])];this.crc=t}get(){return~this.crc}}class S extends g{constructor(){let e;const t=new k;super({transform(e,n){t.append(e),n.enqueue(e)},flush(){const n=new a(4);new h(n.buffer).setUint32(0,t.get()),e.value=n}}),e=this}}const z={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],r=z.getPartial(n);return 32===r?e.concat(t):z._shiftRight(t,r,0|n,e.slice(0,e.length-1))},bitLength(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+z.getPartial(n)},clamp(e,t){if(32*e.length<t)return e;const n=(e=e.slice(0,r.ceil(t/32))).length;return t&=31,n>0&&t&&(e[n-1]=z.partial(t,e[n-1]&2147483648>>t-1,1)),e},partial:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,getPartial:e=>r.round(e/1099511627776)||32,_shiftRight(e,t,n,r){for(void 0===r&&(r=[]);t>=32;t-=32)r.push(n),n=0;if(0===t)return r.concat(e);for(let s=0;s<e.length;s++)r.push(n|e[s]>>>t),n=e[s]<<32-t;const s=e.length?e[e.length-1]:0,a=z.getPartial(s);return r.push(z.partial(t+a&31,t+a>32?n:r.pop(),1)),r}},D={bytes:{fromBits(e){const t=z.bitLength(e)/8,n=new a(t);let r;for(let s=0;t>s;s++)0==(3&s)&&(r=e[s/4]),n[s]=r>>>24,r<<=8;return n},toBits(e){const t=[];let n,r=0;for(n=0;n<e.length;n++)r=r<<8|e[n],3==(3&n)&&(t.push(r),r=0);return 3&n&&t.push(z.partial(8*(3&n),r)),t}}},C=class{constructor(e){const t=this;t.blockSize=512,t._init=[1732584193,4023233417,2562383102,271733878,3285377520],t._key=[1518500249,1859775393,2400959708,3395469782],e?(t._h=e._h.slice(0),t._buffer=e._buffer.slice(0),t._length=e._length):t.reset()}reset(){const e=this;return e._h=e._init.slice(0),e._buffer=[],e._length=0,e}update(e){const t=this;"string"==typeof e&&(e=D.utf8String.toBits(e));const n=t._buffer=z.concat(t._buffer,e),r=t._length,a=t._length=r+z.bitLength(e);if(a>9007199254740991)throw new s("Cannot hash more than 2^53 - 1 bits");const i=new o(n);let l=0;for(let e=t.blockSize+r-(t.blockSize+r&t.blockSize-1);a>=e;e+=t.blockSize)t._block(i.subarray(16*l,16*(l+1))),l+=1;return n.splice(0,16*l),t}finalize(){const e=this;let t=e._buffer;const n=e._h;t=z.concat(t,[z.partial(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(r.floor(e._length/4294967296)),t.push(0|e._length);t.length;)e._block(t.splice(0,16));return e.reset(),n}_f(e,t,n,r){return e>19?e>39?e>59?e>79?void 0:t^n^r:t&n|t&r|n&r:t^n^r:t&n|~t&r}_S(e,t){return t<<e|t>>>32-e}_block(t){const n=this,s=n._h,a=e(80);for(let e=0;16>e;e++)a[e]=t[e];let i=s[0],o=s[1],l=s[2],c=s[3],h=s[4];for(let e=0;79>=e;e++){16>e||(a[e]=n._S(1,a[e-3]^a[e-8]^a[e-14]^a[e-16]));const t=n._S(5,i)+n._f(e,o,l,c)+h+a[e]+n._key[r.floor(e/20)]|0;h=c,c=l,l=n._S(30,o),o=i,i=t}s[0]=s[0]+i|0,s[1]=s[1]+o|0,s[2]=s[2]+l|0,s[3]=s[3]+c|0,s[4]=s[4]+h|0}},I={getRandomValues(e){const t=new o(e.buffer),n=e=>{let t=987654321;const n=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&n,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&n)&n)/4294967296+.5)*(r.random()>.5?1:-1))};for(let s,a=0;a<e.length;a+=4){const e=n(4294967296*(s||r.random()));s=987654071*e(),t[a/4]=4294967296*e()|0}return e}},x={importKey:e=>new x.hmacSha1(D.bytes.toBits(e)),pbkdf2(e,t,n,r){if(n=n||1e4,0>r||0>n)throw new s("invalid params to pbkdf2");const a=1+(r>>5)<<2;let i,o,l,c,f;const u=new ArrayBuffer(a),p=new h(u);let d=0;const g=z;for(t=D.bytes.toBits(t),f=1;(a||1)>d;f++){for(i=o=e.encrypt(g.concat(t,[f])),l=1;n>l;l++)for(o=e.encrypt(o),c=0;c<o.length;c++)i[c]^=o[c];for(l=0;(a||1)>d&&l<i.length;l++)p.setInt32(d,i[l]),d+=4}return u.slice(0,r/8)},hmacSha1:class{constructor(e){const t=this,n=t._hash=C,r=[[],[]];t._baseHash=[new n,new n];const s=t._baseHash[0].blockSize/32;e.length>s&&(e=(new n).update(e).finalize());for(let t=0;s>t;t++)r[0][t]=909522486^e[t],r[1][t]=1549556828^e[t];t._baseHash[0].update(r[0]),t._baseHash[1].update(r[1]),t._resultHash=new n(t._baseHash[0])}reset(){const e=this;e._resultHash=new e._hash(e._baseHash[0]),e._updated=!1}update(e){this._updated=!0,this._resultHash.update(e)}digest(){const e=this,t=e._resultHash.finalize(),n=new e._hash(e._baseHash[1]).update(t).finalize();return e.reset(),n}encrypt(e){if(this._updated)throw new s("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},A=void 0!==p&&"function"==typeof p.getRandomValues,T="Invalid password",R="Invalid signature",H="zipjs-abort-check-password";function q(e){return A?p.getRandomValues(e):I.getRandomValues(e)}const B=16,K={name:"PBKDF2"},V=t.assign({hash:{name:"HMAC"}},K),P=t.assign({iterations:1e3,hash:{name:"SHA-1"}},K),E=["deriveBits"],U=[8,12,16],W=[16,24,32],M=10,N=[0,0,0,0],O="undefined",F="function",L=typeof p!=O,j=L&&p.subtle,G=L&&typeof j!=O,X=D.bytes,J=class{constructor(e){const t=this;t._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],t._tables[0][0][0]||t._precompute();const n=t._tables[0][4],r=t._tables[1],a=e.length;let i,o,l,c=1;if(4!==a&&6!==a&&8!==a)throw new s("invalid aes key size");for(t._key=[o=e.slice(0),l=[]],i=a;4*a+28>i;i++){let e=o[i-1];(i%a==0||8===a&&i%a==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],i%a==0&&(e=e<<8^e>>>24^c<<24,c=c<<1^283*(c>>7))),o[i]=o[i-a]^e}for(let e=0;i;e++,i--){const t=o[3&e?i:i-4];l[e]=4>=i||4>e?t:r[0][n[t>>>24]]^r[1][n[t>>16&255]]^r[2][n[t>>8&255]]^r[3][n[255&t]]}}encrypt(e){return this._crypt(e,0)}decrypt(e){return this._crypt(e,1)}_precompute(){const e=this._tables[0],t=this._tables[1],n=e[4],r=t[4],s=[],a=[];let i,o,l,c;for(let e=0;256>e;e++)a[(s[e]=e<<1^283*(e>>7))^e]=e;for(let h=i=0;!n[h];h^=o||1,i=a[i]||1){let a=i^i<<1^i<<2^i<<3^i<<4;a=a>>8^255&a^99,n[h]=a,r[a]=h,c=s[l=s[o=s[h]]];let f=16843009*c^65537*l^257*o^16843008*h,u=257*s[a]^16843008*a;for(let n=0;4>n;n++)e[n][h]=u=u<<24^u>>>8,t[n][a]=f=f<<24^f>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}_crypt(e,t){if(4!==e.length)throw new s("invalid aes block size");const n=this._key[t],r=n.length/4-2,a=[0,0,0,0],i=this._tables[t],o=i[0],l=i[1],c=i[2],h=i[3],f=i[4];let u,p,d,g=e[0]^n[0],w=e[t?3:1]^n[1],v=e[2]^n[2],y=e[t?1:3]^n[3],b=4;for(let e=0;r>e;e++)u=o[g>>>24]^l[w>>16&255]^c[v>>8&255]^h[255&y]^n[b],p=o[w>>>24]^l[v>>16&255]^c[y>>8&255]^h[255&g]^n[b+1],d=o[v>>>24]^l[y>>16&255]^c[g>>8&255]^h[255&w]^n[b+2],y=o[y>>>24]^l[g>>16&255]^c[w>>8&255]^h[255&v]^n[b+3],b+=4,g=u,w=p,v=d;for(let e=0;4>e;e++)a[t?3&-e:e]=f[g>>>24]<<24^f[w>>16&255]<<16^f[v>>8&255]<<8^f[255&y]^n[b++],u=g,g=w,w=v,v=y,y=u;return a}},Q=class{constructor(e,t){this._prf=e,this._initIv=t,this._iv=t}reset(){this._iv=this._initIv}update(e){return this.calculate(this._prf,e,this._iv)}incWord(e){if(255==(e>>24&255)){let t=e>>16&255,n=e>>8&255,r=255&e;255===t?(t=0,255===n?(n=0,255===r?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}else e+=1<<24;return e}incCounter(e){0===(e[0]=this.incWord(e[0]))&&(e[1]=this.incWord(e[1]))}calculate(e,t,n){let r;if(!(r=t.length))return[];const s=z.bitLength(t);for(let s=0;r>s;s+=4){this.incCounter(n);const r=e.encrypt(n);t[s]^=r[0],t[s+1]^=r[1],t[s+2]^=r[2],t[s+3]^=r[3]}return z.clamp(t,s)}},Y=x.hmacSha1;let Z=L&&G&&typeof j.importKey==F,$=L&&G&&typeof j.deriveBits==F;class ee extends g{constructor({password:e,signed:n,encryptionStrength:r,checkPasswordOnly:i}){super({start(){t.assign(this,{ready:new f((e=>this.resolveReady=e)),password:e,signed:n,strength:r-1,pending:new a})},async transform(e,t){const n=this,{password:r,strength:o,resolveReady:l,ready:c}=n;r?(await(async(e,t,n,r)=>{const a=await re(e,t,n,ae(r,0,U[t])),i=ae(r,U[t]);if(a[0]!=i[0]||a[1]!=i[1])throw new s(T)})(n,o,r,ae(e,0,U[o]+2)),e=ae(e,U[o]+2),i?t.error(new s(H)):l()):await c;const h=new a(e.length-M-(e.length-M)%B);t.enqueue(ne(n,e,h,0,M,!0))},async flush(e){const{signed:t,ctr:n,hmac:r,pending:i,ready:o}=this;await o;const l=ae(i,0,i.length-M),c=ae(i,i.length-M);let h=new a;if(l.length){const e=oe(X,l);r.update(e);const t=n.update(e);h=ie(X,t)}if(t){const e=ae(ie(X,r.digest()),0,M);for(let t=0;M>t;t++)if(e[t]!=c[t])throw new s(R)}e.enqueue(h)}})}}class te extends g{constructor({password:e,encryptionStrength:n}){let r;super({start(){t.assign(this,{ready:new f((e=>this.resolveReady=e)),password:e,strength:n-1,pending:new a})},async transform(e,t){const n=this,{password:r,strength:s,resolveReady:i,ready:o}=n;let l=new a;r?(l=await(async(e,t,n)=>{const r=q(new a(U[t]));return se(r,await re(e,t,n,r))})(n,s,r),i()):await o;const c=new a(l.length+e.length-e.length%B);c.set(l,0),t.enqueue(ne(n,e,c,l.length,0))},async flush(e){const{ctr:t,hmac:n,pending:s,ready:i}=this;await i;let o=new a;if(s.length){const e=t.update(oe(X,s));n.update(e),o=ie(X,e)}r.signature=ie(X,n.digest()).slice(0,M),e.enqueue(se(o,r.signature))}}),r=this}}function ne(e,t,n,r,s,i){const{ctr:o,hmac:l,pending:c}=e,h=t.length-s;let f;for(c.length&&(t=se(c,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new a(t)).set(n,0)}return e})(n,h-h%B)),f=0;h-B>=f;f+=B){const e=oe(X,ae(t,f,f+B));i&&l.update(e);const s=o.update(e);i||l.update(s),n.set(ie(X,s),f+r)}return e.pending=ae(t,f),n}async function re(n,r,s,i){n.password=null;const o=(e=>{if(void 0===u){const t=new a((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new u).encode(e)})(s),l=await(async(e,t,n,r,s)=>{if(!Z)return x.importKey(t);try{return await j.importKey("raw",t,n,!1,s)}catch(e){return Z=!1,x.importKey(t)}})(0,o,V,0,E),c=await(async(e,t,n)=>{if(!$)return x.pbkdf2(t,e.salt,P.iterations,n);try{return await j.deriveBits(e,t,n)}catch(r){return $=!1,x.pbkdf2(t,e.salt,P.iterations,n)}})(t.assign({salt:i},P),l,8*(2*W[r]+2)),h=new a(c),f=oe(X,ae(h,0,W[r])),p=oe(X,ae(h,W[r],2*W[r])),d=ae(h,2*W[r]);return t.assign(n,{keys:{key:f,authentication:p,passwordVerification:d},ctr:new Q(new J(f),e.from(N)),hmac:new Y(p)}),d}function se(e,t){let n=e;return e.length+t.length&&(n=new a(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function ae(e,t,n){return e.subarray(t,n)}function ie(e,t){return e.fromBits(t)}function oe(e,t){return e.toBits(t)}class le extends g{constructor({password:e,passwordVerification:n,checkPasswordOnly:r}){super({start(){t.assign(this,{password:e,passwordVerification:n}),ue(this,e)},transform(e,t){const n=this;if(n.password){const t=he(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new s(T);e=e.subarray(12)}r?t.error(new s(H)):t.enqueue(he(n,e))}})}}class ce extends g{constructor({password:e,passwordVerification:n}){super({start(){t.assign(this,{password:e,passwordVerification:n}),ue(this,e)},transform(e,t){const n=this;let r,s;if(n.password){n.password=null;const t=q(new a(12));t[11]=n.passwordVerification,r=new a(e.length+t.length),r.set(fe(n,t),0),s=12}else r=new a(e.length),s=0;r.set(fe(n,e),s),t.enqueue(r)}})}}function he(e,t){const n=new a(t.length);for(let r=0;r<t.length;r++)n[r]=de(e)^t[r],pe(e,n[r]);return n}function fe(e,t){const n=new a(t.length);for(let r=0;r<t.length;r++)n[r]=de(e)^t[r],pe(e,t[r]);return n}function ue(e,n){const r=[305419896,591751049,878082192];t.assign(e,{keys:r,crcKey0:new k(r[0]),crcKey2:new k(r[2])});for(let t=0;t<n.length;t++)pe(e,n.charCodeAt(t))}function pe(e,t){let[n,s,a]=e.keys;e.crcKey0.append([t]),n=~e.crcKey0.get(),s=we(r.imul(we(s+ge(n)),134775813)+1),e.crcKey2.append([s>>>24]),a=~e.crcKey2.get(),e.keys=[n,s,a]}function de(e){const t=2|e.keys[2];return ge(r.imul(t,1^t)>>>8)}function ge(e){return 255&e}function we(e){return 4294967295&e}const ve="deflate-raw";class ye extends g{constructor(e,{chunkSize:t,CompressionStream:n,CompressionStreamNative:r}){super({});const{compressed:s,encrypted:a,useCompressionStream:i,zipCrypto:o,signed:l,level:c}=e,f=this;let u,p,d=me(super.readable);a&&!o||!l||(u=new S,d=Se(d,u)),s&&(d=ke(d,i,{level:c,chunkSize:t},r,n)),a&&(o?d=Se(d,new ce(e)):(p=new te(e),d=Se(d,p))),_e(f,d,(()=>{let e;a&&!o&&(e=p.signature),a&&!o||!l||(e=new h(u.value.buffer).getUint32(0)),f.signature=e}))}}class be extends g{constructor(e,{chunkSize:t,DecompressionStream:n,DecompressionStreamNative:r}){super({});const{zipCrypto:a,encrypted:i,signed:o,signature:l,compressed:c,useCompressionStream:f}=e;let u,p,d=me(super.readable);i&&(a?d=Se(d,new le(e)):(p=new ee(e),d=Se(d,p))),c&&(d=ke(d,f,{chunkSize:t},r,n)),i&&!a||!o||(u=new S,d=Se(d,u)),_e(this,d,(()=>{if((!i||a)&&o){const e=new h(u.value.buffer);if(l!=e.getUint32(0,!1))throw new s(R)}}))}}function me(e){return Se(e,new g({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function _e(e,n,r){n=Se(n,new g({flush:r})),t.defineProperty(e,"readable",{get:()=>n})}function ke(e,t,n,r,s){try{e=Se(e,new(t&&r?r:s)(ve,n))}catch(r){if(!t)throw r;e=Se(e,new s(ve,n))}return e}function Se(e,t){return e.pipeThrough(t)}const ze="data";class De extends g{constructor(e,n){super({});const r=this,{codecType:s}=e;let a;s.startsWith("deflate")?a=ye:s.startsWith("inflate")&&(a=be);let i=0;const o=new a(e,n),l=super.readable,c=new g({transform(e,t){e&&e.length&&(i+=e.length,t.enqueue(e))},flush(){const{signature:e}=o;t.assign(r,{signature:e,size:i})}});t.defineProperty(r,"readable",{get:()=>l.pipeThrough(o).pipeThrough(c)})}}const Ce=new c,Ie=new c;let xe=0;async function Ae(e){try{const{options:t,scripts:r,config:s}=e;r&&r.length&&importScripts.apply(void 0,r),self.initCodec&&self.initCodec(),s.CompressionStreamNative=self.CompressionStream,s.DecompressionStreamNative=self.DecompressionStream,self.Deflate&&(s.CompressionStream=new m(self.Deflate)),self.Inflate&&(s.DecompressionStream=new m(self.Inflate));const a={highWaterMark:1,size:()=>s.chunkSize},i=e.readable||new w({async pull(e){const t=new f((e=>Ce.set(xe,e)));Te({type:"pull",messageId:xe}),xe=(xe+1)%n.MAX_SAFE_INTEGER;const{value:r,done:s}=await t;e.enqueue(r),s&&e.close()}},a),o=e.writable||new v({async write(e){let t;const r=new f((e=>t=e));Ie.set(xe,t),Te({type:ze,value:e,messageId:xe}),xe=(xe+1)%n.MAX_SAFE_INTEGER,await r}},a),l=new De(t,s);await i.pipeThrough(l).pipeTo(o,{preventClose:!0,preventAbort:!0});try{await o.getWriter().close()}catch(e){}const{signature:c,size:h}=l;Te({type:"close",result:{signature:c,size:h}})}catch(e){Re(e)}}function Te(e){let{value:t}=e;if(t)if(t.length)try{t=new a(t),e.value=t.buffer,d(e,[e.value])}catch(t){d(e)}else d(e);else d(e)}function Re(e=new s("Unknown error")){const{message:t,stack:n,code:r,name:a}=e;d({error:{message:t,stack:n,code:r,name:a}})}addEventListener("message",(({data:e})=>{const{type:t,messageId:n,value:r,done:s}=e;try{if("start"==t&&Ae(e),t==ze){const e=Ce.get(n);Ce.delete(n),e({value:new a(r),done:s})}if("ack"==t){const e=Ie.get(n);Ie.delete(n),e()}}catch(e){Re(e)}}));var He=a,qe=i,Be=l,Ke=new He([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ve=new He([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Pe=new He([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ee=(e,t)=>{for(var n=new qe(31),r=0;31>r;++r)n[r]=t+=1<<e[r-1];var s=new Be(n[30]);for(r=1;30>r;++r)for(var a=n[r];a<n[r+1];++a)s[a]=a-n[r]<<5|r;return{b:n,r:s}},Ue=Ee(Ke,2),We=Ue.b,Me=Ue.r;We[28]=258,Me[258]=28;for(var Ne=Ee(Ve,0),Oe=Ne.b,Fe=Ne.r,Le=new qe(32768),je=0;32768>je;++je){var Ge=(43690&je)>>1|(21845&je)<<1;Ge=(61680&(Ge=(52428&Ge)>>2|(13107&Ge)<<2))>>4|(3855&Ge)<<4,Le[je]=((65280&Ge)>>8|(255&Ge)<<8)>>1}var Xe=(e,t,n)=>{for(var r=e.length,s=0,a=new qe(t);r>s;++s)e[s]&&++a[e[s]-1];var i,o=new qe(t);for(s=1;t>s;++s)o[s]=o[s-1]+a[s-1]<<1;if(n){i=new qe(1<<t);var l=15-t;for(s=0;r>s;++s)if(e[s])for(var c=s<<4|e[s],h=t-e[s],f=o[e[s]-1]++<<h,u=f|(1<<h)-1;u>=f;++f)i[Le[f]>>l]=c}else for(i=new qe(r),s=0;r>s;++s)e[s]&&(i[s]=Le[o[e[s]-1]++]>>15-e[s]);return i},Je=new He(288);for(je=0;144>je;++je)Je[je]=8;for(je=144;256>je;++je)Je[je]=9;for(je=256;280>je;++je)Je[je]=7;for(je=280;288>je;++je)Je[je]=8;var Qe=new He(32);for(je=0;32>je;++je)Qe[je]=5;var Ye=Xe(Je,9,0),Ze=Xe(Je,9,1),$e=Xe(Qe,5,0),et=Xe(Qe,5,1),tt=e=>{for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},nt=(e,t,n)=>{var r=t/8|0;return(e[r]|e[r+1]<<8)>>(7&t)&n},rt=(e,t)=>{var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(7&t)},st=e=>(e+7)/8|0,at=(e,t,n)=>{(null==t||0>t)&&(t=0),(null==n||n>e.length)&&(n=e.length);var r=new He(n-t);return r.set(e.subarray(t,n)),r},it=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ot=(e,t,n)=>{var r=new s(t||it[e]);if(r.code=e,s.captureStackTrace&&s.captureStackTrace(r,ot),!n)throw r;return r},lt=(e,t,n)=>{n<<=7&t;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},ct=(e,t,n)=>{n<<=7&t;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},ht=(e,t)=>{for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var s=n.length,a=n.slice();if(!s)return{t:vt,l:0};if(1==s){var i=new He(n[0].s+1);return i[n[0].s]=1,{t:i,l:1}}n.sort(((e,t)=>e.f-t.f)),n.push({s:-1,f:25001});var o=n[0],l=n[1],c=0,h=1,f=2;for(n[0]={s:-1,f:o.f+l.f,l:o,r:l};h!=s-1;)o=n[n[c].f<n[f].f?c++:f++],l=n[c!=h&&n[c].f<n[f].f?c++:f++],n[h++]={s:-1,f:o.f+l.f,l:o,r:l};var u=a[0].s;for(r=1;s>r;++r)a[r].s>u&&(u=a[r].s);var p=new qe(u+1),d=ft(n[h-1],p,0);if(d>t){r=0;var g=0,w=d-t,v=1<<w;for(a.sort(((e,t)=>p[t.s]-p[e.s]||e.f-t.f));s>r;++r){var y=a[r].s;if(p[y]<=t)break;g+=v-(1<<d-p[y]),p[y]=t}for(g>>=w;g>0;){var b=a[r].s;p[b]<t?g-=1<<t-p[b]++-1:++r}for(;r>=0&&g;--r){var m=a[r].s;p[m]==t&&(--p[m],++g)}d=t}return{t:new He(p),l:d}},ft=(e,t,n)=>-1==e.s?r.max(ft(e.l,t,n+1),ft(e.r,t,n+1)):t[e.s]=n,ut=e=>{for(var t=e.length;t&&!e[--t];);for(var n=new qe(++t),r=0,s=e[0],a=1,i=e=>{n[r++]=e},o=1;t>=o;++o)if(e[o]==s&&o!=t)++a;else{if(!s&&a>2){for(;a>138;a-=138)i(32754);a>2&&(i(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(i(s),--a;a>6;a-=6)i(8304);a>2&&(i(a-3<<5|8208),a=0)}for(;a--;)i(s);a=1,s=e[o]}return{c:n.subarray(0,r),n:t}},pt=(e,t)=>{for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},dt=(e,t,n)=>{var r=n.length,s=st(t+2);e[s]=255&r,e[s+1]=r>>8,e[s+2]=255^e[s],e[s+3]=255^e[s+1];for(var a=0;r>a;++a)e[s+a+4]=n[a];return 8*(s+4+r)},gt=(e,t,n,r,s,a,i,o,l,c,h)=>{lt(t,h++,n),++s[256];for(var f=ht(s,15),u=f.t,p=f.l,d=ht(a,15),g=d.t,w=d.l,v=ut(u),y=v.c,b=v.n,m=ut(g),_=m.c,k=m.n,S=new qe(19),z=0;z<y.length;++z)++S[31&y[z]];for(z=0;z<_.length;++z)++S[31&_[z]];for(var D=ht(S,7),C=D.t,I=D.l,x=19;x>4&&!C[Pe[x-1]];--x);var A,T,R,H,q=c+5<<3,B=pt(s,Je)+pt(a,Qe)+i,K=pt(s,u)+pt(a,g)+i+14+3*x+pt(S,C)+2*S[16]+3*S[17]+7*S[18];if(l>=0&&B>=q&&K>=q)return dt(t,h,e.subarray(l,l+c));if(lt(t,h,1+(B>K)),h+=2,B>K){A=Xe(u,p,0),T=u,R=Xe(g,w,0),H=g;var V=Xe(C,I,0);for(lt(t,h,b-257),lt(t,h+5,k-1),lt(t,h+10,x-4),h+=14,z=0;x>z;++z)lt(t,h+3*z,C[Pe[z]]);h+=3*x;for(var P=[y,_],E=0;2>E;++E){var U=P[E];for(z=0;z<U.length;++z){var W=31&U[z];lt(t,h,V[W]),h+=C[W],W>15&&(lt(t,h,U[z]>>5&127),h+=U[z]>>12)}}}else A=Ye,T=Je,R=$e,H=Qe;for(z=0;o>z;++z){var M=r[z];if(M>255){ct(t,h,A[257+(W=M>>18&31)]),h+=T[W+257],W>7&&(lt(t,h,M>>23&31),h+=Ke[W]);var N=31&M;ct(t,h,R[N]),h+=H[N],N>3&&(ct(t,h,M>>5&8191),h+=Ve[N])}else ct(t,h,A[M]),h+=T[M]}return ct(t,h,A[256]),h+T[256]},wt=new Be([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),vt=new He(0),yt=function(){function e(e,t){if("function"==typeof e&&(t=e,e={}),this.ondata=t,this.o=e||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new He(98304),this.o.dictionary){var n=this.o.dictionary.subarray(-32768);this.b.set(n,32768-n.length),this.s.i=32768-n.length}}return e.prototype.p=function(e,t){this.ondata(((e,t,n,s,a)=>{if(!a&&(a={l:1},t.dictionary)){var i=t.dictionary.subarray(-32768),o=new He(i.length+e.length);o.set(i),o.set(e,i.length),e=o,a.w=i.length}return((e,t,n,s,a,i)=>{var o=i.z||e.length,l=new He(0+o+5*(1+r.ceil(o/7e3))+0),c=l.subarray(0,l.length-0),h=i.l,f=7&(i.r||0);if(t){f&&(c[0]=i.r>>3);for(var u=wt[t-1],p=u>>13,d=8191&u,g=(1<<n)-1,w=i.p||new qe(32768),v=i.h||new qe(g+1),y=r.ceil(n/3),b=2*y,m=t=>(e[t]^e[t+1]<<y^e[t+2]<<b)&g,_=new Be(25e3),k=new qe(288),S=new qe(32),z=0,D=0,C=i.i||0,I=0,x=i.w||0,A=0;o>C+2;++C){var T=m(C),R=32767&C,H=v[T];if(w[R]=H,v[T]=R,C>=x){var q=o-C;if((z>7e3||I>24576)&&(q>423||!h)){f=gt(e,c,0,_,k,S,D,I,A,C-A,f),I=z=D=0,A=C;for(var B=0;286>B;++B)k[B]=0;for(B=0;30>B;++B)S[B]=0}var K=2,V=0,P=d,E=R-H&32767;if(q>2&&T==m(C-E))for(var U=r.min(p,q)-1,W=r.min(32767,C),M=r.min(258,q);W>=E&&--P&&R!=H;){if(e[C+K]==e[C+K-E]){for(var N=0;M>N&&e[C+N]==e[C+N-E];++N);if(N>K){if(K=N,V=E,N>U)break;var O=r.min(E,N-2),F=0;for(B=0;O>B;++B){var L=C-E+B&32767,j=L-w[L]&32767;j>F&&(F=j,H=L)}}}E+=(R=H)-(H=w[R])&32767}if(V){_[I++]=268435456|Me[K]<<18|Fe[V];var G=31&Me[K],X=31&Fe[V];D+=Ke[G]+Ve[X],++k[257+G],++S[X],x=C+K,++z}else _[I++]=e[C],++k[e[C]]}}for(C=r.max(C,x);o>C;++C)_[I++]=e[C],++k[e[C]];f=gt(e,c,h,_,k,S,D,I,A,C-A,f),h||(i.r=7&f|c[f/8|0]<<3,f-=7,i.h=v,i.p=w,i.i=C,i.w=x)}else{for(C=i.w||0;o+h>C;C+=65535){var J=C+65535;o>J||(c[f/8|0]=h,J=o),f=dt(c,f+1,e.subarray(C,J))}i.i=o}return at(l,0,0+st(f)+0)})(e,null==t.level?6:t.level,null==t.mem?r.ceil(1.5*r.max(8,r.min(13,r.log(e.length)))):12+t.mem,0,0,a)})(e,this.o,0,0,this.s),t)},e.prototype.push=function(e,t){this.ondata||ot(5),this.s.l&&ot(4);var n=e.length+this.s.z;if(n>this.b.length){if(n>2*this.b.length-32768){var r=new He(-32768&n);r.set(this.b.subarray(0,this.s.z)),this.b=r}var s=this.b.length-this.s.z;s&&(this.b.set(e.subarray(0,s),this.s.z),this.s.z=this.b.length,this.p(this.b,!1)),this.b.set(this.b.subarray(-32768)),this.b.set(e.subarray(s),32768),this.s.z=e.length-s+32768,this.s.i=32766,this.s.w=32768}else this.b.set(e,this.s.z),this.s.z+=e.length;this.s.l=1&t,(this.s.z>this.s.w+8191||t)&&(this.p(this.b,t||!1),this.s.w=this.s.i,this.s.i-=2)},e}(),bt=function(){function e(e,t){"function"==typeof e&&(t=e,e={}),this.ondata=t;var n=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:n?n.length:0},this.o=new He(32768),this.p=new He(0),n&&this.o.set(n)}return e.prototype.e=function(e){if(this.ondata||ot(5),this.d&&ot(4),this.p.length){if(e.length){var t=new He(this.p.length+e.length);t.set(this.p),t.set(e,this.p.length),this.p=t}}else this.p=e},e.prototype.c=function(e){this.s.i=+(this.d=e||!1);var t=this.s.b,n=((e,t,n)=>{var s=e.length;if(!s||t.f&&!t.l)return n||new He(0);var a=!n||2!=t.i,i=t.i;n||(n=new He(3*s));var o=e=>{var t=n.length;if(e>t){var s=new He(r.max(2*t,e));s.set(n),n=s}},l=t.f||0,c=t.p||0,h=t.b||0,f=t.l,u=t.d,p=t.m,d=t.n,g=8*s;do{if(!f){l=nt(e,c,1);var w=nt(e,c+1,3);if(c+=3,!w){var v=e[(x=st(c)+4)-4]|e[x-3]<<8,y=x+v;if(y>s){i&&ot(0);break}a&&o(h+v),n.set(e.subarray(x,y),h),t.b=h+=v,t.p=c=8*y,t.f=l;continue}if(1==w)f=Ze,u=et,p=9,d=5;else if(2==w){var b=nt(e,c,31)+257,m=nt(e,c+10,15)+4,_=b+nt(e,c+5,31)+1;c+=14;for(var k=new He(_),S=new He(19),z=0;m>z;++z)S[Pe[z]]=nt(e,c+3*z,7);c+=3*m;var D=tt(S),C=(1<<D)-1,I=Xe(S,D,1);for(z=0;_>z;){var x,A=I[nt(e,c,C)];if(c+=15&A,16>(x=A>>4))k[z++]=x;else{var T=0,R=0;for(16==x?(R=3+nt(e,c,3),c+=2,T=k[z-1]):17==x?(R=3+nt(e,c,7),c+=3):18==x&&(R=11+nt(e,c,127),c+=7);R--;)k[z++]=T}}var H=k.subarray(0,b),q=k.subarray(b);p=tt(H),d=tt(q),f=Xe(H,p,1),u=Xe(q,d,1)}else ot(1);if(c>g){i&&ot(0);break}}a&&o(h+131072);for(var B=(1<<p)-1,K=(1<<d)-1,V=c;;V=c){var P=(T=f[rt(e,c)&B])>>4;if((c+=15&T)>g){i&&ot(0);break}if(T||ot(2),256>P)n[h++]=P;else{if(256==P){V=c,f=null;break}var E=P-254;if(P>264){var U=Ke[z=P-257];E=nt(e,c,(1<<U)-1)+We[z],c+=U}var W=u[rt(e,c)&K],M=W>>4;if(W||ot(3),c+=15&W,q=Oe[M],M>3&&(U=Ve[M],q+=rt(e,c)&(1<<U)-1,c+=U),c>g){i&&ot(0);break}a&&o(h+131072);var N=h+E;if(q>h){var O=0-q,F=r.min(q,N);for(0>O+h&&ot(3);F>h;++h)n[h]=undefined[O+h]}for(;N>h;h+=4)n[h]=n[h-q],n[h+1]=n[h+1-q],n[h+2]=n[h+2-q],n[h+3]=n[h+3-q];h=N}}t.l=f,t.p=V,t.b=h,t.f=l,f&&(l=1,t.m=p,t.d=u,t.n=d)}while(!l);return h==n.length?n:at(n,0,h)})(this.p,this.s,this.o);this.ondata(at(n,t,this.s.b),this.d),this.o=at(n,this.s.b-32768),this.s.b=this.o.length,this.p=at(this.p,this.s.p/8|0),this.s.p&=7},e.prototype.push=function(e,t){this.e(e),this.c(t)},e}(),mt="undefined"!=typeof TextDecoder&&new TextDecoder;try{mt.decode(vt,{stream:!0})}catch(e){}function _t(e,n,r){return class{constructor(s){const i=this;var o,l;o=s,l="level",("function"==typeof t.hasOwn?t.hasOwn(o,l):o.hasOwnProperty(l))&&void 0===s.level&&delete s.level,i.codec=new e(t.assign({},n,s)),r(i.codec,(e=>{if(i.pendingData){const t=i.pendingData;i.pendingData=new a(t.length+e.length);const{pendingData:n}=i;n.set(t,0),n.set(e,t.length)}else i.pendingData=new a(e)}))}append(e){return this.codec.push(e),s(this)}flush(){return this.codec.push(new a,!0),s(this)}};function s(e){if(e.pendingData){const t=e.pendingData;return e.pendingData=null,t}return new a}}const{Deflate:kt,Inflate:St}=((e,t={},n)=>({Deflate:_t(e.Deflate,t.deflate,n),Inflate:_t(e.Inflate,t.inflate,n)}))({Deflate:yt,Inflate:bt},void 0,((e,t)=>e.ondata=t));self.initCodec=()=>{self.Deflate=kt,self.Inflate=St};\n'],{type:"text/javascript"}));e({workerScripts:{inflate:[t],deflate:[t]}});}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const table = [];
for (let i = 0; i < 256; i++) {
	let t = i;
	for (let j = 0; j < 8; j++) {
		if (t & 1) {
			t = (t >>> 1) ^ 0xEDB88320;
		} else {
			t = t >>> 1;
		}
	}
	table[i] = t;
}

class Crc32 {

	constructor(crc) {
		this.crc = crc || -1;
	}

	append(data) {
		let crc = this.crc | 0;
		for (let offset = 0, length = data.length | 0; offset < length; offset++) {
			crc = (crc >>> 8) ^ table[(crc ^ data[offset]) & 0xFF];
		}
		this.crc = crc;
	}

	get() {
		return ~this.crc;
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Crc32Stream extends TransformStream {

	constructor() {
		let stream;
		const crc32 = new Crc32();
		super({
			transform(chunk, controller) {
				crc32.append(chunk);
				controller.enqueue(chunk);
			},
			flush() {
				const value = new Uint8Array$1(4);
				const dataView = new DataView(value.buffer);
				dataView.setUint32(0, crc32.get());
				stream.value = value;
			}
		});
		stream = this;
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function encodeText(value) {
	if (typeof TextEncoder$1 == "undefined") {
		value = unescape(encodeURIComponent(value));
		const result = new Uint8Array$1(value.length);
		for (let i = 0; i < result.length; i++) {
			result[i] = value.charCodeAt(i);
		}
		return result;
	} else {
		return new TextEncoder$1().encode(value);
	}
}

// Derived from https://github.com/xqdoo00o/jszip/blob/master/lib/sjcl.js and https://github.com/bitwiseshiftleft/sjcl

// deno-lint-ignore-file no-this-alias

/*
 * SJCL is open. You can use, modify and redistribute it under a BSD
 * license or under the GNU GPL, version 2.0.
 */

/** @fileOverview Javascript cryptography implementation.
 *
 * Crush to remove comments, shorten variable names and
 * generally reduce transmission size.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/*jslint indent: 2, bitwise: false, nomen: false, plusplus: false, white: false, regexp: false */

/** @fileOverview Arrays of bits, encoded as arrays of Numbers.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/**
 * Arrays of bits, encoded as arrays of Numbers.
 * @namespace
 * @description
 * <p>
 * These objects are the currency accepted by SJCL's crypto functions.
 * </p>
 *
 * <p>
 * Most of our crypto primitives operate on arrays of 4-byte words internally,
 * but many of them can take arguments that are not a multiple of 4 bytes.
 * This library encodes arrays of bits (whose size need not be a multiple of 8
 * bits) as arrays of 32-bit words.  The bits are packed, big-endian, into an
 * array of words, 32 bits at a time.  Since the words are double-precision
 * floating point numbers, they fit some extra data.  We use this (in a private,
 * possibly-changing manner) to encode the number of bits actually  present
 * in the last word of the array.
 * </p>
 *
 * <p>
 * Because bitwise ops clear this out-of-band data, these arrays can be passed
 * to ciphers like AES which want arrays of words.
 * </p>
 */
const bitArray = {
	/**
	 * Concatenate two bit arrays.
	 * @param {bitArray} a1 The first array.
	 * @param {bitArray} a2 The second array.
	 * @return {bitArray} The concatenation of a1 and a2.
	 */
	concat(a1, a2) {
		if (a1.length === 0 || a2.length === 0) {
			return a1.concat(a2);
		}

		const last = a1[a1.length - 1], shift = bitArray.getPartial(last);
		if (shift === 32) {
			return a1.concat(a2);
		} else {
			return bitArray._shiftRight(a2, shift, last | 0, a1.slice(0, a1.length - 1));
		}
	},

	/**
	 * Find the length of an array of bits.
	 * @param {bitArray} a The array.
	 * @return {Number} The length of a, in bits.
	 */
	bitLength(a) {
		const l = a.length;
		if (l === 0) {
			return 0;
		}
		const x = a[l - 1];
		return (l - 1) * 32 + bitArray.getPartial(x);
	},

	/**
	 * Truncate an array.
	 * @param {bitArray} a The array.
	 * @param {Number} len The length to truncate to, in bits.
	 * @return {bitArray} A new array, truncated to len bits.
	 */
	clamp(a, len) {
		if (a.length * 32 < len) {
			return a;
		}
		a = a.slice(0, Math.ceil(len / 32));
		const l = a.length;
		len = len & 31;
		if (l > 0 && len) {
			a[l - 1] = bitArray.partial(len, a[l - 1] & 0x80000000 >> (len - 1), 1);
		}
		return a;
	},

	/**
	 * Make a partial word for a bit array.
	 * @param {Number} len The number of bits in the word.
	 * @param {Number} x The bits.
	 * @param {Number} [_end=0] Pass 1 if x has already been shifted to the high side.
	 * @return {Number} The partial word.
	 */
	partial(len, x, _end) {
		if (len === 32) {
			return x;
		}
		return (_end ? x | 0 : x << (32 - len)) + len * 0x10000000000;
	},

	/**
	 * Get the number of bits used by a partial word.
	 * @param {Number} x The partial word.
	 * @return {Number} The number of bits used by the partial word.
	 */
	getPartial(x) {
		return Math.round(x / 0x10000000000) || 32;
	},

	/** Shift an array right.
	 * @param {bitArray} a The array to shift.
	 * @param {Number} shift The number of bits to shift.
	 * @param {Number} [carry=0] A byte to carry in
	 * @param {bitArray} [out=[]] An array to prepend to the output.
	 * @private
	 */
	_shiftRight(a, shift, carry, out) {
		if (out === undefined) {
			out = [];
		}

		for (; shift >= 32; shift -= 32) {
			out.push(carry);
			carry = 0;
		}
		if (shift === 0) {
			return out.concat(a);
		}

		for (let i = 0; i < a.length; i++) {
			out.push(carry | a[i] >>> shift);
			carry = a[i] << (32 - shift);
		}
		const last2 = a.length ? a[a.length - 1] : 0;
		const shift2 = bitArray.getPartial(last2);
		out.push(bitArray.partial(shift + shift2 & 31, (shift + shift2 > 32) ? carry : out.pop(), 1));
		return out;
	}
};

/** @fileOverview Bit array codec implementations.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/**
 * Arrays of bytes
 * @namespace
 */
const codec = {
	bytes: {
		/** Convert from a bitArray to an array of bytes. */
		fromBits(arr) {
			const bl = bitArray.bitLength(arr);
			const byteLength = bl / 8;
			const out = new Uint8Array$1(byteLength);
			let tmp;
			for (let i = 0; i < byteLength; i++) {
				if ((i & 3) === 0) {
					tmp = arr[i / 4];
				}
				out[i] = tmp >>> 24;
				tmp <<= 8;
			}
			return out;
		},
		/** Convert from an array of bytes to a bitArray. */
		toBits(bytes) {
			const out = [];
			let i;
			let tmp = 0;
			for (i = 0; i < bytes.length; i++) {
				tmp = tmp << 8 | bytes[i];
				if ((i & 3) === 3) {
					out.push(tmp);
					tmp = 0;
				}
			}
			if (i & 3) {
				out.push(bitArray.partial(8 * (i & 3), tmp));
			}
			return out;
		}
	}
};

const hash = {};

/**
 * Context for a SHA-1 operation in progress.
 * @constructor
 */
hash.sha1 = class {
	constructor(hash) {
		const sha1 = this;
		/**
		 * The hash's block size, in bits.
		 * @constant
		 */
		sha1.blockSize = 512;
		/**
		 * The SHA-1 initialization vector.
		 * @private
		 */
		sha1._init = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
		/**
		 * The SHA-1 hash key.
		 * @private
		 */
		sha1._key = [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6];
		if (hash) {
			sha1._h = hash._h.slice(0);
			sha1._buffer = hash._buffer.slice(0);
			sha1._length = hash._length;
		} else {
			sha1.reset();
		}
	}

	/**
	 * Reset the hash state.
	 * @return this
	 */
	reset() {
		const sha1 = this;
		sha1._h = sha1._init.slice(0);
		sha1._buffer = [];
		sha1._length = 0;
		return sha1;
	}

	/**
	 * Input several words to the hash.
	 * @param {bitArray|String} data the data to hash.
	 * @return this
	 */
	update(data) {
		const sha1 = this;
		if (typeof data === "string") {
			data = codec.utf8String.toBits(data);
		}
		const b = sha1._buffer = bitArray.concat(sha1._buffer, data);
		const ol = sha1._length;
		const nl = sha1._length = ol + bitArray.bitLength(data);
		if (nl > 9007199254740991) {
			throw new Error$1("Cannot hash more than 2^53 - 1 bits");
		}
		const c = new Uint32Array$1(b);
		let j = 0;
		for (let i = sha1.blockSize + ol - ((sha1.blockSize + ol) & (sha1.blockSize - 1)); i <= nl;
			i += sha1.blockSize) {
			sha1._block(c.subarray(16 * j, 16 * (j + 1)));
			j += 1;
		}
		b.splice(0, 16 * j);
		return sha1;
	}

	/**
	 * Complete hashing and output the hash value.
	 * @return {bitArray} The hash value, an array of 5 big-endian words. TODO
	 */
	finalize() {
		const sha1 = this;
		let b = sha1._buffer;
		const h = sha1._h;

		// Round out and push the buffer
		b = bitArray.concat(b, [bitArray.partial(1, 1)]);
		// Round out the buffer to a multiple of 16 words, less the 2 length words.
		for (let i = b.length + 2; i & 15; i++) {
			b.push(0);
		}

		// append the length
		b.push(Math.floor(sha1._length / 0x100000000));
		b.push(sha1._length | 0);

		while (b.length) {
			sha1._block(b.splice(0, 16));
		}

		sha1.reset();
		return h;
	}

	/**
	 * The SHA-1 logical functions f(0), f(1), ..., f(79).
	 * @private
	 */
	_f(t, b, c, d) {
		if (t <= 19) {
			return (b & c) | (~b & d);
		} else if (t <= 39) {
			return b ^ c ^ d;
		} else if (t <= 59) {
			return (b & c) | (b & d) | (c & d);
		} else if (t <= 79) {
			return b ^ c ^ d;
		}
	}

	/**
	 * Circular left-shift operator.
	 * @private
	 */
	_S(n, x) {
		return (x << n) | (x >>> 32 - n);
	}

	/**
	 * Perform one cycle of SHA-1.
	 * @param {Uint32Array|bitArray} words one block of words.
	 * @private
	 */
	_block(words) {
		const sha1 = this;
		const h = sha1._h;
		// When words is passed to _block, it has 16 elements. SHA1 _block
		// function extends words with new elements (at the end there are 80 elements). 
		// The problem is that if we use Uint32Array instead of Array, 
		// the length of Uint32Array cannot be changed. Thus, we replace words with a 
		// normal Array here.
		const w = Array$1(80); // do not use Uint32Array here as the instantiation is slower
		for (let j = 0; j < 16; j++) {
			w[j] = words[j];
		}

		let a = h[0];
		let b = h[1];
		let c = h[2];
		let d = h[3];
		let e = h[4];

		for (let t = 0; t <= 79; t++) {
			if (t >= 16) {
				w[t] = sha1._S(1, w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]);
			}
			const tmp = (sha1._S(5, a) + sha1._f(t, b, c, d) + e + w[t] +
				sha1._key[Math.floor(t / 20)]) | 0;
			e = d;
			d = c;
			c = sha1._S(30, b);
			b = a;
			a = tmp;
		}

		h[0] = (h[0] + a) | 0;
		h[1] = (h[1] + b) | 0;
		h[2] = (h[2] + c) | 0;
		h[3] = (h[3] + d) | 0;
		h[4] = (h[4] + e) | 0;
	}
};

/** @fileOverview Low-level AES implementation.
 *
 * This file contains a low-level implementation of AES, optimized for
 * size and for efficiency on several browsers.  It is based on
 * OpenSSL's aes_core.c, a public-domain implementation by Vincent
 * Rijmen, Antoon Bosselaers and Paulo Barreto.
 *
 * An older version of this implementation is available in the public
 * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
 * Stanford University 2008-2010 and BSD-licensed for liability
 * reasons.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

const cipher = {};

/**
 * Schedule out an AES key for both encryption and decryption.  This
 * is a low-level class.  Use a cipher mode to do bulk encryption.
 *
 * @constructor
 * @param {Array} key The key as an array of 4, 6 or 8 words.
 */
cipher.aes = class {
	constructor(key) {
		/**
		 * The expanded S-box and inverse S-box tables.  These will be computed
		 * on the client so that we don't have to send them down the wire.
		 *
		 * There are two tables, _tables[0] is for encryption and
		 * _tables[1] is for decryption.
		 *
		 * The first 4 sub-tables are the expanded S-box with MixColumns.  The
		 * last (_tables[01][4]) is the S-box itself.
		 *
		 * @private
		 */
		const aes = this;
		aes._tables = [[[], [], [], [], []], [[], [], [], [], []]];

		if (!aes._tables[0][0][0]) {
			aes._precompute();
		}

		const sbox = aes._tables[0][4];
		const decTable = aes._tables[1];
		const keyLen = key.length;

		let i, encKey, decKey, rcon = 1;

		if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
			throw new Error$1("invalid aes key size");
		}

		aes._key = [encKey = key.slice(0), decKey = []];

		// schedule encryption keys
		for (i = keyLen; i < 4 * keyLen + 28; i++) {
			let tmp = encKey[i - 1];

			// apply sbox
			if (i % keyLen === 0 || (keyLen === 8 && i % keyLen === 4)) {
				tmp = sbox[tmp >>> 24] << 24 ^ sbox[tmp >> 16 & 255] << 16 ^ sbox[tmp >> 8 & 255] << 8 ^ sbox[tmp & 255];

				// shift rows and add rcon
				if (i % keyLen === 0) {
					tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
					rcon = rcon << 1 ^ (rcon >> 7) * 283;
				}
			}

			encKey[i] = encKey[i - keyLen] ^ tmp;
		}

		// schedule decryption keys
		for (let j = 0; i; j++, i--) {
			const tmp = encKey[j & 3 ? i : i - 4];
			if (i <= 4 || j < 4) {
				decKey[j] = tmp;
			} else {
				decKey[j] = decTable[0][sbox[tmp >>> 24]] ^
					decTable[1][sbox[tmp >> 16 & 255]] ^
					decTable[2][sbox[tmp >> 8 & 255]] ^
					decTable[3][sbox[tmp & 255]];
			}
		}
	}
	// public
	/* Something like this might appear here eventually
	name: "AES",
	blockSize: 4,
	keySizes: [4,6,8],
	*/

	/**
	 * Encrypt an array of 4 big-endian words.
	 * @param {Array} data The plaintext.
	 * @return {Array} The ciphertext.
	 */
	encrypt(data) {
		return this._crypt(data, 0);
	}

	/**
	 * Decrypt an array of 4 big-endian words.
	 * @param {Array} data The ciphertext.
	 * @return {Array} The plaintext.
	 */
	decrypt(data) {
		return this._crypt(data, 1);
	}

	/**
	 * Expand the S-box tables.
	 *
	 * @private
	 */
	_precompute() {
		const encTable = this._tables[0];
		const decTable = this._tables[1];
		const sbox = encTable[4];
		const sboxInv = decTable[4];
		const d = [];
		const th = [];
		let xInv, x2, x4, x8;

		// Compute double and third tables
		for (let i = 0; i < 256; i++) {
			th[(d[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
		}

		for (let x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
			// Compute sbox
			let s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
			s = s >> 8 ^ s & 255 ^ 99;
			sbox[x] = s;
			sboxInv[s] = x;

			// Compute MixColumns
			x8 = d[x4 = d[x2 = d[x]]];
			let tDec = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
			let tEnc = d[s] * 0x101 ^ s * 0x1010100;

			for (let i = 0; i < 4; i++) {
				encTable[i][x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
				decTable[i][s] = tDec = tDec << 24 ^ tDec >>> 8;
			}
		}

		// Compactify.  Considerable speedup on Firefox.
		for (let i = 0; i < 5; i++) {
			encTable[i] = encTable[i].slice(0);
			decTable[i] = decTable[i].slice(0);
		}
	}

	/**
	 * Encryption and decryption core.
	 * @param {Array} input Four words to be encrypted or decrypted.
	 * @param dir The direction, 0 for encrypt and 1 for decrypt.
	 * @return {Array} The four encrypted or decrypted words.
	 * @private
	 */
	_crypt(input, dir) {
		if (input.length !== 4) {
			throw new Error$1("invalid aes block size");
		}

		const key = this._key[dir];

		const nInnerRounds = key.length / 4 - 2;
		const out = [0, 0, 0, 0];
		const table = this._tables[dir];

		// load up the tables
		const t0 = table[0];
		const t1 = table[1];
		const t2 = table[2];
		const t3 = table[3];
		const sbox = table[4];

		// state variables a,b,c,d are loaded with pre-whitened data
		let a = input[0] ^ key[0];
		let b = input[dir ? 3 : 1] ^ key[1];
		let c = input[2] ^ key[2];
		let d = input[dir ? 1 : 3] ^ key[3];
		let kIndex = 4;
		let a2, b2, c2;

		// Inner rounds.  Cribbed from OpenSSL.
		for (let i = 0; i < nInnerRounds; i++) {
			a2 = t0[a >>> 24] ^ t1[b >> 16 & 255] ^ t2[c >> 8 & 255] ^ t3[d & 255] ^ key[kIndex];
			b2 = t0[b >>> 24] ^ t1[c >> 16 & 255] ^ t2[d >> 8 & 255] ^ t3[a & 255] ^ key[kIndex + 1];
			c2 = t0[c >>> 24] ^ t1[d >> 16 & 255] ^ t2[a >> 8 & 255] ^ t3[b & 255] ^ key[kIndex + 2];
			d = t0[d >>> 24] ^ t1[a >> 16 & 255] ^ t2[b >> 8 & 255] ^ t3[c & 255] ^ key[kIndex + 3];
			kIndex += 4;
			a = a2; b = b2; c = c2;
		}

		// Last round.
		for (let i = 0; i < 4; i++) {
			out[dir ? 3 & -i : i] =
				sbox[a >>> 24] << 24 ^
				sbox[b >> 16 & 255] << 16 ^
				sbox[c >> 8 & 255] << 8 ^
				sbox[d & 255] ^
				key[kIndex++];
			a2 = a; a = b; b = c; c = d; d = a2;
		}

		return out;
	}
};

/**
 * Random values
 * @namespace
 */
const random = {
	/** 
	 * Generate random words with pure js, cryptographically not as strong & safe as native implementation.
	 * @param {TypedArray} typedArray The array to fill.
	 * @return {TypedArray} The random values.
	 */
	getRandomValues(typedArray) {
		const words = new Uint32Array$1(typedArray.buffer);
		const r = (m_w) => {
			let m_z = 0x3ade68b1;
			const mask = 0xffffffff;
			return function () {
				m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
				m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
				const result = ((((m_z << 0x10) + m_w) & mask) / 0x100000000) + .5;
				return result * (Math.random() > .5 ? 1 : -1);
			};
		};
		for (let i = 0, rcache; i < typedArray.length; i += 4) {
			const _r = r((rcache || Math.random()) * 0x100000000);
			rcache = _r() * 0x3ade67b7;
			words[i / 4] = (_r() * 0x100000000) | 0;
		}
		return typedArray;
	}
};

/** @fileOverview CTR mode implementation.
 *
 * Special thanks to Roy Nicholson for pointing out a bug in our
 * implementation.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/** Brian Gladman's CTR Mode.
* @constructor
* @param {Object} _prf The aes instance to generate key.
* @param {bitArray} _iv The iv for ctr mode, it must be 128 bits.
*/

const mode = {};

/**
 * Brian Gladman's CTR Mode.
 * @namespace
 */
mode.ctrGladman = class {
	constructor(prf, iv) {
		this._prf = prf;
		this._initIv = iv;
		this._iv = iv;
	}

	reset() {
		this._iv = this._initIv;
	}

	/** Input some data to calculate.
	 * @param {bitArray} data the data to process, it must be intergral multiple of 128 bits unless it's the last.
	 */
	update(data) {
		return this.calculate(this._prf, data, this._iv);
	}

	incWord(word) {
		if (((word >> 24) & 0xff) === 0xff) { //overflow
			let b1 = (word >> 16) & 0xff;
			let b2 = (word >> 8) & 0xff;
			let b3 = word & 0xff;

			if (b1 === 0xff) { // overflow b1   
				b1 = 0;
				if (b2 === 0xff) {
					b2 = 0;
					if (b3 === 0xff) {
						b3 = 0;
					} else {
						++b3;
					}
				} else {
					++b2;
				}
			} else {
				++b1;
			}

			word = 0;
			word += (b1 << 16);
			word += (b2 << 8);
			word += b3;
		} else {
			word += (0x01 << 24);
		}
		return word;
	}

	incCounter(counter) {
		if ((counter[0] = this.incWord(counter[0])) === 0) {
			// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
			counter[1] = this.incWord(counter[1]);
		}
	}

	calculate(prf, data, iv) {
		let l;
		if (!(l = data.length)) {
			return [];
		}
		const bl = bitArray.bitLength(data);
		for (let i = 0; i < l; i += 4) {
			this.incCounter(iv);
			const e = prf.encrypt(iv);
			data[i] ^= e[0];
			data[i + 1] ^= e[1];
			data[i + 2] ^= e[2];
			data[i + 3] ^= e[3];
		}
		return bitArray.clamp(data, bl);
	}
};

const misc = {
	importKey(password) {
		return new misc.hmacSha1(codec.bytes.toBits(password));
	},
	pbkdf2(prf, salt, count, length) {
		count = count || 10000;
		if (length < 0 || count < 0) {
			throw new Error$1("invalid params to pbkdf2");
		}
		const byteLength = ((length >> 5) + 1) << 2;
		let u, ui, i, j, k;
		const arrayBuffer = new ArrayBuffer(byteLength);
		const out = new DataView(arrayBuffer);
		let outLength = 0;
		const b = bitArray;
		salt = codec.bytes.toBits(salt);
		for (k = 1; outLength < (byteLength || 1); k++) {
			u = ui = prf.encrypt(b.concat(salt, [k]));
			for (i = 1; i < count; i++) {
				ui = prf.encrypt(ui);
				for (j = 0; j < ui.length; j++) {
					u[j] ^= ui[j];
				}
			}
			for (i = 0; outLength < (byteLength || 1) && i < u.length; i++) {
				out.setInt32(outLength, u[i]);
				outLength += 4;
			}
		}
		return arrayBuffer.slice(0, length / 8);
	}
};

/** @fileOverview HMAC implementation.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/** HMAC with the specified hash function.
 * @constructor
 * @param {bitArray} key the key for HMAC.
 * @param {Object} [Hash=hash.sha1] The hash function to use.
 */
misc.hmacSha1 = class {

	constructor(key) {
		const hmac = this;
		const Hash = hmac._hash = hash.sha1;
		const exKey = [[], []];
		hmac._baseHash = [new Hash(), new Hash()];
		const bs = hmac._baseHash[0].blockSize / 32;

		if (key.length > bs) {
			key = new Hash().update(key).finalize();
		}

		for (let i = 0; i < bs; i++) {
			exKey[0][i] = key[i] ^ 0x36363636;
			exKey[1][i] = key[i] ^ 0x5C5C5C5C;
		}

		hmac._baseHash[0].update(exKey[0]);
		hmac._baseHash[1].update(exKey[1]);
		hmac._resultHash = new Hash(hmac._baseHash[0]);
	}
	reset() {
		const hmac = this;
		hmac._resultHash = new hmac._hash(hmac._baseHash[0]);
		hmac._updated = false;
	}

	update(data) {
		const hmac = this;
		hmac._updated = true;
		hmac._resultHash.update(data);
	}

	digest() {
		const hmac = this;
		const w = hmac._resultHash.finalize();
		const result = new (hmac._hash)(hmac._baseHash[1]).update(w).finalize();

		hmac.reset();

		return result;
	}

	encrypt(data) {
		if (!this._updated) {
			this.update(data);
			return this.digest(data);
		} else {
			throw new Error$1("encrypt on already updated hmac called!");
		}
	}
};

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const GET_RANDOM_VALUES_SUPPORTED = typeof crypto != "undefined" && typeof crypto.getRandomValues == "function";

const ERR_INVALID_PASSWORD = "Invalid password";
const ERR_INVALID_SIGNATURE = "Invalid signature";
const ERR_ABORT_CHECK_PASSWORD = "zipjs-abort-check-password";

function getRandomValues(array) {
	if (GET_RANDOM_VALUES_SUPPORTED) {
		return crypto.getRandomValues(array);
	} else {
		return random.getRandomValues(array);
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const BLOCK_LENGTH = 16;
const RAW_FORMAT = "raw";
const PBKDF2_ALGORITHM = { name: "PBKDF2" };
const HASH_ALGORITHM = { name: "HMAC" };
const HASH_FUNCTION = "SHA-1";
const BASE_KEY_ALGORITHM = Object$1.assign({ hash: HASH_ALGORITHM }, PBKDF2_ALGORITHM);
const DERIVED_BITS_ALGORITHM = Object$1.assign({ iterations: 1000, hash: { name: HASH_FUNCTION } }, PBKDF2_ALGORITHM);
const DERIVED_BITS_USAGE = ["deriveBits"];
const SALT_LENGTH = [8, 12, 16];
const KEY_LENGTH = [16, 24, 32];
const SIGNATURE_LENGTH = 10;
const COUNTER_DEFAULT_VALUE = [0, 0, 0, 0];
const UNDEFINED_TYPE = "undefined";
const FUNCTION_TYPE = "function";
// deno-lint-ignore valid-typeof
const CRYPTO_API_SUPPORTED = typeof crypto != UNDEFINED_TYPE;
const subtle = CRYPTO_API_SUPPORTED && crypto.subtle;
const SUBTLE_API_SUPPORTED = CRYPTO_API_SUPPORTED && typeof subtle != UNDEFINED_TYPE;
const codecBytes = codec.bytes;
const Aes = cipher.aes;
const CtrGladman = mode.ctrGladman;
const HmacSha1 = misc.hmacSha1;

let IMPORT_KEY_SUPPORTED = CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof subtle.importKey == FUNCTION_TYPE;
let DERIVE_BITS_SUPPORTED = CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof subtle.deriveBits == FUNCTION_TYPE;

class AESDecryptionStream extends TransformStream {

	constructor({ password, signed, encryptionStrength, checkPasswordOnly }) {
		super({
			start() {
				Object$1.assign(this, {
					ready: new Promise$1(resolve => this.resolveReady = resolve),
					password,
					signed,
					strength: encryptionStrength - 1,
					pending: new Uint8Array$1()
				});
			},
			async transform(chunk, controller) {
				const aesCrypto = this;
				const {
					password,
					strength,
					resolveReady,
					ready
				} = aesCrypto;
				if (password) {
					await createDecryptionKeys(aesCrypto, strength, password, subarray(chunk, 0, SALT_LENGTH[strength] + 2));
					chunk = subarray(chunk, SALT_LENGTH[strength] + 2);
					if (checkPasswordOnly) {
						controller.error(new Error$1(ERR_ABORT_CHECK_PASSWORD));
					} else {
						resolveReady();
					}
				} else {
					await ready;
				}
				const output = new Uint8Array$1(chunk.length - SIGNATURE_LENGTH - ((chunk.length - SIGNATURE_LENGTH) % BLOCK_LENGTH));
				controller.enqueue(append(aesCrypto, chunk, output, 0, SIGNATURE_LENGTH, true));
			},
			async flush(controller) {
				const {
					signed,
					ctr,
					hmac,
					pending,
					ready
				} = this;
				await ready;
				const chunkToDecrypt = subarray(pending, 0, pending.length - SIGNATURE_LENGTH);
				const originalSignature = subarray(pending, pending.length - SIGNATURE_LENGTH);
				let decryptedChunkArray = new Uint8Array$1();
				if (chunkToDecrypt.length) {
					const encryptedChunk = toBits(codecBytes, chunkToDecrypt);
					hmac.update(encryptedChunk);
					const decryptedChunk = ctr.update(encryptedChunk);
					decryptedChunkArray = fromBits(codecBytes, decryptedChunk);
				}
				if (signed) {
					const signature = subarray(fromBits(codecBytes, hmac.digest()), 0, SIGNATURE_LENGTH);
					for (let indexSignature = 0; indexSignature < SIGNATURE_LENGTH; indexSignature++) {
						if (signature[indexSignature] != originalSignature[indexSignature]) {
							throw new Error$1(ERR_INVALID_SIGNATURE);
						}
					}
				}
				controller.enqueue(decryptedChunkArray);
			}
		});
	}
}

class AESEncryptionStream extends TransformStream {

	constructor({ password, encryptionStrength }) {
		// deno-lint-ignore prefer-const
		let stream;
		super({
			start() {
				Object$1.assign(this, {
					ready: new Promise$1(resolve => this.resolveReady = resolve),
					password,
					strength: encryptionStrength - 1,
					pending: new Uint8Array$1()
				});
			},
			async transform(chunk, controller) {
				const aesCrypto = this;
				const {
					password,
					strength,
					resolveReady,
					ready
				} = aesCrypto;
				let preamble = new Uint8Array$1();
				if (password) {
					preamble = await createEncryptionKeys(aesCrypto, strength, password);
					resolveReady();
				} else {
					await ready;
				}
				const output = new Uint8Array$1(preamble.length + chunk.length - (chunk.length % BLOCK_LENGTH));
				output.set(preamble, 0);
				controller.enqueue(append(aesCrypto, chunk, output, preamble.length, 0));
			},
			async flush(controller) {
				const {
					ctr,
					hmac,
					pending,
					ready
				} = this;
				await ready;
				let encryptedChunkArray = new Uint8Array$1();
				if (pending.length) {
					const encryptedChunk = ctr.update(toBits(codecBytes, pending));
					hmac.update(encryptedChunk);
					encryptedChunkArray = fromBits(codecBytes, encryptedChunk);
				}
				stream.signature = fromBits(codecBytes, hmac.digest()).slice(0, SIGNATURE_LENGTH);
				controller.enqueue(concat(encryptedChunkArray, stream.signature));
			}
		});
		stream = this;
	}
}

function append(aesCrypto, input, output, paddingStart, paddingEnd, verifySignature) {
	const {
		ctr,
		hmac,
		pending
	} = aesCrypto;
	const inputLength = input.length - paddingEnd;
	if (pending.length) {
		input = concat(pending, input);
		output = expand(output, inputLength - (inputLength % BLOCK_LENGTH));
	}
	let offset;
	for (offset = 0; offset <= inputLength - BLOCK_LENGTH; offset += BLOCK_LENGTH) {
		const inputChunk = toBits(codecBytes, subarray(input, offset, offset + BLOCK_LENGTH));
		if (verifySignature) {
			hmac.update(inputChunk);
		}
		const outputChunk = ctr.update(inputChunk);
		if (!verifySignature) {
			hmac.update(outputChunk);
		}
		output.set(fromBits(codecBytes, outputChunk), offset + paddingStart);
	}
	aesCrypto.pending = subarray(input, offset);
	return output;
}

async function createDecryptionKeys(decrypt, strength, password, preamble) {
	const passwordVerificationKey = await createKeys$1(decrypt, strength, password, subarray(preamble, 0, SALT_LENGTH[strength]));
	const passwordVerification = subarray(preamble, SALT_LENGTH[strength]);
	if (passwordVerificationKey[0] != passwordVerification[0] || passwordVerificationKey[1] != passwordVerification[1]) {
		throw new Error$1(ERR_INVALID_PASSWORD);
	}
}

async function createEncryptionKeys(encrypt, strength, password) {
	const salt = getRandomValues(new Uint8Array$1(SALT_LENGTH[strength]));
	const passwordVerification = await createKeys$1(encrypt, strength, password, salt);
	return concat(salt, passwordVerification);
}

async function createKeys$1(aesCrypto, strength, password, salt) {
	aesCrypto.password = null;
	const encodedPassword = encodeText(password);
	const baseKey = await importKey(RAW_FORMAT, encodedPassword, BASE_KEY_ALGORITHM, false, DERIVED_BITS_USAGE);
	const derivedBits = await deriveBits(Object$1.assign({ salt }, DERIVED_BITS_ALGORITHM), baseKey, 8 * ((KEY_LENGTH[strength] * 2) + 2));
	const compositeKey = new Uint8Array$1(derivedBits);
	const key = toBits(codecBytes, subarray(compositeKey, 0, KEY_LENGTH[strength]));
	const authentication = toBits(codecBytes, subarray(compositeKey, KEY_LENGTH[strength], KEY_LENGTH[strength] * 2));
	const passwordVerification = subarray(compositeKey, KEY_LENGTH[strength] * 2);
	Object$1.assign(aesCrypto, {
		keys: {
			key,
			authentication,
			passwordVerification
		},
		ctr: new CtrGladman(new Aes(key), Array$1.from(COUNTER_DEFAULT_VALUE)),
		hmac: new HmacSha1(authentication)
	});
	return passwordVerification;
}

async function importKey(format, password, algorithm, extractable, keyUsages) {
	if (IMPORT_KEY_SUPPORTED) {
		try {
			return await subtle.importKey(format, password, algorithm, extractable, keyUsages);
		} catch (_error) {
			IMPORT_KEY_SUPPORTED = false;
			return misc.importKey(password);
		}
	} else {
		return misc.importKey(password);
	}
}

async function deriveBits(algorithm, baseKey, length) {
	if (DERIVE_BITS_SUPPORTED) {
		try {
			return await subtle.deriveBits(algorithm, baseKey, length);
		} catch (_error) {
			DERIVE_BITS_SUPPORTED = false;
			return misc.pbkdf2(baseKey, algorithm.salt, DERIVED_BITS_ALGORITHM.iterations, length);
		}
	} else {
		return misc.pbkdf2(baseKey, algorithm.salt, DERIVED_BITS_ALGORITHM.iterations, length);
	}
}

function concat(leftArray, rightArray) {
	let array = leftArray;
	if (leftArray.length + rightArray.length) {
		array = new Uint8Array$1(leftArray.length + rightArray.length);
		array.set(leftArray, 0);
		array.set(rightArray, leftArray.length);
	}
	return array;
}

function expand(inputArray, length) {
	if (length && length > inputArray.length) {
		const array = inputArray;
		inputArray = new Uint8Array$1(length);
		inputArray.set(array, 0);
	}
	return inputArray;
}

function subarray(array, begin, end) {
	return array.subarray(begin, end);
}

function fromBits(codecBytes, chunk) {
	return codecBytes.fromBits(chunk);
}
function toBits(codecBytes, chunk) {
	return codecBytes.toBits(chunk);
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const HEADER_LENGTH = 12;

class ZipCryptoDecryptionStream extends TransformStream {

	constructor({ password, passwordVerification, checkPasswordOnly }) {
		super({
			start() {
				Object$1.assign(this, {
					password,
					passwordVerification
				});
				createKeys(this, password);
			},
			transform(chunk, controller) {
				const zipCrypto = this;
				if (zipCrypto.password) {
					const decryptedHeader = decrypt(zipCrypto, chunk.subarray(0, HEADER_LENGTH));
					zipCrypto.password = null;
					if (decryptedHeader[HEADER_LENGTH - 1] != zipCrypto.passwordVerification) {
						throw new Error$1(ERR_INVALID_PASSWORD);
					}
					chunk = chunk.subarray(HEADER_LENGTH);
				}
				if (checkPasswordOnly) {
					controller.error(new Error$1(ERR_ABORT_CHECK_PASSWORD));
				} else {
					controller.enqueue(decrypt(zipCrypto, chunk));
				}
			}
		});
	}
}

class ZipCryptoEncryptionStream extends TransformStream {

	constructor({ password, passwordVerification }) {
		super({
			start() {
				Object$1.assign(this, {
					password,
					passwordVerification
				});
				createKeys(this, password);
			},
			transform(chunk, controller) {
				const zipCrypto = this;
				let output;
				let offset;
				if (zipCrypto.password) {
					zipCrypto.password = null;
					const header = getRandomValues(new Uint8Array$1(HEADER_LENGTH));
					header[HEADER_LENGTH - 1] = zipCrypto.passwordVerification;
					output = new Uint8Array$1(chunk.length + header.length);
					output.set(encrypt(zipCrypto, header), 0);
					offset = HEADER_LENGTH;
				} else {
					output = new Uint8Array$1(chunk.length);
					offset = 0;
				}
				output.set(encrypt(zipCrypto, chunk), offset);
				controller.enqueue(output);
			}
		});
	}
}

function decrypt(target, input) {
	const output = new Uint8Array$1(input.length);
	for (let index = 0; index < input.length; index++) {
		output[index] = getByte(target) ^ input[index];
		updateKeys(target, output[index]);
	}
	return output;
}

function encrypt(target, input) {
	const output = new Uint8Array$1(input.length);
	for (let index = 0; index < input.length; index++) {
		output[index] = getByte(target) ^ input[index];
		updateKeys(target, input[index]);
	}
	return output;
}

function createKeys(target, password) {
	const keys = [0x12345678, 0x23456789, 0x34567890];
	Object$1.assign(target, {
		keys,
		crcKey0: new Crc32(keys[0]),
		crcKey2: new Crc32(keys[2]),
	});
	for (let index = 0; index < password.length; index++) {
		updateKeys(target, password.charCodeAt(index));
	}
}

function updateKeys(target, byte) {
	let [key0, key1, key2] = target.keys;
	target.crcKey0.append([byte]);
	key0 = ~target.crcKey0.get();
	key1 = getInt32(Math.imul(getInt32(key1 + getInt8(key0)), 134775813) + 1);
	target.crcKey2.append([key1 >>> 24]);
	key2 = ~target.crcKey2.get();
	target.keys = [key0, key1, key2];
}

function getByte(target) {
	const temp = target.keys[2] | 2;
	return getInt8(Math.imul(temp, (temp ^ 1)) >>> 8);
}

function getInt8(number) {
	return number & 0xFF;
}

function getInt32(number) {
	return number & 0xFFFFFFFF;
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const COMPRESSION_FORMAT = "deflate-raw";

class DeflateStream extends TransformStream {

	constructor(options, { chunkSize, CompressionStream, CompressionStreamNative }) {
		super({});
		const { compressed, encrypted, useCompressionStream, zipCrypto, signed, level } = options;
		const stream = this;
		let crc32Stream, encryptionStream;
		let readable = filterEmptyChunks(super.readable);
		if ((!encrypted || zipCrypto) && signed) {
			crc32Stream = new Crc32Stream();
			readable = pipeThrough(readable, crc32Stream);
		}
		if (compressed) {
			readable = pipeThroughCommpressionStream(readable, useCompressionStream, { level, chunkSize }, CompressionStreamNative, CompressionStream);
		}
		if (encrypted) {
			if (zipCrypto) {
				readable = pipeThrough(readable, new ZipCryptoEncryptionStream(options));
			} else {
				encryptionStream = new AESEncryptionStream(options);
				readable = pipeThrough(readable, encryptionStream);
			}
		}
		setReadable(stream, readable, () => {
			let signature;
			if (encrypted && !zipCrypto) {
				signature = encryptionStream.signature;
			}
			if ((!encrypted || zipCrypto) && signed) {
				signature = new DataView(crc32Stream.value.buffer).getUint32(0);
			}
			stream.signature = signature;
		});
	}
}

class InflateStream extends TransformStream {

	constructor(options, { chunkSize, DecompressionStream, DecompressionStreamNative }) {
		super({});
		const { zipCrypto, encrypted, signed, signature, compressed, useCompressionStream } = options;
		let crc32Stream, decryptionStream;
		let readable = filterEmptyChunks(super.readable);
		if (encrypted) {
			if (zipCrypto) {
				readable = pipeThrough(readable, new ZipCryptoDecryptionStream(options));
			} else {
				decryptionStream = new AESDecryptionStream(options);
				readable = pipeThrough(readable, decryptionStream);
			}
		}
		if (compressed) {
			readable = pipeThroughCommpressionStream(readable, useCompressionStream, { chunkSize }, DecompressionStreamNative, DecompressionStream);
		}
		if ((!encrypted || zipCrypto) && signed) {
			crc32Stream = new Crc32Stream();
			readable = pipeThrough(readable, crc32Stream);
		}
		setReadable(this, readable, () => {
			if ((!encrypted || zipCrypto) && signed) {
				const dataViewSignature = new DataView(crc32Stream.value.buffer);
				if (signature != dataViewSignature.getUint32(0, false)) {
					throw new Error$1(ERR_INVALID_SIGNATURE);
				}
			}
		});
	}
}

function filterEmptyChunks(readable) {
	return pipeThrough(readable, new TransformStream({
		transform(chunk, controller) {
			if (chunk && chunk.length) {
				controller.enqueue(chunk);
			}
		}
	}));
}

function setReadable(stream, readable, flush) {
	readable = pipeThrough(readable, new TransformStream({ flush }));
	Object$1.defineProperty(stream, "readable", {
		get() {
			return readable;
		}
	});
}

function pipeThroughCommpressionStream(readable, useCompressionStream, options, CodecStreamNative, CodecStream) {
	try {
		const CompressionStream = useCompressionStream && CodecStreamNative ? CodecStreamNative : CodecStream;
		readable = pipeThrough(readable, new CompressionStream(COMPRESSION_FORMAT, options));
	} catch (error) {
		if (useCompressionStream) {
			readable = pipeThrough(readable, new CodecStream(COMPRESSION_FORMAT, options));
		} else {
			throw error;
		}
	}
	return readable;
}

function pipeThrough(readable, transformStream) {
	return readable.pipeThrough(transformStream);
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const MESSAGE_EVENT_TYPE = "message";
const MESSAGE_START = "start";
const MESSAGE_PULL = "pull";
const MESSAGE_DATA = "data";
const MESSAGE_ACK_DATA = "ack";
const MESSAGE_CLOSE = "close";
const CODEC_DEFLATE = "deflate";
const CODEC_INFLATE = "inflate";

class CodecStream extends TransformStream {

	constructor(options, config) {
		super({});
		const codec = this;
		const { codecType } = options;
		let Stream;
		if (codecType.startsWith(CODEC_DEFLATE)) {
			Stream = DeflateStream;
		} else if (codecType.startsWith(CODEC_INFLATE)) {
			Stream = InflateStream;
		}
		let size = 0;
		const stream = new Stream(options, config);
		const readable = super.readable;
		const transformStream = new TransformStream({
			transform(chunk, controller) {
				if (chunk && chunk.length) {
					size += chunk.length;
					controller.enqueue(chunk);
				}
			},
			flush() {
				const { signature } = stream;
				Object$1.assign(codec, {
					signature,
					size
				});
			}
		});
		Object$1.defineProperty(codec, "readable", {
			get() {
				return readable.pipeThrough(stream).pipeThrough(transformStream);
			}
		});
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// deno-lint-ignore valid-typeof
const WEB_WORKERS_SUPPORTED = typeof Worker != UNDEFINED_TYPE$1;

class CodecWorker {

	constructor(workerData, { readable, writable }, { options, config, streamOptions, useWebWorkers, transferStreams, scripts }, onTaskFinished) {
		const { signal } = streamOptions;
		Object$1.assign(workerData, {
			busy: true,
			readable: readable.pipeThrough(new ProgressWatcherStream(readable, streamOptions, config), { signal }),
			writable,
			options: Object$1.assign({}, options),
			scripts,
			transferStreams,
			terminate() {
				const { worker, busy } = workerData;
				if (worker && !busy) {
					worker.terminate();
					workerData.interface = null;
				}
			},
			onTaskFinished() {
				workerData.busy = false;
				onTaskFinished(workerData);
			}
		});
		return (useWebWorkers && WEB_WORKERS_SUPPORTED ? createWebWorkerInterface : createWorkerInterface)(workerData, config);
	}
}

class ProgressWatcherStream extends TransformStream {

	constructor(readableSource, { onstart, onprogress, size, onend }, { chunkSize }) {
		let chunkOffset = 0;
		super({
			start() {
				if (onstart) {
					callHandler(onstart, size);
				}
			},
			async transform(chunk, controller) {
				chunkOffset += chunk.length;
				if (onprogress) {
					await callHandler(onprogress, chunkOffset, size);
				}
				controller.enqueue(chunk);
			},
			flush() {
				readableSource.size = chunkOffset;
				if (onend) {
					callHandler(onend, chunkOffset);
				}
			}
		}, { highWaterMark: 1, size: () => chunkSize });
	}
}

async function callHandler(handler, ...parameters) {
	try {
		await handler(...parameters);
	} catch (_error) {
		// ignored
	}
}

function createWorkerInterface(workerData, config) {
	return {
		run: () => runWorker$1(workerData, config)
	};
}

function createWebWorkerInterface(workerData, { baseURL, chunkSize }) {
	if (!workerData.interface) {
		Object$1.assign(workerData, {
			worker: getWebWorker(workerData.scripts[0], baseURL, workerData),
			interface: {
				run: () => runWebWorker(workerData, { chunkSize })
			}
		});
	}
	return workerData.interface;
}

async function runWorker$1({ options, readable, writable, onTaskFinished }, config) {
	const codecStream = new CodecStream(options, config);
	try {
		await readable.pipeThrough(codecStream).pipeTo(writable, { preventClose: true, preventAbort: true });
		const {
			signature,
			size
		} = codecStream;
		return {
			signature,
			size
		};
	} finally {
		onTaskFinished();
	}
}

async function runWebWorker(workerData, config) {
	let resolveResult, rejectResult;
	const result = new Promise$1((resolve, reject) => {
		resolveResult = resolve;
		rejectResult = reject;
	});
	Object$1.assign(workerData, {
		reader: null,
		writer: null,
		resolveResult,
		rejectResult,
		result
	});
	const { readable, options, scripts } = workerData;
	const { writable, closed } = watchClosedStream(workerData.writable);
	const streamsTransferred = sendMessage({
		type: MESSAGE_START,
		scripts: scripts.slice(1),
		options,
		config,
		readable,
		writable
	}, workerData);
	if (!streamsTransferred) {
		Object$1.assign(workerData, {
			reader: readable.getReader(),
			writer: writable.getWriter()
		});
	}
	const resultValue = await result;
	try {
		await writable.getWriter().close();
	} catch (_error) {
		// ignored
	}
	await closed;
	return resultValue;
}

function watchClosedStream(writableSource) {
	const writer = writableSource.getWriter();
	let resolveStreamClosed;
	const closed = new Promise$1(resolve => resolveStreamClosed = resolve);
	const writable = new WritableStream({
		async write(chunk) {
			await writer.ready;
			await writer.write(chunk);
		},
		close() {
			writer.releaseLock();
			resolveStreamClosed();
		},
		abort(reason) {
			return writer.abort(reason);
		}
	});
	return { writable, closed };
}

let classicWorkersSupported = true;
let transferStreamsSupported = true;

function getWebWorker(url, baseURL, workerData) {
	const workerOptions = { type: "module" };
	let scriptUrl, worker;
	// deno-lint-ignore valid-typeof
	if (typeof url == FUNCTION_TYPE$1) {
		url = url();
	}
	try {
		scriptUrl = new URL$1(url, baseURL);
	} catch (_error) {
		scriptUrl = url;
	}
	if (classicWorkersSupported) {
		try {
			worker = new Worker(scriptUrl);
		} catch (_error) {
			classicWorkersSupported = false;
			worker = new Worker(scriptUrl, workerOptions);
		}
	} else {
		worker = new Worker(scriptUrl, workerOptions);
	}
	worker.addEventListener(MESSAGE_EVENT_TYPE, event => onMessage(event, workerData));
	return worker;
}

function sendMessage(message, { worker, writer, onTaskFinished, transferStreams }) {
	try {
		let { value, readable, writable } = message;
		const transferables = [];
		if (value) {
			message.value = value.buffer;
			transferables.push(message.value);
		}
		if (transferStreams && transferStreamsSupported) {
			if (readable) {
				transferables.push(readable);
			}
			if (writable) {
				transferables.push(writable);
			}
		} else {
			message.readable = message.writable = null;
		}
		if (transferables.length) {
			try {
				worker.postMessage(message, transferables);
				return true;
			} catch (_error) {
				transferStreamsSupported = false;
				message.readable = message.writable = null;
				worker.postMessage(message);
			}
		} else {
			worker.postMessage(message);
		}
	} catch (error) {
		if (writer) {
			writer.releaseLock();
		}
		onTaskFinished();
		throw error;
	}
}

async function onMessage({ data }, workerData) {
	const { type, value, messageId, result, error } = data;
	const { reader, writer, resolveResult, rejectResult, onTaskFinished } = workerData;
	try {
		if (error) {
			const { message, stack, code, name } = error;
			const responseError = new Error$1(message);
			Object$1.assign(responseError, { stack, code, name });
			close(responseError);
		} else {
			if (type == MESSAGE_PULL) {
				const { value, done } = await reader.read();
				sendMessage({ type: MESSAGE_DATA, value, done, messageId }, workerData);
			}
			if (type == MESSAGE_DATA) {
				await writer.ready;
				await writer.write(new Uint8Array$1(value));
				sendMessage({ type: MESSAGE_ACK_DATA, messageId }, workerData);
			}
			if (type == MESSAGE_CLOSE) {
				close(null, result);
			}
		}
	} catch (error) {
		close(error);
	}

	function close(error, result) {
		if (error) {
			rejectResult(error);
		} else {
			resolveResult(result);
		}
		if (writer) {
			writer.releaseLock();
		}
		onTaskFinished();
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

let pool = [];
const pendingRequests = [];

let indexWorker = 0;

async function runWorker(stream, workerOptions) {
	const { options, config } = workerOptions;
	const { transferStreams, useWebWorkers, useCompressionStream, codecType, compressed, signed, encrypted } = options;
	const { workerScripts, maxWorkers, terminateWorkerTimeout } = config;
	workerOptions.transferStreams = transferStreams || transferStreams === UNDEFINED_VALUE;
	const streamCopy = !compressed && !signed && !encrypted && !workerOptions.transferStreams;
	workerOptions.useWebWorkers = !streamCopy && (useWebWorkers || (useWebWorkers === UNDEFINED_VALUE && config.useWebWorkers));
	workerOptions.scripts = workerOptions.useWebWorkers && workerScripts ? workerScripts[codecType] : [];
	options.useCompressionStream = useCompressionStream || (useCompressionStream === UNDEFINED_VALUE && config.useCompressionStream);
	let worker;
	const workerData = pool.find(workerData => !workerData.busy);
	if (workerData) {
		clearTerminateTimeout(workerData);
		worker = new CodecWorker(workerData, stream, workerOptions, onTaskFinished);
	} else if (pool.length < maxWorkers) {
		const workerData = { indexWorker };
		indexWorker++;
		pool.push(workerData);
		worker = new CodecWorker(workerData, stream, workerOptions, onTaskFinished);
	} else {
		worker = await new Promise$1(resolve => pendingRequests.push({ resolve, stream, workerOptions }));
	}
	return worker.run();

	function onTaskFinished(workerData) {
		if (pendingRequests.length) {
			const [{ resolve, stream, workerOptions }] = pendingRequests.splice(0, 1);
			resolve(new CodecWorker(workerData, stream, workerOptions, onTaskFinished));
		} else if (workerData.worker) {
			clearTerminateTimeout(workerData);
			if (Number.isFinite(terminateWorkerTimeout) && terminateWorkerTimeout >= 0) {
				workerData.terminateTimeout = setTimeout(() => {
					pool = pool.filter(data => data != workerData);
					workerData.terminate();
				}, terminateWorkerTimeout);
			}
		} else {
			pool = pool.filter(data => data != workerData);
		}
	}
}

function clearTerminateTimeout(workerData) {
	const { terminateTimeout } = workerData;
	if (terminateTimeout) {
		clearTimeout(terminateTimeout);
		workerData.terminateTimeout = null;
	}
}
const ERR_ITERATOR_COMPLETED_TOO_SOON = "Writer iterator completed too soon";

const CONTENT_TYPE_TEXT_PLAIN = "text/plain";
const HTTP_HEADER_CONTENT_TYPE = "Content-Type";
const DEFAULT_CHUNK_SIZE = 64 * 1024;

const PROPERTY_NAME_WRITABLE = "writable";

class Stream {

	constructor() {
		this.size = 0;
	}

	init() {
		this.initialized = true;
	}
}

class Reader extends Stream {

	get readable() {
		const reader = this;
		const { chunkSize = DEFAULT_CHUNK_SIZE } = reader;
		const readable = new ReadableStream({
			start() {
				this.chunkOffset = 0;
			},
			async pull(controller) {
				const { offset = 0, size, diskNumberStart } = readable;
				const { chunkOffset } = this;
				controller.enqueue(await readUint8Array(reader, offset + chunkOffset, Math.min(chunkSize, size - chunkOffset), diskNumberStart));
				if (chunkOffset + chunkSize > size) {
					controller.close();
				} else {
					this.chunkOffset += chunkSize;
				}
			}
		});
		return readable;
	}
}

class Writer extends Stream {

	constructor() {
		super();
		const writer = this;
		const writable = new WritableStream({
			write(chunk) {
				return writer.writeUint8Array(chunk);
			}
		});
		Object$1.defineProperty(writer, PROPERTY_NAME_WRITABLE, {
			get() {
				return writable;
			}
		});
	}

	writeUint8Array() {
		// abstract
	}
}

class BlobReader extends Reader {

	constructor(blob) {
		super();
		Object$1.assign(this, {
			blob,
			size: blob.size
		});
	}

	async readUint8Array(offset, length) {
		const reader = this;
		const offsetEnd = offset + length;
		const blob = offset || offsetEnd < reader.size ? reader.blob.slice(offset, offsetEnd) : reader.blob;
		let arrayBuffer = await blob.arrayBuffer();
		if (arrayBuffer.byteLength > length) {
			arrayBuffer = arrayBuffer.slice(offset, offsetEnd);
		}
		return new Uint8Array$1(arrayBuffer);
	}
}

class BlobWriter extends Stream {

	constructor(contentType) {
		super();
		const writer = this;
		const transformStream = new TransformStream();
		const headers = [];
		if (contentType) {
			headers.push([HTTP_HEADER_CONTENT_TYPE, contentType]);
		}
		Object$1.defineProperty(writer, PROPERTY_NAME_WRITABLE, {
			get() {
				return transformStream.writable;
			}
		});
		writer.blob = new Response(transformStream.readable, { headers }).blob();
	}

	getData() {
		return this.blob;
	}
}

class TextReader extends BlobReader {

	constructor(text) {
		super(new Blob$2([text], { type: CONTENT_TYPE_TEXT_PLAIN }));
	}
}

class Uint8ArrayWriter extends Writer {

	init(initSize = 0) {
		Object$1.assign(this, {
			offset: 0,
			array: new Uint8Array$1(initSize)
		});
		super.init();
	}

	writeUint8Array(array) {
		const writer = this;
		if (writer.offset + array.length > writer.array.length) {
			const previousArray = writer.array;
			writer.array = new Uint8Array$1(previousArray.length + array.length);
			writer.array.set(previousArray);
		}
		writer.array.set(array, writer.offset);
		writer.offset += array.length;
	}

	getData() {
		return this.array;
	}
}

class SplitDataReader extends Reader {

	constructor(readers) {
		super();
		this.readers = readers;
	}

	async init() {
		const reader = this;
		const { readers } = reader;
		reader.lastDiskNumber = 0;
		reader.lastDiskOffset = 0;
		await Promise$1.all(readers.map(async (diskReader, indexDiskReader) => {
			await diskReader.init();
			if (indexDiskReader != readers.length - 1) {
				reader.lastDiskOffset += diskReader.size;
			}
			reader.size += diskReader.size;
		}));
		super.init();
	}

	async readUint8Array(offset, length, diskNumber = 0) {
		const reader = this;
		const { readers } = this;
		let result;
		let currentDiskNumber = diskNumber;
		if (currentDiskNumber == -1) {
			currentDiskNumber = readers.length - 1;
		}
		let currentReaderOffset = offset;
		while (currentReaderOffset >= readers[currentDiskNumber].size) {
			currentReaderOffset -= readers[currentDiskNumber].size;
			currentDiskNumber++;
		}
		const currentReader = readers[currentDiskNumber];
		const currentReaderSize = currentReader.size;
		if (currentReaderOffset + length <= currentReaderSize) {
			result = await readUint8Array(currentReader, currentReaderOffset, length);
		} else {
			const chunkLength = currentReaderSize - currentReaderOffset;
			result = new Uint8Array$1(length);
			result.set(await readUint8Array(currentReader, currentReaderOffset, chunkLength));
			result.set(await reader.readUint8Array(offset + chunkLength, length - chunkLength, diskNumber), chunkLength);
		}
		reader.lastDiskNumber = Math.max(currentDiskNumber, reader.lastDiskNumber);
		return result;
	}
}

class SplitDataWriter extends Stream {

	constructor(writerGenerator, maxSize = 4294967295) {
		super();
		const zipWriter = this;
		Object$1.assign(zipWriter, {
			diskNumber: 0,
			diskOffset: 0,
			size: 0,
			maxSize,
			availableSize: maxSize
		});
		let diskSourceWriter, diskWritable, diskWriter;
		const writable = new WritableStream({
			async write(chunk) {
				const { availableSize } = zipWriter;
				if (!diskWriter) {
					const { value, done } = await writerGenerator.next();
					if (done && !value) {
						throw new Error$1(ERR_ITERATOR_COMPLETED_TOO_SOON);
					} else {
						diskSourceWriter = value;
						diskSourceWriter.size = 0;
						if (diskSourceWriter.maxSize) {
							zipWriter.maxSize = diskSourceWriter.maxSize;
						}
						zipWriter.availableSize = zipWriter.maxSize;
						await initStream(diskSourceWriter);
						diskWritable = value.writable;
						diskWriter = diskWritable.getWriter();
					}
					await this.write(chunk);
				} else if (chunk.length >= availableSize) {
					await writeChunk(chunk.slice(0, availableSize));
					await closeDisk();
					zipWriter.diskOffset += diskSourceWriter.size;
					zipWriter.diskNumber++;
					diskWriter = null;
					await this.write(chunk.slice(availableSize));
				} else {
					await writeChunk(chunk);
				}
			},
			async close() {
				await diskWriter.ready;
				await closeDisk();
			}
		});
		Object$1.defineProperty(zipWriter, PROPERTY_NAME_WRITABLE, {
			get() {
				return writable;
			}
		});

		async function writeChunk(chunk) {
			const chunkLength = chunk.length;
			if (chunkLength) {
				await diskWriter.ready;
				await diskWriter.write(chunk);
				diskSourceWriter.size += chunkLength;
				zipWriter.size += chunkLength;
				zipWriter.availableSize -= chunkLength;
			}
		}

		async function closeDisk() {
			diskWritable.size = diskSourceWriter.size;
			await diskWriter.close();
		}
	}
}

async function initStream(stream, initSize) {
	if (stream.init && !stream.initialized) {
		await stream.init(initSize);
	}
}

function initReader(reader) {
	if (Array$1.isArray(reader)) {
		reader = new SplitDataReader(reader);
	}
	if (reader instanceof ReadableStream) {
		reader = {
			readable: reader
		};
	}
	return reader;
}

function initWriter(writer) {
	if (writer.writable === UNDEFINED_VALUE && typeof writer.next == FUNCTION_TYPE$1) {
		writer = new SplitDataWriter(writer);
	}
	if (writer instanceof WritableStream) {
		writer = {
			writable: writer
		};
	}
	const { writable } = writer;
	if (writable.size === UNDEFINED_VALUE) {
		writable.size = 0;
	}
	const splitZipFile = writer instanceof SplitDataWriter;
	if (!splitZipFile) {
		Object$1.assign(writer, {
			diskNumber: 0,
			diskOffset: 0,
			availableSize: Infinity,
			maxSize: Infinity
		});
	}
	return writer;
}

function readUint8Array(reader, offset, size, diskNumber) {
	return reader.readUint8Array(offset, size, diskNumber);
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* global TextDecoder */

const CP437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");
CP437.length == 256;

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const PROPERTY_NAME_FILENAME = "filename";
const PROPERTY_NAME_RAW_FILENAME = "rawFilename";
const PROPERTY_NAME_COMMENT = "comment";
const PROPERTY_NAME_RAW_COMMENT = "rawComment";
const PROPERTY_NAME_UNCOMPPRESSED_SIZE = "uncompressedSize";
const PROPERTY_NAME_COMPPRESSED_SIZE = "compressedSize";
const PROPERTY_NAME_OFFSET = "offset";
const PROPERTY_NAME_DISK_NUMBER_START = "diskNumberStart";
const PROPERTY_NAME_LAST_MODIFICATION_DATE = "lastModDate";
const PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE = "rawLastModDate";
const PROPERTY_NAME_LAST_ACCESS_DATE = "lastAccessDate";
const PROPERTY_NAME_CREATION_DATE = "creationDate";
const PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTE = "internalFileAttribute";
const PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTE = "externalFileAttribute";
const PROPERTY_NAME_MS_DOS_COMPATIBLE = "msDosCompatible";
const PROPERTY_NAME_ZIP64 = "zip64";

const PROPERTY_NAMES = [
	PROPERTY_NAME_FILENAME, PROPERTY_NAME_RAW_FILENAME, PROPERTY_NAME_COMPPRESSED_SIZE, PROPERTY_NAME_UNCOMPPRESSED_SIZE,
	PROPERTY_NAME_LAST_MODIFICATION_DATE, PROPERTY_NAME_RAW_LAST_MODIFICATION_DATE, PROPERTY_NAME_COMMENT, PROPERTY_NAME_RAW_COMMENT,
	PROPERTY_NAME_LAST_ACCESS_DATE, PROPERTY_NAME_CREATION_DATE, PROPERTY_NAME_OFFSET, PROPERTY_NAME_DISK_NUMBER_START,
	PROPERTY_NAME_DISK_NUMBER_START, PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTE, PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTE,
	PROPERTY_NAME_MS_DOS_COMPATIBLE, PROPERTY_NAME_ZIP64,
	"directory", "bitFlag", "encrypted", "signature", "filenameUTF8", "commentUTF8", "compressionMethod", "version", "versionMadeBy",
	"extraField", "rawExtraField", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment", "extraFieldAES", "extraFieldNTFS",
	"extraFieldExtendedTimestamp"];

class Entry {

	constructor(data) {
		PROPERTY_NAMES.forEach(name => this[name] = data[name]);
	}

}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const ERR_DUPLICATED_NAME = "File already exists";
const ERR_INVALID_COMMENT = "Zip file comment exceeds 64KB";
const ERR_INVALID_ENTRY_COMMENT = "File entry comment exceeds 64KB";
const ERR_INVALID_ENTRY_NAME = "File entry name exceeds 64KB";
const ERR_INVALID_VERSION = "Version exceeds 65535";
const ERR_INVALID_ENCRYPTION_STRENGTH = "The strength must equal 1, 2, or 3";
const ERR_INVALID_EXTRAFIELD_TYPE = "Extra field type exceeds 65535";
const ERR_INVALID_EXTRAFIELD_DATA = "Extra field data exceeds 64KB";
const ERR_UNSUPPORTED_FORMAT = "Zip64 is not supported (make sure 'keepOrder' is set to 'true')";

const EXTRAFIELD_DATA_AES = new Uint8Array$1([0x07, 0x00, 0x02, 0x00, 0x41, 0x45, 0x03, 0x00, 0x00]);

let workers = 0;
const pendingEntries = [];

class ZipWriter {

	constructor(writer, options = {}) {
		writer = initWriter(writer);
		Object$1.assign(this, {
			writer,
			addSplitZipSignature: writer instanceof SplitDataWriter,
			options,
			config: getConfiguration(),
			files: new Map$1(),
			filenames: new Set(),
			offset: writer.writable.size,
			pendingEntriesSize: 0,
			pendingAddFileCalls: new Set(),
			bufferedWrites: 0
		});
	}

	async add(name = "", reader, options = {}) {
		const zipWriter = this;
		const {
			pendingAddFileCalls,
			config
		} = zipWriter;
		if (workers < config.maxWorkers) {
			workers++;
		} else {
			await new Promise$1(resolve => pendingEntries.push(resolve));
		}
		let promiseAddFile;
		try {
			name = name.trim();
			if (zipWriter.filenames.has(name)) {
				throw new Error$1(ERR_DUPLICATED_NAME);
			}
			zipWriter.filenames.add(name);
			promiseAddFile = addFile$1(zipWriter, name, reader, options);
			pendingAddFileCalls.add(promiseAddFile);
			return await promiseAddFile;
		} catch (error) {
			zipWriter.filenames.delete(name);
			throw error;
		} finally {
			pendingAddFileCalls.delete(promiseAddFile);
			const pendingEntry = pendingEntries.shift();
			if (pendingEntry) {
				pendingEntry();
			} else {
				workers--;
			}
		}
	}

	async close(comment = new Uint8Array$1(), options = {}) {
		const zipWriter = this;
		const { pendingAddFileCalls, writer } = this;
		const { writable } = writer;
		while (pendingAddFileCalls.size) {
			await Promise$1.all(Array$1.from(pendingAddFileCalls));
		}
		await closeFile(this, comment, options);
		const preventClose = getOptionValue(zipWriter, options, "preventClose");
		if (!preventClose) {
			await writable.getWriter().close();
		}
		return writer.getData ? writer.getData() : writable;
	}
}

async function addFile$1(zipWriter, name, reader, options) {
	name = name.trim();
	if (options.directory && (!name.endsWith(DIRECTORY_SIGNATURE))) {
		name += DIRECTORY_SIGNATURE;
	} else {
		options.directory = name.endsWith(DIRECTORY_SIGNATURE);
	}
	const rawFilename = encodeText(name);
	if (getLength(rawFilename) > MAX_16_BITS) {
		throw new Error$1(ERR_INVALID_ENTRY_NAME);
	}
	const comment = options.comment || "";
	const rawComment = encodeText(comment);
	if (getLength(rawComment) > MAX_16_BITS) {
		throw new Error$1(ERR_INVALID_ENTRY_COMMENT);
	}
	const version = getOptionValue(zipWriter, options, "version", VERSION_DEFLATE);
	if (version > MAX_16_BITS) {
		throw new Error$1(ERR_INVALID_VERSION);
	}
	const versionMadeBy = getOptionValue(zipWriter, options, "versionMadeBy", 20);
	if (versionMadeBy > MAX_16_BITS) {
		throw new Error$1(ERR_INVALID_VERSION);
	}
	const lastModDate = getOptionValue(zipWriter, options, PROPERTY_NAME_LAST_MODIFICATION_DATE, new Date$1());
	const lastAccessDate = getOptionValue(zipWriter, options, PROPERTY_NAME_LAST_ACCESS_DATE);
	const creationDate = getOptionValue(zipWriter, options, PROPERTY_NAME_CREATION_DATE);
	const msDosCompatible = getOptionValue(zipWriter, options, PROPERTY_NAME_MS_DOS_COMPATIBLE, true);
	const internalFileAttribute = getOptionValue(zipWriter, options, PROPERTY_NAME_INTERNAL_FILE_ATTRIBUTE, 0);
	const externalFileAttribute = getOptionValue(zipWriter, options, PROPERTY_NAME_EXTERNAL_FILE_ATTRIBUTE, 0);
	const password = getOptionValue(zipWriter, options, "password");
	const encryptionStrength = getOptionValue(zipWriter, options, "encryptionStrength", 3);
	const zipCrypto = getOptionValue(zipWriter, options, "zipCrypto");
	const extendedTimestamp = getOptionValue(zipWriter, options, "extendedTimestamp", true);
	const keepOrder = getOptionValue(zipWriter, options, "keepOrder", true);
	const level = getOptionValue(zipWriter, options, "level");
	const useWebWorkers = getOptionValue(zipWriter, options, "useWebWorkers");
	const bufferedWrite = getOptionValue(zipWriter, options, "bufferedWrite");
	const dataDescriptorSignature = getOptionValue(zipWriter, options, "dataDescriptorSignature", false);
	const signal = getOptionValue(zipWriter, options, "signal");
	const useCompressionStream = getOptionValue(zipWriter, options, "useCompressionStream");
	let dataDescriptor = getOptionValue(zipWriter, options, "dataDescriptor", true);
	let zip64 = getOptionValue(zipWriter, options, PROPERTY_NAME_ZIP64);
	if (password !== UNDEFINED_VALUE && encryptionStrength !== UNDEFINED_VALUE && (encryptionStrength < 1 || encryptionStrength > 3)) {
		throw new Error$1(ERR_INVALID_ENCRYPTION_STRENGTH);
	}
	let rawExtraField = new Uint8Array$1();
	const { extraField } = options;
	if (extraField) {
		let extraFieldSize = 0;
		let offset = 0;
		extraField.forEach(data => extraFieldSize += 4 + getLength(data));
		rawExtraField = new Uint8Array$1(extraFieldSize);
		extraField.forEach((data, type) => {
			if (type > MAX_16_BITS) {
				throw new Error$1(ERR_INVALID_EXTRAFIELD_TYPE);
			}
			if (getLength(data) > MAX_16_BITS) {
				throw new Error$1(ERR_INVALID_EXTRAFIELD_DATA);
			}
			arraySet(rawExtraField, new Uint16Array([type]), offset);
			arraySet(rawExtraField, new Uint16Array([getLength(data)]), offset + 2);
			arraySet(rawExtraField, data, offset + 4);
			offset += 4 + getLength(data);
		});
	}
	let maximumCompressedSize = 0;
	let maximumEntrySize = 0;
	let uncompressedSize = 0;
	const zip64Enabled = zip64 === true;
	if (reader) {
		reader = initReader(reader);
		await initStream(reader);
		if (reader.size === UNDEFINED_VALUE) {
			dataDescriptor = true;
			if (zip64 || zip64 === UNDEFINED_VALUE) {
				zip64 = true;
				uncompressedSize = maximumCompressedSize = MAX_32_BITS;
			}
		} else {
			uncompressedSize = reader.size;
			maximumCompressedSize = getMaximumCompressedSize(uncompressedSize);
		}
	}
	const { diskOffset, diskNumber, maxSize } = zipWriter.writer;
	const zip64UncompressedSize = zip64Enabled || uncompressedSize >= MAX_32_BITS;
	const zip64CompressedSize = zip64Enabled || maximumCompressedSize >= MAX_32_BITS;
	const zip64Offset = zip64Enabled || zipWriter.offset + zipWriter.pendingEntriesSize - diskOffset >= MAX_32_BITS;
	const supportZip64SplitFile = getOptionValue(zipWriter, options, "supportZip64SplitFile", true);
	const zip64DiskNumberStart = (supportZip64SplitFile && zip64Enabled) || diskNumber + Math.ceil(zipWriter.pendingEntriesSize / maxSize) >= MAX_16_BITS;
	if (zip64Offset || zip64UncompressedSize || zip64CompressedSize || zip64DiskNumberStart) {
		if (zip64 === false || !keepOrder) {
			throw new Error$1(ERR_UNSUPPORTED_FORMAT);
		} else {
			zip64 = true;
		}
	}
	zip64 = zip64 || false;
	options = Object$1.assign({}, options, {
		rawFilename,
		rawComment,
		version,
		versionMadeBy,
		lastModDate,
		lastAccessDate,
		creationDate,
		rawExtraField,
		zip64,
		zip64UncompressedSize,
		zip64CompressedSize,
		zip64Offset,
		zip64DiskNumberStart,
		password,
		level,
		useWebWorkers,
		encryptionStrength,
		extendedTimestamp,
		zipCrypto,
		bufferedWrite,
		keepOrder,
		dataDescriptor,
		dataDescriptorSignature,
		signal,
		msDosCompatible,
		internalFileAttribute,
		externalFileAttribute,
		useCompressionStream
	});
	const headerInfo = getHeaderInfo(options);
	const dataDescriptorInfo = getDataDescriptorInfo(options);
	const metadataSize = getLength(headerInfo.localHeaderArray, dataDescriptorInfo.dataDescriptorArray);
	maximumEntrySize = metadataSize + maximumCompressedSize;
	if (zipWriter.options.usdz) {
		maximumEntrySize += maximumEntrySize + 64;
	}
	zipWriter.pendingEntriesSize += maximumEntrySize;
	let fileEntry;
	try {
		fileEntry = await getFileEntry(zipWriter, name, reader, { headerInfo, dataDescriptorInfo, metadataSize }, options);
	} finally {
		zipWriter.pendingEntriesSize -= maximumEntrySize;
	}
	Object$1.assign(fileEntry, { name, comment, extraField });
	return new Entry(fileEntry);
}

async function getFileEntry(zipWriter, name, reader, entryInfo, options) {
	const {
		files,
		writer
	} = zipWriter;
	const {
		keepOrder,
		dataDescriptor,
		signal
	} = options;
	const {
		headerInfo
	} = entryInfo;
	const { usdz } = zipWriter.options;
	const previousFileEntry = Array$1.from(files.values()).pop();
	let fileEntry = {};
	let bufferedWrite;
	let releaseLockWriter;
	let releaseLockCurrentFileEntry;
	let writingBufferedEntryData;
	let writingEntryData;
	let fileWriter;
	files.set(name, fileEntry);
	try {
		let lockPreviousFileEntry;
		if (keepOrder) {
			lockPreviousFileEntry = previousFileEntry && previousFileEntry.lock;
			requestLockCurrentFileEntry();
		}
		if ((options.bufferedWrite || zipWriter.writerLocked || (zipWriter.bufferedWrites && keepOrder) || !dataDescriptor) && !usdz) {
			fileWriter = new BlobWriter();
			fileWriter.writable.size = 0;
			bufferedWrite = true;
			zipWriter.bufferedWrites++;
			await initStream(writer);
		} else {
			fileWriter = writer;
			await requestLockWriter();
		}
		await initStream(fileWriter);
		const { writable } = writer;
		let { diskOffset } = writer;
		if (zipWriter.addSplitZipSignature) {
			delete zipWriter.addSplitZipSignature;
			const signatureArray = new Uint8Array$1(4);
			const signatureArrayView = getDataView(signatureArray);
			setUint32(signatureArrayView, 0, SPLIT_ZIP_FILE_SIGNATURE);
			await writeData$1(writable, signatureArray);
			zipWriter.offset += 4;
		}
		if (!bufferedWrite) {
			await lockPreviousFileEntry;
			await skipDiskIfNeeded(writable);
		}
		const { diskNumber } = writer;
		writingEntryData = true;
		fileEntry.diskNumberStart = diskNumber;
		if (usdz) {
			appendExtraFieldUSDZ(entryInfo, zipWriter.offset - diskOffset);
		}
		fileEntry = await createFileEntry(reader, fileWriter, fileEntry, entryInfo, zipWriter.config, options);
		writingEntryData = false;
		files.set(name, fileEntry);
		fileEntry.filename = name;
		if (bufferedWrite) {
			await fileWriter.writable.getWriter().close();
			let blob = await fileWriter.getData();
			await lockPreviousFileEntry;
			await requestLockWriter();
			writingBufferedEntryData = true;
			if (!dataDescriptor) {
				blob = await writeExtraHeaderInfo(fileEntry, blob, writable, options);
			}
			await skipDiskIfNeeded(writable);
			fileEntry.diskNumberStart = writer.diskNumber;
			diskOffset = writer.diskOffset;
			await blob.stream().pipeTo(writable, { preventClose: true, preventAbort: true, signal });
			writable.size += blob.size;
			writingBufferedEntryData = false;
		}
		fileEntry.offset = zipWriter.offset - diskOffset;
		if (fileEntry.zip64) {
			setZip64ExtraInfo(fileEntry, options);
		} else if (fileEntry.offset >= MAX_32_BITS) {
			throw new Error$1(ERR_UNSUPPORTED_FORMAT);
		}
		zipWriter.offset += fileEntry.length;
		return fileEntry;
	} catch (error) {
		if ((bufferedWrite && writingBufferedEntryData) || (!bufferedWrite && writingEntryData)) {
			zipWriter.hasCorruptedEntries = true;
			if (error) {
				try {
					error.corruptedEntry = true;
				} catch (_error) {
					// ignored
				}
			}
			if (bufferedWrite) {
				zipWriter.offset += fileWriter.writable.size;
			} else {
				zipWriter.offset = fileWriter.writable.size;
			}
		}
		files.delete(name);
		throw error;
	} finally {
		if (bufferedWrite) {
			zipWriter.bufferedWrites--;
		}
		if (releaseLockCurrentFileEntry) {
			releaseLockCurrentFileEntry();
		}
		if (releaseLockWriter) {
			releaseLockWriter();
		}
	}

	function requestLockCurrentFileEntry() {
		fileEntry.lock = new Promise$1(resolve => releaseLockCurrentFileEntry = resolve);
	}

	async function requestLockWriter() {
		zipWriter.writerLocked = true;
		const { lockWriter } = zipWriter;
		zipWriter.lockWriter = new Promise$1(resolve => releaseLockWriter = () => {
			zipWriter.writerLocked = false;
			resolve();
		});
		await lockWriter;
	}

	async function skipDiskIfNeeded(writable) {
		if (headerInfo.localHeaderArray.length > writer.availableSize) {
			writer.availableSize = 0;
			await writeData$1(writable, new Uint8Array$1());
		}
	}
}

async function createFileEntry(reader, writer, { diskNumberStart, lock }, entryInfo, config, options) {
	const {
		headerInfo,
		dataDescriptorInfo,
		metadataSize
	} = entryInfo;
	const {
		localHeaderArray,
		headerArray,
		lastModDate,
		rawLastModDate,
		encrypted,
		compressed,
		version,
		compressionMethod,
		rawExtraFieldExtendedTimestamp,
		extraFieldExtendedTimestampFlag,
		rawExtraFieldNTFS,
		rawExtraFieldAES
	} = headerInfo;
	const { dataDescriptorArray } = dataDescriptorInfo;
	const {
		rawFilename,
		lastAccessDate,
		creationDate,
		password,
		level,
		zip64,
		zip64UncompressedSize,
		zip64CompressedSize,
		zip64Offset,
		zip64DiskNumberStart,
		zipCrypto,
		dataDescriptor,
		directory,
		versionMadeBy,
		rawComment,
		rawExtraField,
		useWebWorkers,
		onstart,
		onprogress,
		onend,
		signal,
		encryptionStrength,
		extendedTimestamp,
		msDosCompatible,
		internalFileAttribute,
		externalFileAttribute,
		useCompressionStream
	} = options;
	const fileEntry = {
		lock,
		versionMadeBy,
		zip64,
		directory: Boolean(directory),
		filenameUTF8: true,
		rawFilename,
		commentUTF8: true,
		rawComment,
		rawExtraFieldExtendedTimestamp,
		rawExtraFieldNTFS,
		rawExtraFieldAES,
		rawExtraField,
		extendedTimestamp,
		msDosCompatible,
		internalFileAttribute,
		externalFileAttribute,
		diskNumberStart
	};
	let compressedSize = 0;
	let uncompressedSize = 0;
	let signature;
	const { writable } = writer;
	if (reader) {
		reader.chunkSize = getChunkSize(config);
		await writeData$1(writable, localHeaderArray);
		const readable = reader.readable;
		const size = readable.size = reader.size;
		const workerOptions = {
			options: {
				codecType: CODEC_DEFLATE,
				level,
				password,
				encryptionStrength,
				zipCrypto: encrypted && zipCrypto,
				passwordVerification: encrypted && zipCrypto && (rawLastModDate >> 8) & 0xFF,
				signed: true,
				compressed,
				encrypted,
				useWebWorkers,
				useCompressionStream,
				transferStreams: false
			},
			config,
			streamOptions: { signal, size, onstart, onprogress, onend }
		};
		const result = await runWorker({ readable, writable }, workerOptions);
		writable.size += result.size;
		signature = result.signature;
		uncompressedSize = reader.size = readable.size;
		compressedSize = result.size;
	} else {
		await writeData$1(writable, localHeaderArray);
	}
	let rawExtraFieldZip64;
	if (zip64) {
		let rawExtraFieldZip64Length = 4;
		if (zip64UncompressedSize) {
			rawExtraFieldZip64Length += 8;
		}
		if (zip64CompressedSize) {
			rawExtraFieldZip64Length += 8;
		}
		if (zip64Offset) {
			rawExtraFieldZip64Length += 8;
		}
		if (zip64DiskNumberStart) {
			rawExtraFieldZip64Length += 4;
		}
		rawExtraFieldZip64 = new Uint8Array$1(rawExtraFieldZip64Length);
	} else {
		rawExtraFieldZip64 = new Uint8Array$1();
	}
	setEntryInfo({
		signature,
		rawExtraFieldZip64,
		compressedSize,
		uncompressedSize,
		headerInfo,
		dataDescriptorInfo
	}, options);
	if (dataDescriptor) {
		await writeData$1(writable, dataDescriptorArray);
	}
	Object$1.assign(fileEntry, {
		uncompressedSize,
		compressedSize,
		lastModDate,
		rawLastModDate,
		creationDate,
		lastAccessDate,
		encrypted,
		length: metadataSize + compressedSize,
		compressionMethod,
		version,
		headerArray,
		signature,
		rawExtraFieldZip64,
		extraFieldExtendedTimestampFlag,
		zip64UncompressedSize,
		zip64CompressedSize,
		zip64Offset,
		zip64DiskNumberStart
	});
	return fileEntry;
}

function getHeaderInfo(options) {
	const {
		rawFilename,
		lastModDate,
		lastAccessDate,
		creationDate,
		password,
		level,
		zip64,
		zipCrypto,
		dataDescriptor,
		directory,
		rawExtraField,
		encryptionStrength,
		extendedTimestamp
	} = options;
	const compressed = level !== 0 && !directory;
	const encrypted = Boolean(password && getLength(password));
	let version = options.version;
	let rawExtraFieldAES;
	if (encrypted && !zipCrypto) {
		rawExtraFieldAES = new Uint8Array$1(getLength(EXTRAFIELD_DATA_AES) + 2);
		const extraFieldAESView = getDataView(rawExtraFieldAES);
		setUint16(extraFieldAESView, 0, EXTRAFIELD_TYPE_AES);
		arraySet(rawExtraFieldAES, EXTRAFIELD_DATA_AES, 2);
		setUint8(extraFieldAESView, 8, encryptionStrength);
	} else {
		rawExtraFieldAES = new Uint8Array$1();
	}
	let rawExtraFieldNTFS;
	let rawExtraFieldExtendedTimestamp;
	let extraFieldExtendedTimestampFlag;
	if (extendedTimestamp) {
		rawExtraFieldExtendedTimestamp = new Uint8Array$1(9 + (lastAccessDate ? 4 : 0) + (creationDate ? 4 : 0));
		const extraFieldExtendedTimestampView = getDataView(rawExtraFieldExtendedTimestamp);
		setUint16(extraFieldExtendedTimestampView, 0, EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
		setUint16(extraFieldExtendedTimestampView, 2, getLength(rawExtraFieldExtendedTimestamp) - 4);
		extraFieldExtendedTimestampFlag = 0x1 + (lastAccessDate ? 0x2 : 0) + (creationDate ? 0x4 : 0);
		setUint8(extraFieldExtendedTimestampView, 4, extraFieldExtendedTimestampFlag);
		let offset = 5;
		setUint32(extraFieldExtendedTimestampView, offset, Math.floor(lastModDate.getTime() / 1000));
		offset += 4;
		if (lastAccessDate) {
			setUint32(extraFieldExtendedTimestampView, offset, Math.floor(lastAccessDate.getTime() / 1000));
			offset += 4;
		}
		if (creationDate) {
			setUint32(extraFieldExtendedTimestampView, offset, Math.floor(creationDate.getTime() / 1000));
		}
		try {
			rawExtraFieldNTFS = new Uint8Array$1(36);
			const extraFieldNTFSView = getDataView(rawExtraFieldNTFS);
			const lastModTimeNTFS = getTimeNTFS(lastModDate);
			setUint16(extraFieldNTFSView, 0, EXTRAFIELD_TYPE_NTFS);
			setUint16(extraFieldNTFSView, 2, 32);
			setUint16(extraFieldNTFSView, 8, EXTRAFIELD_TYPE_NTFS_TAG1);
			setUint16(extraFieldNTFSView, 10, 24);
			setBigUint64(extraFieldNTFSView, 12, lastModTimeNTFS);
			setBigUint64(extraFieldNTFSView, 20, getTimeNTFS(lastAccessDate) || lastModTimeNTFS);
			setBigUint64(extraFieldNTFSView, 28, getTimeNTFS(creationDate) || lastModTimeNTFS);
		} catch (_error) {
			rawExtraFieldNTFS = new Uint8Array$1();
		}
	} else {
		rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array$1();
	}
	let bitFlag = BITFLAG_LANG_ENCODING_FLAG;
	if (dataDescriptor) {
		bitFlag = bitFlag | BITFLAG_DATA_DESCRIPTOR;
	}
	let compressionMethod = COMPRESSION_METHOD_STORE;
	if (compressed) {
		compressionMethod = COMPRESSION_METHOD_DEFLATE;
	}
	if (zip64) {
		version = version > VERSION_ZIP64 ? version : VERSION_ZIP64;
	}
	if (encrypted) {
		bitFlag = bitFlag | BITFLAG_ENCRYPTED;
		if (!zipCrypto) {
			version = version > VERSION_AES ? version : VERSION_AES;
			compressionMethod = COMPRESSION_METHOD_AES;
			if (compressed) {
				rawExtraFieldAES[9] = COMPRESSION_METHOD_DEFLATE;
			}
		}
	}
	const headerArray = new Uint8Array$1(26);
	const headerView = getDataView(headerArray);
	setUint16(headerView, 0, version);
	setUint16(headerView, 2, bitFlag);
	setUint16(headerView, 4, compressionMethod);
	const dateArray = new Uint32Array$1(1);
	const dateView = getDataView(dateArray);
	let lastModDateMsDos;
	if (lastModDate < MIN_DATE) {
		lastModDateMsDos = MIN_DATE;
	} else if (lastModDate > MAX_DATE) {
		lastModDateMsDos = MAX_DATE;
	} else {
		lastModDateMsDos = lastModDate;
	}
	setUint16(dateView, 0, (((lastModDateMsDos.getHours() << 6) | lastModDateMsDos.getMinutes()) << 5) | lastModDateMsDos.getSeconds() / 2);
	setUint16(dateView, 2, ((((lastModDateMsDos.getFullYear() - 1980) << 4) | (lastModDateMsDos.getMonth() + 1)) << 5) | lastModDateMsDos.getDate());
	const rawLastModDate = dateArray[0];
	setUint32(headerView, 6, rawLastModDate);
	setUint16(headerView, 22, getLength(rawFilename));
	const extraFieldLength = getLength(rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS, rawExtraField);
	setUint16(headerView, 24, extraFieldLength);
	const localHeaderArray = new Uint8Array$1(30 + getLength(rawFilename) + extraFieldLength);
	const localHeaderView = getDataView(localHeaderArray);
	setUint32(localHeaderView, 0, LOCAL_FILE_HEADER_SIGNATURE);
	arraySet(localHeaderArray, headerArray, 4);
	arraySet(localHeaderArray, rawFilename, 30);
	arraySet(localHeaderArray, rawExtraFieldAES, 30 + getLength(rawFilename));
	arraySet(localHeaderArray, rawExtraFieldExtendedTimestamp, 30 + getLength(rawFilename, rawExtraFieldAES));
	arraySet(localHeaderArray, rawExtraFieldNTFS, 30 + getLength(rawFilename, rawExtraFieldAES, rawExtraFieldExtendedTimestamp));
	arraySet(localHeaderArray, rawExtraField, 30 + getLength(rawFilename, rawExtraFieldAES, rawExtraFieldExtendedTimestamp, rawExtraFieldNTFS));
	return {
		localHeaderArray,
		headerArray,
		headerView,
		lastModDate,
		rawLastModDate,
		encrypted,
		compressed,
		version,
		compressionMethod,
		extraFieldExtendedTimestampFlag,
		rawExtraFieldExtendedTimestamp,
		rawExtraFieldNTFS,
		rawExtraFieldAES,
		extraFieldLength
	};
}

function appendExtraFieldUSDZ(entryInfo, zipWriterOffset) {
	const { headerInfo } = entryInfo;
	let { localHeaderArray, extraFieldLength } = headerInfo;
	let localHeaderArrayView = getDataView(localHeaderArray);
	let extraBytesLength = 64 - ((zipWriterOffset + localHeaderArray.length) % 64);
	if (extraBytesLength < 4) {
		extraBytesLength += 64;
	}
	const rawExtraFieldUSDZ = new Uint8Array$1(extraBytesLength);
	const extraFieldUSDZView = getDataView(rawExtraFieldUSDZ);
	setUint16(extraFieldUSDZView, 0, EXTRAFIELD_TYPE_USDZ);
	setUint16(extraFieldUSDZView, 2, extraBytesLength - 2);
	const previousLocalHeaderArray = localHeaderArray;
	headerInfo.localHeaderArray = localHeaderArray = new Uint8Array$1(previousLocalHeaderArray.length + extraBytesLength);
	arraySet(localHeaderArray, previousLocalHeaderArray);
	arraySet(localHeaderArray, rawExtraFieldUSDZ, previousLocalHeaderArray.length);
	localHeaderArrayView = getDataView(localHeaderArray);
	setUint16(localHeaderArrayView, 28, extraFieldLength + extraBytesLength);
	entryInfo.metadataSize += extraBytesLength;
}

function getDataDescriptorInfo(options) {
	const {
		zip64,
		dataDescriptor,
		dataDescriptorSignature
	} = options;
	let dataDescriptorArray = new Uint8Array$1();
	let dataDescriptorView, dataDescriptorOffset = 0;
	if (dataDescriptor) {
		dataDescriptorArray = new Uint8Array$1(zip64 ? (dataDescriptorSignature ? 24 : 20) : (dataDescriptorSignature ? 16 : 12));
		dataDescriptorView = getDataView(dataDescriptorArray);
		if (dataDescriptorSignature) {
			dataDescriptorOffset = 4;
			setUint32(dataDescriptorView, 0, DATA_DESCRIPTOR_RECORD_SIGNATURE);
		}
	}
	return {
		dataDescriptorArray,
		dataDescriptorView,
		dataDescriptorOffset
	};
}

function setEntryInfo(entryInfo, options) {
	const {
		signature,
		rawExtraFieldZip64,
		compressedSize,
		uncompressedSize,
		headerInfo,
		dataDescriptorInfo
	} = entryInfo;
	const {
		headerView,
		encrypted
	} = headerInfo;
	const {
		dataDescriptorView,
		dataDescriptorOffset
	} = dataDescriptorInfo;
	const {
		zip64,
		zip64UncompressedSize,
		zip64CompressedSize,
		zipCrypto,
		dataDescriptor
	} = options;
	if ((!encrypted || zipCrypto) && signature !== UNDEFINED_VALUE) {
		setUint32(headerView, 10, signature);
		if (dataDescriptor) {
			setUint32(dataDescriptorView, dataDescriptorOffset, signature);
		}
	}
	if (zip64) {
		const rawExtraFieldZip64View = getDataView(rawExtraFieldZip64);
		setUint16(rawExtraFieldZip64View, 0, EXTRAFIELD_TYPE_ZIP64);
		setUint16(rawExtraFieldZip64View, 2, rawExtraFieldZip64.length - 4);
		let rawExtraFieldZip64Offset = 4;
		if (zip64UncompressedSize) {
			setUint32(headerView, 18, MAX_32_BITS);
			setBigUint64(rawExtraFieldZip64View, rawExtraFieldZip64Offset, BigInt(uncompressedSize));
			rawExtraFieldZip64Offset += 8;
		}
		if (zip64CompressedSize) {
			setUint32(headerView, 14, MAX_32_BITS);
			setBigUint64(rawExtraFieldZip64View, rawExtraFieldZip64Offset, BigInt(compressedSize));
		}
		if (dataDescriptor) {
			setBigUint64(dataDescriptorView, dataDescriptorOffset + 4, BigInt(compressedSize));
			setBigUint64(dataDescriptorView, dataDescriptorOffset + 12, BigInt(uncompressedSize));
		}
	} else {
		setUint32(headerView, 14, compressedSize);
		setUint32(headerView, 18, uncompressedSize);
		if (dataDescriptor) {
			setUint32(dataDescriptorView, dataDescriptorOffset + 4, compressedSize);
			setUint32(dataDescriptorView, dataDescriptorOffset + 8, uncompressedSize);
		}
	}
}

async function writeExtraHeaderInfo(fileEntry, entryData, writable, { zipCrypto }) {
	let arrayBuffer;
	arrayBuffer = await entryData.slice(0, 26).arrayBuffer();
	if (arrayBuffer.byteLength != 26) {
		arrayBuffer = arrayBuffer.slice(0, 26);
	}
	const arrayBufferView = new DataView(arrayBuffer);
	if (!fileEntry.encrypted || zipCrypto) {
		setUint32(arrayBufferView, 14, fileEntry.signature);
	}
	if (fileEntry.zip64) {
		setUint32(arrayBufferView, 18, MAX_32_BITS);
		setUint32(arrayBufferView, 22, MAX_32_BITS);
	} else {
		setUint32(arrayBufferView, 18, fileEntry.compressedSize);
		setUint32(arrayBufferView, 22, fileEntry.uncompressedSize);
	}
	await writeData$1(writable, new Uint8Array$1(arrayBuffer));
	return entryData.slice(arrayBuffer.byteLength);
}

function setZip64ExtraInfo(fileEntry, options) {
	const { rawExtraFieldZip64, offset, diskNumberStart } = fileEntry;
	const { zip64UncompressedSize, zip64CompressedSize, zip64Offset, zip64DiskNumberStart } = options;
	const rawExtraFieldZip64View = getDataView(rawExtraFieldZip64);
	let rawExtraFieldZip64Offset = 4;
	if (zip64UncompressedSize) {
		rawExtraFieldZip64Offset += 8;
	}
	if (zip64CompressedSize) {
		rawExtraFieldZip64Offset += 8;
	}
	if (zip64Offset) {
		setBigUint64(rawExtraFieldZip64View, rawExtraFieldZip64Offset, BigInt(offset));
		rawExtraFieldZip64Offset += 8;
	}
	if (zip64DiskNumberStart) {
		setUint32(rawExtraFieldZip64View, rawExtraFieldZip64Offset, diskNumberStart);
	}
}

async function closeFile(zipWriter, comment, options) {
	const { files, writer } = zipWriter;
	const { diskOffset, writable } = writer;
	let { diskNumber } = writer;
	let offset = 0;
	let directoryDataLength = 0;
	let directoryOffset = zipWriter.offset - diskOffset;
	let filesLength = files.size;
	for (const [, fileEntry] of files) {
		const {
			rawFilename,
			rawExtraFieldZip64,
			rawExtraFieldAES,
			rawComment,
			rawExtraFieldNTFS,
			rawExtraField,
			extendedTimestamp,
			extraFieldExtendedTimestampFlag,
			lastModDate
		} = fileEntry;
		let rawExtraFieldTimestamp;
		if (extendedTimestamp) {
			rawExtraFieldTimestamp = new Uint8Array$1(9);
			const extraFieldExtendedTimestampView = getDataView(rawExtraFieldTimestamp);
			setUint16(extraFieldExtendedTimestampView, 0, EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
			setUint16(extraFieldExtendedTimestampView, 2, 5);
			setUint8(extraFieldExtendedTimestampView, 4, extraFieldExtendedTimestampFlag);
			setUint32(extraFieldExtendedTimestampView, 5, Math.floor(lastModDate.getTime() / 1000));
		} else {
			rawExtraFieldTimestamp = new Uint8Array$1();
		}
		fileEntry.rawExtraFieldCDExtendedTimestamp = rawExtraFieldTimestamp;
		directoryDataLength += 46 +
			getLength(
				rawFilename,
				rawComment,
				rawExtraFieldZip64,
				rawExtraFieldAES,
				rawExtraFieldNTFS,
				rawExtraFieldTimestamp,
				rawExtraField);
	}
	const directoryArray = new Uint8Array$1(directoryDataLength);
	const directoryView = getDataView(directoryArray);
	await initStream(writer);
	let directoryDiskOffset = 0;
	for (const [indexFileEntry, fileEntry] of Array$1.from(files.values()).entries()) {
		const {
			offset: fileEntryOffset,
			rawFilename,
			rawExtraFieldZip64,
			rawExtraFieldAES,
			rawExtraFieldCDExtendedTimestamp,
			rawExtraFieldNTFS,
			rawExtraField,
			rawComment,
			versionMadeBy,
			headerArray,
			directory,
			zip64,
			zip64UncompressedSize,
			zip64CompressedSize,
			zip64DiskNumberStart,
			zip64Offset,
			msDosCompatible,
			internalFileAttribute,
			externalFileAttribute,
			diskNumberStart,
			uncompressedSize,
			compressedSize
		} = fileEntry;
		const extraFieldLength = getLength(rawExtraFieldZip64, rawExtraFieldAES, rawExtraFieldCDExtendedTimestamp, rawExtraFieldNTFS, rawExtraField);
		setUint32(directoryView, offset, CENTRAL_FILE_HEADER_SIGNATURE);
		setUint16(directoryView, offset + 4, versionMadeBy);
		const headerView = getDataView(headerArray);
		if (!zip64UncompressedSize) {
			setUint32(headerView, 18, uncompressedSize);
		}
		if (!zip64CompressedSize) {
			setUint32(headerView, 14, compressedSize);
		}
		arraySet(directoryArray, headerArray, offset + 6);
		setUint16(directoryView, offset + 30, extraFieldLength);
		setUint16(directoryView, offset + 32, getLength(rawComment));
		setUint16(directoryView, offset + 34, zip64 && zip64DiskNumberStart ? MAX_16_BITS : diskNumberStart);
		setUint16(directoryView, offset + 36, internalFileAttribute);
		if (externalFileAttribute) {
			setUint32(directoryView, offset + 38, externalFileAttribute);
		} else if (directory && msDosCompatible) {
			setUint8(directoryView, offset + 38, FILE_ATTR_MSDOS_DIR_MASK);
		}
		setUint32(directoryView, offset + 42, zip64 && zip64Offset ? MAX_32_BITS : fileEntryOffset);
		arraySet(directoryArray, rawFilename, offset + 46);
		arraySet(directoryArray, rawExtraFieldZip64, offset + 46 + getLength(rawFilename));
		arraySet(directoryArray, rawExtraFieldAES, offset + 46 + getLength(rawFilename, rawExtraFieldZip64));
		arraySet(directoryArray, rawExtraFieldCDExtendedTimestamp, offset + 46 + getLength(rawFilename, rawExtraFieldZip64, rawExtraFieldAES));
		arraySet(directoryArray, rawExtraFieldNTFS, offset + 46 + getLength(rawFilename, rawExtraFieldZip64, rawExtraFieldAES, rawExtraFieldCDExtendedTimestamp));
		arraySet(directoryArray, rawExtraField, offset + 46 + getLength(rawFilename, rawExtraFieldZip64, rawExtraFieldAES, rawExtraFieldCDExtendedTimestamp, rawExtraFieldNTFS));
		arraySet(directoryArray, rawComment, offset + 46 + getLength(rawFilename) + extraFieldLength);
		const directoryEntryLength = 46 + getLength(rawFilename, rawComment) + extraFieldLength;
		if (offset - directoryDiskOffset > writer.availableSize) {
			writer.availableSize = 0;
			await writeData$1(writable, directoryArray.slice(directoryDiskOffset, offset));
			directoryDiskOffset = offset;
		}
		offset += directoryEntryLength;
		if (options.onprogress) {
			try {
				await options.onprogress(indexFileEntry + 1, files.size, new Entry(fileEntry));
			} catch (_error) {
				// ignored
			}
		}
	}
	await writeData$1(writable, directoryDiskOffset ? directoryArray.slice(directoryDiskOffset) : directoryArray);
	let lastDiskNumber = writer.diskNumber;
	const { availableSize } = writer;
	if (availableSize < END_OF_CENTRAL_DIR_LENGTH) {
		lastDiskNumber++;
	}
	let zip64 = getOptionValue(zipWriter, options, "zip64");
	if (directoryOffset >= MAX_32_BITS || directoryDataLength >= MAX_32_BITS || filesLength >= MAX_16_BITS || lastDiskNumber >= MAX_16_BITS) {
		if (zip64 === false) {
			throw new Error$1(ERR_UNSUPPORTED_FORMAT);
		} else {
			zip64 = true;
		}
	}
	const endOfdirectoryArray = new Uint8Array$1(zip64 ? ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH : END_OF_CENTRAL_DIR_LENGTH);
	const endOfdirectoryView = getDataView(endOfdirectoryArray);
	offset = 0;
	if (zip64) {
		setUint32(endOfdirectoryView, 0, ZIP64_END_OF_CENTRAL_DIR_SIGNATURE);
		setBigUint64(endOfdirectoryView, 4, BigInt(44));
		setUint16(endOfdirectoryView, 12, 45);
		setUint16(endOfdirectoryView, 14, 45);
		setUint32(endOfdirectoryView, 16, lastDiskNumber);
		setUint32(endOfdirectoryView, 20, diskNumber);
		setBigUint64(endOfdirectoryView, 24, BigInt(filesLength));
		setBigUint64(endOfdirectoryView, 32, BigInt(filesLength));
		setBigUint64(endOfdirectoryView, 40, BigInt(directoryDataLength));
		setBigUint64(endOfdirectoryView, 48, BigInt(directoryOffset));
		setUint32(endOfdirectoryView, 56, ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE);
		setBigUint64(endOfdirectoryView, 64, BigInt(directoryOffset) + BigInt(directoryDataLength));
		setUint32(endOfdirectoryView, 72, lastDiskNumber + 1);
		const supportZip64SplitFile = getOptionValue(zipWriter, options, "supportZip64SplitFile", true);
		if (supportZip64SplitFile) {
			lastDiskNumber = MAX_16_BITS;
			diskNumber = MAX_16_BITS;
		}
		filesLength = MAX_16_BITS;
		directoryOffset = MAX_32_BITS;
		directoryDataLength = MAX_32_BITS;
		offset += ZIP64_END_OF_CENTRAL_DIR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH;
	}
	setUint32(endOfdirectoryView, offset, END_OF_CENTRAL_DIR_SIGNATURE);
	setUint16(endOfdirectoryView, offset + 4, lastDiskNumber);
	setUint16(endOfdirectoryView, offset + 6, diskNumber);
	setUint16(endOfdirectoryView, offset + 8, filesLength);
	setUint16(endOfdirectoryView, offset + 10, filesLength);
	setUint32(endOfdirectoryView, offset + 12, directoryDataLength);
	setUint32(endOfdirectoryView, offset + 16, directoryOffset);
	const commentLength = getLength(comment);
	if (commentLength) {
		if (commentLength <= MAX_16_BITS) {
			setUint16(endOfdirectoryView, offset + 20, commentLength);
		} else {
			throw new Error$1(ERR_INVALID_COMMENT);
		}
	}
	await writeData$1(writable, endOfdirectoryArray);
	if (commentLength) {
		await writeData$1(writable, comment);
	}
}

async function writeData$1(writable, array) {
	const streamWriter = writable.getWriter();
	await streamWriter.ready;
	writable.size += getLength(array);
	await streamWriter.write(array);
	streamWriter.releaseLock();
}

function getTimeNTFS(date) {
	if (date) {
		return ((BigInt(date.getTime()) + BigInt(11644473600000)) * BigInt(10000));
	}
}

function getOptionValue(zipWriter, options, name, defaultValue) {
	const result = options[name] === UNDEFINED_VALUE ? zipWriter.options[name] : options[name];
	return result === UNDEFINED_VALUE ? defaultValue : result;
}

function getMaximumCompressedSize(uncompressedSize) {
	return uncompressedSize + (5 * (Math.floor(uncompressedSize / 16383) + 1));
}

function setUint8(view, offset, value) {
	view.setUint8(offset, value);
}

function setUint16(view, offset, value) {
	view.setUint16(offset, value, true);
}

function setUint32(view, offset, value) {
	view.setUint32(offset, value, true);
}

function setBigUint64(view, offset, value) {
	view.setBigUint64(offset, value, true);
}

function arraySet(array, typedArray, offset) {
	array.set(typedArray, offset);
}

function getDataView(array) {
	return new DataView(array.buffer);
}

function getLength(...arrayLikes) {
	let result = 0;
	arrayLikes.forEach(arrayLike => arrayLike && (result += arrayLike.length));
	return result;
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

let baseURL;
try {
	baseURL = import.meta.url;
} catch (_error) {
	// ignored
}
configure({ baseURL });
e(configure);

/*
 * Copyright 2010-2022 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or 
 *   modify it under the terms of the GNU Affero General Public License 
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 * 
 *   The code in this file is distributed in the hope that it will be useful, 
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of 
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero 
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may 
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU 
 *   AGPL normally required by section 4, provided you include this license 
 *   notice and a URL through which recipients can access the Corresponding 
 *   Source.
 */

async function extract(content, { password, prompt = () => { }, shadowRootScriptURL, zipOptions = { useWebWorkers: false }, noBlobURL } = {}) {
	const KNOWN_MIMETYPES = {
		"gif": "image/gif",
		"jpg": "image/jpeg",
		"png": "image/png",
		"tif": "image/tiff",
		"tiff": "image/tiff",
		"bmp": "image/bmp",
		"ico": "image/vnd.microsoft.icon",
		"webp": "image/webp",
		"svg": "image/svg+xml",
		"avi": "video/x-msvideo",
		"ogv": "video/ogg",
		"mp4": "video/mp4",
		"mpeg": "video/mpeg",
		"ts": "video/mp2t",
		"webm": "video/webm",
		"3gp": "video/3gpp",
		"3g2": "video/3gpp",
		"mp3": "audio/mpeg",
		"oga": "audio/ogg",
		"mid": "audio/midi",
		"midi": "audio/midi",
		"opus": "audio/opus",
		"wav": "audio/wav",
		"weba": "audio/webm"
	};
	if (Array.isArray(content)) {
		content = new Blob([new Uint8Array(content)]);
	}
	zip.configure(zipOptions);
	const blobReader = new zip.BlobReader(content);
	let resources = [];
	const zipReader = new zip.ZipReader(blobReader);
	const entries = await zipReader.getEntries();
	const options = { password };
	await Promise.all(entries.map(async entry => {
		let dataWriter, content, textContent, name, blob;
		if (!options.password && entry.encrypted) {
			options.password = prompt("Please enter the password to view the page");
		}
		name = entry.filename.match(/^([0-9_]+\/)?(.*)$/)[2];
		if (entry.filename.match(/index\.html$/) || entry.filename.match(/stylesheet_[0-9]+\.css/) || entry.filename.match(/scripts\/[0-9]+\.js/)) {
			dataWriter = new zip.TextWriter();
			textContent = await entry.getData(dataWriter, options);
		} else {
			const extension = entry.filename.match(/\.([^.]+)/);
			let mimeType;
			if (extension && extension[1] && KNOWN_MIMETYPES[extension[1]]) {
				mimeType = KNOWN_MIMETYPES[extension[1]];
			} else {
				mimeType = "application/octet-stream";
			}
			if (entry.filename.match(/frames\//) || noBlobURL) {
				content = await entry.getData(new zip.Data64URIWriter(mimeType), options);
			} else {
				blob = await entry.getData(new zip.BlobWriter(mimeType), options);
				content = URL.createObjectURL(blob);
			}
		}
		resources.push({ filename: entry.filename, name, url: entry.comment, content, blob, textContent, parentResources: [] });
	}));
	await zipReader.close();
	let docContent, origDocContent, url;
	resources = resources.sort((resourceLeft, resourceRight) => resourceRight.filename.length - resourceLeft.filename.length);
	const REGEXP_ESCAPE = /([{}()^$&.*?/+|[\\\\]|\]|-)/g;
	for (const resource of resources) {
		if (resource.textContent !== undefined) {
			let prefixPath = "";
			const prefixPathMatch = resource.filename.match(/(.*\/)[^/]+$/);
			if (prefixPathMatch && prefixPathMatch[1]) {
				prefixPath = prefixPathMatch[1];
			}
			if (resource.filename.match(/^([0-9_]+\/)?index\.html$/)) {
				origDocContent = resource.textContent;
			}
			const isScript = resource.filename.match(/scripts\/[0-9]+\.js/);
			if (!isScript) {
				resources.forEach(innerResource => {
					if (innerResource.filename.startsWith(prefixPath) && innerResource.filename != resource.filename) {
						const filename = innerResource.filename.substring(prefixPath.length);
						if (!filename.match(/manifest\.json$/)) {
							const searchRegExp = new RegExp(filename.replace(REGEXP_ESCAPE, "\\$1"), "g");
							const position = resource.textContent.search(searchRegExp);
							if (position != -1) {
								innerResource.parentResources.push(resource.filename);
								resource.textContent = resource.textContent.replace(searchRegExp, innerResource.content);
							}
						}
					}
				});
			}
			let mimeType;
			if (resource.filename.match(/stylesheet_[0-9]+\.css/)) {
				mimeType = "text/css";
			} else if (isScript) {
				mimeType = "text/javascript";
			} else if (resource.filename.match(/index\.html$/)) {
				mimeType = "text/html";
				if (shadowRootScriptURL) {
					resource.textContent = resource.textContent.replace(/<script data-template-shadow-root.*<\/script>/g, "<script data-template-shadow-root src=" + shadowRootScriptURL + "></" + "script>");
				}
			}
			if (resource.filename.match(/^([0-9_]+\/)?index\.html$/)) {
				docContent = resource.textContent;
				url = resource.url;
			} else {
				const reader = new FileReader();
				if (resource.textContent) {
					reader.readAsDataURL(new Blob([resource.textContent], { type: mimeType + ";charset=utf-8" }));
					resource.content = await new Promise((resolve, reject) => {
						reader.addEventListener("load", () => resolve(reader.result), false);
						reader.addEventListener("error", reject, false);
					});
				} else {
					resource.content = "data:text/plain,";
				}
			}
		}
	}
	return { docContent, origDocContent, resources, url };
}

/*
 * Copyright 2010-2022 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or 
 *   modify it under the terms of the GNU Affero General Public License 
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 * 
 *   The code in this file is distributed in the hope that it will be useful, 
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of 
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero 
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may 
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU 
 *   AGPL normally required by section 4, provided you include this license 
 *   notice and a URL through which recipients can access the Corresponding 
 *   Source.
 */

async function display(document, docContent, { disableFramePointerEvents } = {}) {
	const DISABLED_NOSCRIPT_ATTRIBUTE_NAME = "data-single-file-disabled-noscript";
	const doc = (new DOMParser()).parseFromString(docContent, "text/html");
	doc.querySelectorAll("noscript:not([" + DISABLED_NOSCRIPT_ATTRIBUTE_NAME + "])").forEach(element => {
		element.setAttribute(DISABLED_NOSCRIPT_ATTRIBUTE_NAME, element.innerHTML);
		element.textContent = "";
	});
	if (doc.doctype) {
		if (document.doctype) {
			document.replaceChild(doc.doctype, document.doctype);
		} else {
			document.insertBefore(doc.doctype, document.documentElement);
		}
	} else if (document.doctype) {
		document.doctype.remove();
	}
	if (disableFramePointerEvents) {
		doc.querySelectorAll("iframe").forEach(element => {
			const pointerEvents = "pointer-events";
			element.style.setProperty("-sf-" + pointerEvents, element.style.getPropertyValue(pointerEvents), element.style.getPropertyPriority(pointerEvents));
			element.style.setProperty(pointerEvents, "none", "important");
		});
	}
	document.replaceChild(document.importNode(doc.documentElement, true), document.documentElement);
	document.documentElement.setAttribute("data-sfz", "");
	document.querySelectorAll("link[rel*=icon]").forEach(element => element.parentElement.replaceChild(element, element));
	document.open = document.write = document.close = () => { };
	for (let element of Array.from(document.querySelectorAll("script"))) {
		await new Promise(resolve => {
			const scriptElement = document.createElement("script");
			Array.from(element.attributes).forEach(attribute => scriptElement.setAttribute(attribute.name, attribute.value));
			const async = element.getAttribute("async") == "" || element.getAttribute("async") == "async";
			if (element.textContent) {
				scriptElement.textContent = element.textContent;
			} else if (!async) {
				scriptElement.addEventListener("load", resolve);
				scriptElement.addEventListener("error", () => resolve());
			}
			element.parentElement.replaceChild(scriptElement, element);
			if (element.textContent || async) {
				resolve();
			}
		});
	}
}

/*
 * Copyright 2010-2022 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or 
 *   modify it under the terms of the GNU Affero General Public License 
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 * 
 *   The code in this file is distributed in the hope that it will be useful, 
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of 
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero 
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may 
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU 
 *   AGPL normally required by section 4, provided you include this license 
 *   notice and a URL through which recipients can access the Corresponding 
 *   Source.
 */

const { Blob: Blob$1, fetch, TextEncoder, DOMParser: DOMParser$1 } = globalThis;

const NO_COMPRESSION_EXTENSIONS = [".jpg", ".jpeg", ".png", ".pdf", ".woff2", ".mp4", ".mp3", ".ogg", ".webp", ".webm"];
const SCRIPT_PATH = "/lib/single-file-zip.min.js";

const browser = globalThis.browser;

async function process(pageData, options) {
	let script;
	if (options.zipScript) {
		script = options.zipScript;
	} else if (browser && browser.runtime && browser.runtime.getURL) {
		configure({ workerScripts: { deflate: ["/lib/single-file-z-worker.js"] } });
		script = await (await fetch(browser.runtime.getURL(SCRIPT_PATH))).text();
	}
	const zipDataWriter = new Uint8ArrayWriter();
	zipDataWriter.init();
	if (options.selfExtractingArchive) {
		let pageContent = "";
		if (options.includeBOM && !options.extractDataFromPage) {
			pageContent += "\ufeff";
		}
		const charset = options.extractDataFromPage ? "windows-1252" : "utf-8";
		const pageDataTitle = pageData.title.replace(/</g, "&lt;").replace(/>/g, "&gt;") || "";
		const title = options.extractDataFromPage ? "" : pageDataTitle;
		pageContent += pageData.doctype + "<html data-sfz><meta charset=" + charset + "><title>" + title + "</title>";
		if (options.insertCanonicalLink) {
			pageContent += "<link rel=canonical href=\"" + options.url + "\">";
		}
		if (options.insertMetaNoIndex) {
			pageContent += "<meta name=robots content=noindex>";
		}
		if (pageData.viewport) {
			pageContent += "<meta name=\"viewport\" content=" + JSON.stringify(pageData.viewport) + ">";
		}
		pageContent += "<body hidden>";
		pageContent += "<div id='sfz-wait-message'>Please wait...</div>";
		pageContent += "<div id='sfz-error-message'><strong>Error</strong>: Cannot open the page from the filesystem.";
		pageContent += "<ul style='line-height:20px;'>";
		pageContent += "<li style='margin-bottom:10px'><strong>Chrome</strong>: Install <a href='https://chrome.google.com/webstore/detail/singlefile/mpiodijhokgodhhofbcjdecpffjipkle'>SingleFile</a> and enable the option \"Allow access to file URLs\" in the details page of the extension (chrome://extensions/?id=offkdfbbigofcgdokjemgjpdockaafjg).</li>";
		pageContent += "<li style='margin-bottom:10px'><strong>Microsoft Edge</strong>: Install <a href='https://microsoftedge.microsoft.com/addons/detail/singlefile/efnbkdcfmcmnhlkaijjjmhjjgladedno'>SingleFile</a> and enable the option \"Allow access to file URLs\" in the details page of the extension (edge://extensions/?id=gofneaifncimeglaecpnanbnmnpfjekk).</li>";
		pageContent += "<li><strong>Safari</strong>: Select \"Security > Disable Local File Restrictions\" in the \"Develop > Developer settings\" menu.</li></ul></div>";
		if (options.insertTextBody) {
			const doc = (new DOMParser$1()).parseFromString(pageData.content, "text/html");
			doc.body.querySelectorAll("style, script, noscript").forEach(element => element.remove());
			let textBody = "";
			if (options.extractDataFromPage) {
				textBody += pageDataTitle + "\n\n";
			}
			textBody += doc.body.innerText;
			doc.body.querySelectorAll("single-file-note").forEach(node => {
				const template = node.querySelector("template");
				if (template) {
					const docTemplate = (new DOMParser$1()).parseFromString(template.innerHTML, "text/html");
					textBody += "\n" + docTemplate.body.querySelector("textarea").value;
				}
			});
			textBody = textBody.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n +/g, "\n").replace(/\n\n\n+/g, "\n\n").trim();
			pageContent += "\n<main hidden>\n" + textBody + "\n</main>\n";
		}
		if (options.extractDataFromPageTags) {
			pageContent += options.extractDataFromPageTags[0];
		} else {
			pageContent += "<xmp>";
		}
		await writeData(zipDataWriter.writable, (new TextEncoder()).encode(pageContent));
	}
	const zipWriter = new ZipWriter(zipDataWriter, { bufferedWrite: true, keepOrder: false });
	let startOffset = zipDataWriter.offset;
	pageData.url = options.url;
	pageData.archiveTime = (new Date()).toISOString();
	await addPageResources(zipWriter, pageData, { password: options.password }, options.createRootDirectory ? String(Date.now()) + "_" + (options.tabId || 0) + "/" : "", options.url);
	const data = await zipWriter.close(null, { preventClose: true });
	if (options.selfExtractingArchive) {
		const insertionsCRLF = [];
		const substitutionsLF = [];
		if (options.extractDataFromPage) {
			if (!options.extractDataFromPageTags) {
				const textContent = new TextDecoder().decode(data);
				const matchEndTagXMP = textContent.match(/<\/\s*xmp>/i);
				if (matchEndTagXMP) {
					const matchEndTagComment = textContent.match(/-->/i);
					if (matchEndTagComment) {
						const matchTextAreaTagComment = textContent.match(/<\/\s*textarea>/i);
						if (matchTextAreaTagComment) {
							options.extractDataFromPage = false;
							return process(pageData, options);
						} else {
							options.extractDataFromPageTags = ["<textarea>", "</textarea>"];
							return process(pageData, options);
						}
					} else {
						options.extractDataFromPageTags = ["<!--", "-->"];
						return process(pageData, options);
					}
				}
			}
			for (let index = 0; index < data.length; index++) {
				if (data[index] == 13) {
					if (data[index + 1] == 10) {
						insertionsCRLF.push(index - startOffset);
					} else {
						substitutionsLF.push(index - startOffset);
					}
				}
			}
		}
		let pageContent = "";
		if (options.extractDataFromPageTags) {
			pageContent += options.extractDataFromPageTags[1];
		} else {
			pageContent += "</xmp>";
		}
		if (insertionsCRLF.length || substitutionsLF.length) {
			const extraData =
				await arrayToBase64(insertionsCRLF) + "," +
				await arrayToBase64(substitutionsLF) + "," +
				await arrayToBase64([startOffset]);
			pageContent += "<sfz-extra-data>" + extraData + "</sfz-extra-data>";
		}
		script += "document.currentScript.remove();globalThis.bootstrap=(()=>{let bootstrapStarted;return async content=>{if (bootstrapStarted) return bootstrapStarted;bootstrapStarted = (" +
			extract.toString().replace(/\n|\t/g, "") + ")(content,{prompt}).then(({docContent}) => " +
			display.toString().replace(/\n|\t/g, "") + "(document,docContent));return bootstrapStarted;}})();(" +
			getContent.toString().replace(/\n|\t/g, "") + ")().then(globalThis.bootstrap).catch(()=>{});";
		pageContent += "<script>" + script + "</script></body></html>";
		await writeData(zipDataWriter.writable, (new TextEncoder()).encode(pageContent));
	}
	await zipDataWriter.writable.close();
	return new Blob$1([zipDataWriter.getData()], { type: "application/octet-stream" });
}

async function arrayToBase64(data) {
	const fileReader = new FileReader();
	return await new Promise(resolve => {
		fileReader.onload = event => resolve(event.target.result.substring(37));
		fileReader.readAsDataURL(new Blob$1([new Uint32Array(data)], { type: "application/octet-stream" }));
	});
}

async function writeData(writable, array) {
	const streamWriter = writable.getWriter();
	await streamWriter.ready;
	writable.size = array.length;
	await streamWriter.write(array);
	streamWriter.releaseLock();
}

async function addPageResources(zipWriter, pageData, options, prefixName, url) {
	const resources = {};
	for (const resourceType of Object.keys(pageData.resources)) {
		for (const data of pageData.resources[resourceType]) {
			data.password = options.password;
			if (data.url && !data.url.startsWith("data:")) {
				resources[data.name] = data.url;
			}
		}
	}
	const jsonContent = JSON.stringify({
		originalUrl: pageData.url,
		title: pageData.title,
		archiveTime: pageData.archiveTime,
		indexFilename: "index.html",
		resources
	}, null, 2);
	await Promise.all([
		Promise.all([
			addFile(zipWriter, prefixName, { name: "index.html", extension: ".html", content: pageData.content, url, password: options.password }),
			addFile(zipWriter, prefixName, { name: "manifest.json", extension: ".json", content: jsonContent, password: options.password })
		]),
		Promise.all(Object.keys(pageData.resources).map(async resourceType =>
			Promise.all(pageData.resources[resourceType].map(data => {
				if (resourceType == "frames") {
					return addPageResources(zipWriter, data, options, prefixName + data.name, data.url);
				} else {
					return addFile(zipWriter, prefixName, data);
				}
			}))
		))
	]);
}

async function addFile(zipWriter, prefixName, data) {
	const dataReader = typeof data.content == "string" ? new TextReader(data.content) : new BlobReader(new Blob$1([new Uint8Array(data.content)]));
	const options = { comment: data.url && data.url.startsWith("data:") ? "data:" : data.url, password: data.password, bufferedWrite: true };
	if (NO_COMPRESSION_EXTENSIONS.includes(data.extension)) {
		options.level = 0;
	}
	await zipWriter.add(prefixName + data.name, dataReader, options);
}

async function getContent() {
	const { Blob, XMLHttpRequest, fetch, document, setTimeout, clearTimeout, stop } = globalThis;
	const characterMap = new Map([
		[65533, 0], [8364, 128], [8218, 130], [402, 131], [8222, 132], [8230, 133], [8224, 134], [8225, 135], [710, 136], [8240, 137],
		[352, 138], [8249, 139], [338, 140], [381, 142], [8216, 145], [8217, 146], [8220, 147], [8221, 148], [8226, 149], [8211, 150],
		[8212, 151], [732, 152], [8482, 153], [353, 154], [8250, 155], [339, 156], [382, 158], [376, 159]
	]);
	const xhr = new XMLHttpRequest();
	let displayTimeout;
	Array.from(document.documentElement.childNodes).forEach(node => {
		if (node != document.body && node != document.head) {
			node.remove();
		}
	});
	xhr.responseType = "blob";
	xhr.open("GET", "");
	return new Promise((resolve, reject) => {
		xhr.onerror = () => {
			extractPageData().then(resolve).catch(() => {
				displayTimeout = displayMessage("sfz-error-message");
				reject();
			});
		};
		xhr.send();
		xhr.onload = () => {
			displayTimeout = displayMessage("sfz-wait-message");
			stop();
			if (displayTimeout) {
				clearTimeout(displayTimeout);
			}
			resolve(xhr.response);
		};
	});

	function displayMessage(elementId) {
		return setTimeout(() => {
			if (document.getElementById(elementId)) {
				Array.from(document.body.childNodes).forEach(node => {
					if (node.id != elementId) {
						node.remove();
					}
				});
				document.body.hidden = false;
			}
		}, 1500);
	}

	async function extractPageData() {
		const zipDataElement = document.querySelector("sfz-extra-data");
		if (zipDataElement) {
			const dataNode = zipDataElement.previousSibling;
			const zipData = [];
			let { textContent } = dataNode;
			for (let index = 0; index < textContent.length; index++) {
				const charCode = textContent.charCodeAt(index);
				zipData.push(charCode > 255 ? characterMap.get(charCode) : charCode);
			}
			const [insertionsCRLFData, substitutionsLFData, startOffsetData] = zipDataElement.textContent.split(",");
			const insertionsCRLF = await base64ToUint32Array(insertionsCRLFData);
			const substitutionsLF = await base64ToUint32Array(substitutionsLFData);
			const [startOffset] = await base64ToUint32Array(startOffsetData);
			insertionsCRLF.forEach(index => zipData.splice(index, 1, 13, 10));
			substitutionsLF.forEach(index => zipData[index] = 13);
			return new Blob([new Uint8Array(startOffset), new Uint8Array(zipData)], { type: "application/octet-stream" });
		}
		throw new Error("Extra zip data data not found");
	}

	async function base64ToUint32Array(data) {
		return new Uint32Array(await (await fetch("data:application/octet-stream;base64," + data)).arrayBuffer());
	}
}

export { process };