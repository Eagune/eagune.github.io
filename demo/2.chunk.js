webpackJsonp([2],{175:/*!***********************************************************!*\
  !*** ./node_modules/codemirror/mode/markdown/markdown.js ***!
  \***********************************************************//*! dynamic exports provided *//*! all exports used */function(a,b,c){(function(a){a(c(/*! ../../lib/codemirror */0),c(/*! ../xml/xml */22),c(/*! ../meta */183))})(function(a){"use strict";a.defineMode("markdown",function(b,c){function d(c){if(a.findModeByName){var d=a.findModeByName(c);d&&(c=d.mime||d.mimes[0])}var e=a.getMode(b,c);return"null"==e.name?null:e}function e(a,b,c){return b.f=b.inline=c,c(a,b)}function f(a,b,c){return b.f=b.block=c,c(a,b)}function g(a){return!a||!/\S/.test(a.string)}function h(a){return a.linkTitle=!1,a.em=!1,a.strong=!1,a.strikethrough=!1,a.quote=0,a.indentedCode=!1,a.f==j&&(a.f=n,a.block=i),a.trailingSpace=0,a.trailingSpaceNewLine=!1,a.prevLine=a.thisLine,a.thisLine={stream:null},null}function i(b,f){var h=b.column()===f.indentation,i=g(f.prevLine.stream),j=f.indentedCode,m=f.prevLine.hr,n=!1!==f.list,o=(f.listStack[f.listStack.length-1]||0)+3;f.indentedCode=!1;var p=f.indentation;if(null===f.indentationDiff&&(f.indentationDiff=f.indentation,n)){for(f.list=null;p<f.listStack[f.listStack.length-1];)f.listStack.pop(),f.listStack.length?f.indentation=f.listStack[f.listStack.length-1]:f.list=!1;!1!==f.list&&(f.indentationDiff=p-f.listStack[f.listStack.length-1])}var q=!i&&!m&&!f.prevLine.header&&(!n||!j)&&!f.prevLine.fencedCodeEnd,s=(!1===f.list||m||i)&&f.indentation<=o&&b.match(y),t=null;if(4<=f.indentationDiff&&(j||f.prevLine.fencedCodeEnd||f.prevLine.header||i))return b.skipToEnd(),f.indentedCode=!0,w.code;if(b.eatSpace())return null;if(h&&f.indentation<=o&&(t=b.match(B))&&6>=t[1].length)return f.quote=0,f.header=t[1].length,f.thisLine.header=!0,c.highlightFormatting&&(f.formatting="header"),f.f=f.inline,l(f);if(f.indentation<=o&&b.eat(">"))return f.quote=h?1:f.quote+1,c.highlightFormatting&&(f.formatting="quote"),b.eatSpace(),l(f);if(!s&&!f.setext&&h&&f.indentation<=o&&(t=b.match(z))){var u=t[1]?"ol":"ul";return f.indentation=p+b.current().length,f.list=!0,f.quote=0,f.listStack.push(f.indentation),c.taskLists&&b.match(A,!1)&&(f.taskList=!0),f.f=f.inline,c.highlightFormatting&&(f.formatting=["list","list-"+u]),l(f)}return h&&f.indentation<=o&&(t=b.match(E,!0))?(f.quote=0,f.fencedEndRE=new RegExp(t[1]+"+ *$"),f.localMode=c.fencedCodeBlockHighlighting&&d(t[2]),f.localMode&&(f.localState=a.startState(f.localMode)),f.f=f.block=k,c.highlightFormatting&&(f.formatting="code-block"),f.code=-1,l(f)):!f.setext&&(q&&n||f.quote||!1!==f.list||f.code||s||F.test(b.string)||!(t=b.lookAhead(1))||!(t=t.match(C)))?s?(b.skipToEnd(),f.hr=!0,f.thisLine.hr=!0,w.hr):"["===b.peek()?e(b,f,r):e(b,f,f.inline):(f.setext?(f.header=f.setext,f.setext=0,b.skipToEnd(),c.highlightFormatting&&(f.formatting="header")):(f.header="="==t[0].charAt(0)?1:2,f.setext=f.header),f.thisLine.header=!0,f.f=f.inline,l(f))}function j(b,c){var d=u.token(b,c.htmlState);if(!v){var e=a.innerMode(u,c.htmlState);("xml"==e.mode.name&&null===e.state.tagStart&&!e.state.context&&e.state.tokenize.isInText||c.md_inside&&-1<b.current().indexOf(">"))&&(c.f=n,c.block=i,c.htmlState=null)}return d}function k(a,b){var d=b.listStack[b.listStack.length-1]||0,e=b.indentation<d;if(b.fencedEndRE&&b.indentation<=d+3&&(e||a.match(b.fencedEndRE))){c.highlightFormatting&&(b.formatting="code-block");var g;return e||(g=l(b)),b.localMode=b.localState=null,b.block=i,b.f=n,b.fencedEndRE=null,b.code=0,b.thisLine.fencedCodeEnd=!0,e?f(a,b,b.block):g}return b.localMode?b.localMode.token(a,b.localState):(a.skipToEnd(),w.code)}function l(a){var b=[];if(a.formatting){b.push(w.formatting),"string"==typeof a.formatting&&(a.formatting=[a.formatting]);for(var d=0;d<a.formatting.length;d++)b.push(w.formatting+"-"+a.formatting[d]),"header"===a.formatting[d]&&b.push(w.formatting+"-"+a.formatting[d]+"-"+a.header),"quote"===a.formatting[d]&&(!c.maxBlockquoteDepth||c.maxBlockquoteDepth>=a.quote?b.push(w.formatting+"-"+a.formatting[d]+"-"+a.quote):b.push("error"))}if(a.taskOpen)return b.push("meta"),b.length?b.join(" "):null;if(a.taskClosed)return b.push("property"),b.length?b.join(" "):null;if(a.linkHref?b.push(w.linkHref,"url"):(a.strong&&b.push(w.strong),a.em&&b.push(w.em),a.strikethrough&&b.push(w.strikethrough),a.emoji&&b.push(w.emoji),a.linkText&&b.push(w.linkText),a.code&&b.push(w.code),a.image&&b.push(w.image),a.imageAltText&&b.push(w.imageAltText,"link"),a.imageMarker&&b.push(w.imageMarker)),a.header&&b.push(w.header,w.header+"-"+a.header),a.quote&&(b.push(w.quote),!c.maxBlockquoteDepth||c.maxBlockquoteDepth>=a.quote?b.push(w.quote+"-"+a.quote):b.push(w.quote+"-"+c.maxBlockquoteDepth)),!1!==a.list){var e=(a.listStack.length-1)%3;e?1==e?b.push(w.list2):b.push(w.list3):b.push(w.list1)}return a.trailingSpaceNewLine?b.push("trailing-space-new-line"):a.trailingSpace&&b.push("trailing-space-"+(a.trailingSpace%2?"a":"b")),b.length?b.join(" "):null}function m(a,b){return a.match(D,!0)?l(b):void 0}function n(b,d){var e=d.text(b,d);if("undefined"!=typeof e)return e;if(d.list)return d.list=null,l(d);if(d.taskList){var g=" "===b.match(A,!0)[1];return g?d.taskOpen=!0:d.taskClosed=!0,c.highlightFormatting&&(d.formatting="task"),d.taskList=!1,l(d)}if(d.taskOpen=!1,d.taskClosed=!1,d.header&&b.match(/^#+$/,!0))return c.highlightFormatting&&(d.formatting="header"),l(d);var h=b.next();if(d.linkTitle){d.linkTitle=!1;var i=h;"("===h&&(i=")"),i=(i+"").replace(/([.?*+^\[\]\\(){}|-])/g,"\\$1");var k="^\\s*(?:[^"+i+"\\\\]+|\\\\\\\\|\\\\.)"+i;if(b.match(new RegExp(k),!0))return w.linkHref}if("`"===h){var m=d.formatting;c.highlightFormatting&&(d.formatting="code"),b.eatWhile("`");var q=b.current().length;if(0==d.code&&(!d.quote||1==q))return d.code=q,l(d);if(q==d.code){var r=l(d);return d.code=0,r}return d.formatting=m,l(d)}if(d.code)return l(d);if("\\"===h&&(b.next(),c.highlightFormatting)){var s=l(d),t=w.formatting+"-escape";return s?s+" "+t:t}if("!"===h&&b.match(/\[[^\]]*\] ?(?:\(|\[)/,!1))return d.imageMarker=!0,d.image=!0,c.highlightFormatting&&(d.formatting="image"),l(d);if("["===h&&d.imageMarker&&b.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/,!1))return d.imageMarker=!1,d.imageAltText=!0,c.highlightFormatting&&(d.formatting="image"),l(d);if("]"===h&&d.imageAltText){c.highlightFormatting&&(d.formatting="image");var s=l(d);return d.imageAltText=!1,d.image=!1,d.inline=d.f=p,s}if("["===h&&!d.image)return d.linkText=!0,c.highlightFormatting&&(d.formatting="link"),l(d);if("]"===h&&d.linkText){c.highlightFormatting&&(d.formatting="link");var s=l(d);return d.linkText=!1,d.inline=d.f=b.match(/\(.*?\)| ?\[.*?\]/,!1)?p:n,s}if("<"===h&&b.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,!1)){d.f=d.inline=o,c.highlightFormatting&&(d.formatting="link");var s=l(d);return s?s+=" ":s="",s+w.linkInline}if("<"===h&&b.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,!1)){d.f=d.inline=o,c.highlightFormatting&&(d.formatting="link");var s=l(d);return s?s+=" ":s="",s+w.linkEmail}if(c.xml&&"<"===h&&b.match(/^(!--|[a-z]+(?:\s+[a-z_:.\-]+(?:\s*=\s*[^ >]+)?)*\s*>)/i,!1)){var v=b.string.indexOf(">",b.pos);if(-1!=v){var x=b.string.substring(b.start,v);/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(x)&&(d.md_inside=!0)}return b.backUp(1),d.htmlState=a.startState(u),f(b,d,j)}if(c.xml&&"<"===h&&b.match(/^\/\w*?>/))return d.md_inside=!1,"tag";if("*"===h||"_"===h){for(var y=1,z=1==b.pos?" ":b.string.charAt(b.pos-2);3>y&&b.eat(h);)y++;var B=b.peek()||" ",C=!/\s/.test(B)&&(!G.test(B)||/\s/.test(z)||G.test(z)),D=!/\s/.test(z)&&(!G.test(z)||/\s/.test(B)||G.test(B)),E=null,F=null;if(y%2&&(!d.em&&C&&("*"===h||!D||G.test(z))?E=!0:d.em==h&&D&&("*"===h||!C||G.test(B))&&(E=!1)),1<y&&(!d.strong&&C&&("*"===h||!D||G.test(z))?F=!0:d.strong==h&&D&&("*"===h||!C||G.test(B))&&(F=!1)),null!=F||null!=E){c.highlightFormatting&&(d.formatting=null==E?"strong":null==F?"em":"strong em"),!0===E&&(d.em=h),!0===F&&(d.strong=h);var r=l(d);return!1===E&&(d.em=!1),!1===F&&(d.strong=!1),r}}else if(" "===h&&(b.eat("*")||b.eat("_"))){if(" "===b.peek())return l(d);b.backUp(1)}if(c.strikethrough)if("~"===h&&b.eatWhile(h)){if(d.strikethrough){c.highlightFormatting&&(d.formatting="strikethrough");var r=l(d);return d.strikethrough=!1,r}if(b.match(/^[^\s]/,!1))return d.strikethrough=!0,c.highlightFormatting&&(d.formatting="strikethrough"),l(d)}else if(" "===h&&b.match(/^~~/,!0)){if(" "===b.peek())return l(d);b.backUp(2)}if(c.emoji&&":"===h&&b.match(/^[a-z_\d+-]+:/)){d.emoji=!0,c.highlightFormatting&&(d.formatting="emoji");var H=l(d);return d.emoji=!1,H}return" "===h&&(b.match(/ +$/,!1)?d.trailingSpace++:d.trailingSpace&&(d.trailingSpaceNewLine=!0)),l(d)}function o(a,b){var d=a.next();if(">"===d){b.f=b.inline=n,c.highlightFormatting&&(b.formatting="link");var e=l(b);return e?e+=" ":e="",e+w.linkInline}return a.match(/^[^>]+/,!0),w.linkInline}function p(a,b){if(a.eatSpace())return null;var d=a.next();return"("===d||"["===d?(b.f=b.inline=q("("===d?")":"]"),c.highlightFormatting&&(b.formatting="link-string"),b.linkHref=!0,l(b)):"error"}function q(a){return function(b,d){var e=b.next();if(e===a){d.f=d.inline=n,c.highlightFormatting&&(d.formatting="link-string");var f=l(d);return d.linkHref=!1,f}return b.match(H[a]),d.linkHref=!0,l(d)}}function r(a,b){return a.match(/^([^\]\\]|\\.)*\]:/,!1)?(b.f=s,a.next(),c.highlightFormatting&&(b.formatting="link"),b.linkText=!0,l(b)):e(a,b,n)}function s(a,b){if(a.match(/^\]:/,!0)){b.f=b.inline=t,c.highlightFormatting&&(b.formatting="link");var d=l(b);return b.linkText=!1,d}return a.match(/^([^\]\\]|\\.)+/,!0),w.linkText}function t(a,b){return a.eatSpace()?null:(a.match(/^[^\s]+/,!0),void 0===a.peek()?b.linkTitle=!0:a.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,!0),b.f=b.inline=n,w.linkHref+" url")}var u=a.getMode(b,"text/html"),v="null"==u.name;c.highlightFormatting===void 0&&(c.highlightFormatting=!1),c.maxBlockquoteDepth===void 0&&(c.maxBlockquoteDepth=0),c.taskLists===void 0&&(c.taskLists=!1),c.strikethrough===void 0&&(c.strikethrough=!1),c.emoji===void 0&&(c.emoji=!1),c.fencedCodeBlockHighlighting===void 0&&(c.fencedCodeBlockHighlighting=!0),c.xml===void 0&&(c.xml=!0),c.tokenTypeOverrides===void 0&&(c.tokenTypeOverrides={});var w={header:"header",code:"comment",quote:"quote",list1:"variable-2",list2:"variable-3",list3:"keyword",hr:"hr",image:"image",imageAltText:"image-alt-text",imageMarker:"image-marker",formatting:"formatting",linkInline:"link",linkEmail:"link",linkText:"link",linkHref:"string",em:"em",strong:"strong",strikethrough:"strikethrough",emoji:"builtin"};for(var x in w)w.hasOwnProperty(x)&&c.tokenTypeOverrides[x]&&(w[x]=c.tokenTypeOverrides[x]);var y=/^([*\-_])(?:\s*\1){2,}\s*$/,z=/^(?:[*\-+]|^[0-9]+([.)]))\s+/,A=/^\[(x| )\](?=\s)/i,B=c.allowAtxHeaderWithoutSpace?/^(#+)/:/^(#+)(?: |$)/,C=/^ *(?:\={1,}|-{1,})\s*$/,D=/^[^#!\[\]*_\\<>` "'(~:]+/,E=/^(~~~+|```+)[ \t]*([\w+#-]*)[^\n`]*$/,F=/^\s*\[[^\]]+?\]:\s*\S+(\s*\S*\s*)?$/,G=/[!\"#$%&\'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}~—]/,H={")":/^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,"]":/^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/},I={startState:function(){return{f:i,prevLine:{stream:null},thisLine:{stream:null},block:i,htmlState:null,indentation:0,inline:n,text:m,formatting:!1,linkText:!1,linkHref:!1,linkTitle:!1,code:0,em:!1,strong:!1,header:0,setext:0,hr:!1,taskList:!1,list:!1,listStack:[],quote:0,trailingSpace:0,trailingSpaceNewLine:!1,strikethrough:!1,emoji:!1,fencedEndRE:null}},copyState:function(b){return{f:b.f,prevLine:b.prevLine,thisLine:b.thisLine,block:b.block,htmlState:b.htmlState&&a.copyState(u,b.htmlState),indentation:b.indentation,localMode:b.localMode,localState:b.localMode?a.copyState(b.localMode,b.localState):null,inline:b.inline,text:b.text,formatting:!1,linkText:b.linkText,linkTitle:b.linkTitle,code:b.code,em:b.em,strong:b.strong,strikethrough:b.strikethrough,emoji:b.emoji,header:b.header,setext:b.setext,hr:b.hr,taskList:b.taskList,list:b.list,listStack:b.listStack.slice(0),quote:b.quote,indentedCode:b.indentedCode,trailingSpace:b.trailingSpace,trailingSpaceNewLine:b.trailingSpaceNewLine,md_inside:b.md_inside,fencedEndRE:b.fencedEndRE}},token:function(a,b){if(b.formatting=!1,a!=b.thisLine.stream){if(b.header=0,b.hr=!1,a.match(/^\s*$/,!0))return h(b),null;if(b.prevLine=b.thisLine,b.thisLine={stream:a},b.taskList=!1,b.trailingSpace=0,b.trailingSpaceNewLine=!1,!b.localState&&(b.f=b.block,b.f!=j)){var c=a.match(/^\s*/,!0)[0].replace(/\t/g,"    ").length;if(b.indentation=c,b.indentationDiff=null,0<c)return null}}return b.f(a,b)},innerMode:function(a){return a.block==j?{state:a.htmlState,mode:u}:a.localState?{state:a.localState,mode:a.localMode}:{state:a,mode:I}},indent:function(b,c,d){return b.block==j&&u.indent?u.indent(b.htmlState,c,d):b.localState&&b.localMode.indent?b.localMode.indent(b.localState,c,d):a.Pass},blankLine:h,getType:l,closeBrackets:"()[]{}''\"\"``",fold:"markdown"};return I},"xml"),a.defineMIME("text/x-markdown","markdown")})},183:/*!**********************************************!*\
  !*** ./node_modules/codemirror/mode/meta.js ***!
  \**********************************************//*! dynamic exports provided *//*! all exports used */function(a,b,c){(function(a){a(c(/*! ../lib/codemirror */0))})(function(a){"use strict";a.modeInfo=[{name:"APL",mime:"text/apl",mode:"apl",ext:["dyalog","apl"]},{name:"PGP",mimes:["application/pgp","application/pgp-encrypted","application/pgp-keys","application/pgp-signature"],mode:"asciiarmor",ext:["asc","pgp","sig"]},{name:"ASN.1",mime:"text/x-ttcn-asn",mode:"asn.1",ext:["asn","asn1"]},{name:"Asterisk",mime:"text/x-asterisk",mode:"asterisk",file:/^extensions\.conf$/i},{name:"Brainfuck",mime:"text/x-brainfuck",mode:"brainfuck",ext:["b","bf"]},{name:"C",mime:"text/x-csrc",mode:"clike",ext:["c","h"]},{name:"C++",mime:"text/x-c++src",mode:"clike",ext:["cpp","c++","cc","cxx","hpp","h++","hh","hxx"],alias:["cpp"]},{name:"Cobol",mime:"text/x-cobol",mode:"cobol",ext:["cob","cpy"]},{name:"C#",mime:"text/x-csharp",mode:"clike",ext:["cs"],alias:["csharp"]},{name:"Clojure",mime:"text/x-clojure",mode:"clojure",ext:["clj","cljc","cljx"]},{name:"ClojureScript",mime:"text/x-clojurescript",mode:"clojure",ext:["cljs"]},{name:"Closure Stylesheets (GSS)",mime:"text/x-gss",mode:"css",ext:["gss"]},{name:"CMake",mime:"text/x-cmake",mode:"cmake",ext:["cmake","cmake.in"],file:/^CMakeLists.txt$/},{name:"CoffeeScript",mimes:["application/vnd.coffeescript","text/coffeescript","text/x-coffeescript"],mode:"coffeescript",ext:["coffee"],alias:["coffee","coffee-script"]},{name:"Common Lisp",mime:"text/x-common-lisp",mode:"commonlisp",ext:["cl","lisp","el"],alias:["lisp"]},{name:"Cypher",mime:"application/x-cypher-query",mode:"cypher",ext:["cyp","cypher"]},{name:"Cython",mime:"text/x-cython",mode:"python",ext:["pyx","pxd","pxi"]},{name:"Crystal",mime:"text/x-crystal",mode:"crystal",ext:["cr"]},{name:"CSS",mime:"text/css",mode:"css",ext:["css"]},{name:"CQL",mime:"text/x-cassandra",mode:"sql",ext:["cql"]},{name:"D",mime:"text/x-d",mode:"d",ext:["d"]},{name:"Dart",mimes:["application/dart","text/x-dart"],mode:"dart",ext:["dart"]},{name:"diff",mime:"text/x-diff",mode:"diff",ext:["diff","patch"]},{name:"Django",mime:"text/x-django",mode:"django"},{name:"Dockerfile",mime:"text/x-dockerfile",mode:"dockerfile",file:/^Dockerfile$/},{name:"DTD",mime:"application/xml-dtd",mode:"dtd",ext:["dtd"]},{name:"Dylan",mime:"text/x-dylan",mode:"dylan",ext:["dylan","dyl","intr"]},{name:"EBNF",mime:"text/x-ebnf",mode:"ebnf"},{name:"ECL",mime:"text/x-ecl",mode:"ecl",ext:["ecl"]},{name:"edn",mime:"application/edn",mode:"clojure",ext:["edn"]},{name:"Eiffel",mime:"text/x-eiffel",mode:"eiffel",ext:["e"]},{name:"Elm",mime:"text/x-elm",mode:"elm",ext:["elm"]},{name:"Embedded Javascript",mime:"application/x-ejs",mode:"htmlembedded",ext:["ejs"]},{name:"Embedded Ruby",mime:"application/x-erb",mode:"htmlembedded",ext:["erb"]},{name:"Erlang",mime:"text/x-erlang",mode:"erlang",ext:["erl"]},{name:"Esper",mime:"text/x-esper",mode:"sql"},{name:"Factor",mime:"text/x-factor",mode:"factor",ext:["factor"]},{name:"FCL",mime:"text/x-fcl",mode:"fcl"},{name:"Forth",mime:"text/x-forth",mode:"forth",ext:["forth","fth","4th"]},{name:"Fortran",mime:"text/x-fortran",mode:"fortran",ext:["f","for","f77","f90"]},{name:"F#",mime:"text/x-fsharp",mode:"mllike",ext:["fs"],alias:["fsharp"]},{name:"Gas",mime:"text/x-gas",mode:"gas",ext:["s"]},{name:"Gherkin",mime:"text/x-feature",mode:"gherkin",ext:["feature"]},{name:"GitHub Flavored Markdown",mime:"text/x-gfm",mode:"gfm",file:/^(readme|contributing|history).md$/i},{name:"Go",mime:"text/x-go",mode:"go",ext:["go"]},{name:"Groovy",mime:"text/x-groovy",mode:"groovy",ext:["groovy","gradle"],file:/^Jenkinsfile$/},{name:"HAML",mime:"text/x-haml",mode:"haml",ext:["haml"]},{name:"Haskell",mime:"text/x-haskell",mode:"haskell",ext:["hs"]},{name:"Haskell (Literate)",mime:"text/x-literate-haskell",mode:"haskell-literate",ext:["lhs"]},{name:"Haxe",mime:"text/x-haxe",mode:"haxe",ext:["hx"]},{name:"HXML",mime:"text/x-hxml",mode:"haxe",ext:["hxml"]},{name:"ASP.NET",mime:"application/x-aspx",mode:"htmlembedded",ext:["aspx"],alias:["asp","aspx"]},{name:"HTML",mime:"text/html",mode:"htmlmixed",ext:["html","htm"],alias:["xhtml"]},{name:"HTTP",mime:"message/http",mode:"http"},{name:"IDL",mime:"text/x-idl",mode:"idl",ext:["pro"]},{name:"Pug",mime:"text/x-pug",mode:"pug",ext:["jade","pug"],alias:["jade"]},{name:"Java",mime:"text/x-java",mode:"clike",ext:["java"]},{name:"Java Server Pages",mime:"application/x-jsp",mode:"htmlembedded",ext:["jsp"],alias:["jsp"]},{name:"JavaScript",mimes:["text/javascript","text/ecmascript","application/javascript","application/x-javascript","application/ecmascript"],mode:"javascript",ext:["js"],alias:["ecmascript","js","node"]},{name:"JSON",mimes:["application/json","application/x-json"],mode:"javascript",ext:["json","map"],alias:["json5"]},{name:"JSON-LD",mime:"application/ld+json",mode:"javascript",ext:["jsonld"],alias:["jsonld"]},{name:"JSX",mime:"text/jsx",mode:"jsx",ext:["jsx"]},{name:"Jinja2",mime:"null",mode:"jinja2"},{name:"Julia",mime:"text/x-julia",mode:"julia",ext:["jl"]},{name:"Kotlin",mime:"text/x-kotlin",mode:"clike",ext:["kt"]},{name:"LESS",mime:"text/x-less",mode:"css",ext:["less"]},{name:"LiveScript",mime:"text/x-livescript",mode:"livescript",ext:["ls"],alias:["ls"]},{name:"Lua",mime:"text/x-lua",mode:"lua",ext:["lua"]},{name:"Markdown",mime:"text/x-markdown",mode:"markdown",ext:["markdown","md","mkd"]},{name:"mIRC",mime:"text/mirc",mode:"mirc"},{name:"MariaDB SQL",mime:"text/x-mariadb",mode:"sql"},{name:"Mathematica",mime:"text/x-mathematica",mode:"mathematica",ext:["m","nb"]},{name:"Modelica",mime:"text/x-modelica",mode:"modelica",ext:["mo"]},{name:"MUMPS",mime:"text/x-mumps",mode:"mumps",ext:["mps"]},{name:"MS SQL",mime:"text/x-mssql",mode:"sql"},{name:"mbox",mime:"application/mbox",mode:"mbox",ext:["mbox"]},{name:"MySQL",mime:"text/x-mysql",mode:"sql"},{name:"Nginx",mime:"text/x-nginx-conf",mode:"nginx",file:/nginx.*\.conf$/i},{name:"NSIS",mime:"text/x-nsis",mode:"nsis",ext:["nsh","nsi"]},{name:"NTriples",mimes:["application/n-triples","application/n-quads","text/n-triples"],mode:"ntriples",ext:["nt","nq"]},{name:"Objective-C",mime:"text/x-objectivec",mode:"clike",ext:["m","mm"],alias:["objective-c","objc"]},{name:"OCaml",mime:"text/x-ocaml",mode:"mllike",ext:["ml","mli","mll","mly"]},{name:"Octave",mime:"text/x-octave",mode:"octave",ext:["m"]},{name:"Oz",mime:"text/x-oz",mode:"oz",ext:["oz"]},{name:"Pascal",mime:"text/x-pascal",mode:"pascal",ext:["p","pas"]},{name:"PEG.js",mime:"null",mode:"pegjs",ext:["jsonld"]},{name:"Perl",mime:"text/x-perl",mode:"perl",ext:["pl","pm"]},{name:"PHP",mime:["application/x-httpd-php","text/x-php"],mode:"php",ext:["php","php3","php4","php5","php7","phtml"]},{name:"Pig",mime:"text/x-pig",mode:"pig",ext:["pig"]},{name:"Plain Text",mime:"text/plain",mode:"null",ext:["txt","text","conf","def","list","log"]},{name:"PLSQL",mime:"text/x-plsql",mode:"sql",ext:["pls"]},{name:"PowerShell",mime:"application/x-powershell",mode:"powershell",ext:["ps1","psd1","psm1"]},{name:"Properties files",mime:"text/x-properties",mode:"properties",ext:["properties","ini","in"],alias:["ini","properties"]},{name:"ProtoBuf",mime:"text/x-protobuf",mode:"protobuf",ext:["proto"]},{name:"Python",mime:"text/x-python",mode:"python",ext:["BUILD","bzl","py","pyw"],file:/^(BUCK|BUILD)$/},{name:"Puppet",mime:"text/x-puppet",mode:"puppet",ext:["pp"]},{name:"Q",mime:"text/x-q",mode:"q",ext:["q"]},{name:"R",mime:"text/x-rsrc",mode:"r",ext:["r","R"],alias:["rscript"]},{name:"reStructuredText",mime:"text/x-rst",mode:"rst",ext:["rst"],alias:["rst"]},{name:"RPM Changes",mime:"text/x-rpm-changes",mode:"rpm"},{name:"RPM Spec",mime:"text/x-rpm-spec",mode:"rpm",ext:["spec"]},{name:"Ruby",mime:"text/x-ruby",mode:"ruby",ext:["rb"],alias:["jruby","macruby","rake","rb","rbx"]},{name:"Rust",mime:"text/x-rustsrc",mode:"rust",ext:["rs"]},{name:"SAS",mime:"text/x-sas",mode:"sas",ext:["sas"]},{name:"Sass",mime:"text/x-sass",mode:"sass",ext:["sass"]},{name:"Scala",mime:"text/x-scala",mode:"clike",ext:["scala"]},{name:"Scheme",mime:"text/x-scheme",mode:"scheme",ext:["scm","ss"]},{name:"SCSS",mime:"text/x-scss",mode:"css",ext:["scss"]},{name:"Shell",mimes:["text/x-sh","application/x-sh"],mode:"shell",ext:["sh","ksh","bash"],alias:["bash","sh","zsh"],file:/^PKGBUILD$/},{name:"Sieve",mime:"application/sieve",mode:"sieve",ext:["siv","sieve"]},{name:"Slim",mimes:["text/x-slim","application/x-slim"],mode:"slim",ext:["slim"]},{name:"Smalltalk",mime:"text/x-stsrc",mode:"smalltalk",ext:["st"]},{name:"Smarty",mime:"text/x-smarty",mode:"smarty",ext:["tpl"]},{name:"Solr",mime:"text/x-solr",mode:"solr"},{name:"Soy",mime:"text/x-soy",mode:"soy",ext:["soy"],alias:["closure template"]},{name:"SPARQL",mime:"application/sparql-query",mode:"sparql",ext:["rq","sparql"],alias:["sparul"]},{name:"Spreadsheet",mime:"text/x-spreadsheet",mode:"spreadsheet",alias:["excel","formula"]},{name:"SQL",mime:"text/x-sql",mode:"sql",ext:["sql"]},{name:"SQLite",mime:"text/x-sqlite",mode:"sql"},{name:"Squirrel",mime:"text/x-squirrel",mode:"clike",ext:["nut"]},{name:"Stylus",mime:"text/x-styl",mode:"stylus",ext:["styl"]},{name:"Swift",mime:"text/x-swift",mode:"swift",ext:["swift"]},{name:"sTeX",mime:"text/x-stex",mode:"stex"},{name:"LaTeX",mime:"text/x-latex",mode:"stex",ext:["text","ltx"],alias:["tex"]},{name:"SystemVerilog",mime:"text/x-systemverilog",mode:"verilog",ext:["v","sv","svh"]},{name:"Tcl",mime:"text/x-tcl",mode:"tcl",ext:["tcl"]},{name:"Textile",mime:"text/x-textile",mode:"textile",ext:["textile"]},{name:"TiddlyWiki ",mime:"text/x-tiddlywiki",mode:"tiddlywiki"},{name:"Tiki wiki",mime:"text/tiki",mode:"tiki"},{name:"TOML",mime:"text/x-toml",mode:"toml",ext:["toml"]},{name:"Tornado",mime:"text/x-tornado",mode:"tornado"},{name:"troff",mime:"text/troff",mode:"troff",ext:["1","2","3","4","5","6","7","8","9"]},{name:"TTCN",mime:"text/x-ttcn",mode:"ttcn",ext:["ttcn","ttcn3","ttcnpp"]},{name:"TTCN_CFG",mime:"text/x-ttcn-cfg",mode:"ttcn-cfg",ext:["cfg"]},{name:"Turtle",mime:"text/turtle",mode:"turtle",ext:["ttl"]},{name:"TypeScript",mime:"application/typescript",mode:"javascript",ext:["ts"],alias:["ts"]},{name:"TypeScript-JSX",mime:"text/typescript-jsx",mode:"jsx",ext:["tsx"],alias:["tsx"]},{name:"Twig",mime:"text/x-twig",mode:"twig"},{name:"Web IDL",mime:"text/x-webidl",mode:"webidl",ext:["webidl"]},{name:"VB.NET",mime:"text/x-vb",mode:"vb",ext:["vb"]},{name:"VBScript",mime:"text/vbscript",mode:"vbscript",ext:["vbs"]},{name:"Velocity",mime:"text/velocity",mode:"velocity",ext:["vtl"]},{name:"Verilog",mime:"text/x-verilog",mode:"verilog",ext:["v"]},{name:"VHDL",mime:"text/x-vhdl",mode:"vhdl",ext:["vhd","vhdl"]},{name:"Vue.js Component",mimes:["script/x-vue","text/x-vue"],mode:"vue",ext:["vue"]},{name:"XML",mimes:["application/xml","text/xml"],mode:"xml",ext:["xml","xsl","xsd","svg"],alias:["rss","wsdl","xsd"]},{name:"XQuery",mime:"application/xquery",mode:"xquery",ext:["xy","xquery"]},{name:"Yacas",mime:"text/x-yacas",mode:"yacas",ext:["ys"]},{name:"YAML",mimes:["text/x-yaml","text/yaml"],mode:"yaml",ext:["yaml","yml"],alias:["yml"]},{name:"Z80",mime:"text/x-z80",mode:"z80",ext:["z80"]},{name:"mscgen",mime:"text/x-mscgen",mode:"mscgen",ext:["mscgen","mscin","msc"]},{name:"xu",mime:"text/x-xu",mode:"mscgen",ext:["xu"]},{name:"msgenny",mime:"text/x-msgenny",mode:"mscgen",ext:["msgenny"]}];for(var b,c=0;c<a.modeInfo.length;c++)b=a.modeInfo[c],b.mimes&&(b.mime=b.mimes[0]);a.findModeByMIME=function(b){b=b.toLowerCase();for(var c,d=0;d<a.modeInfo.length;d++){if(c=a.modeInfo[d],c.mime==b)return c;if(c.mimes)for(var e=0;e<c.mimes.length;e++)if(c.mimes[e]==b)return c}return /\+xml$/.test(b)?a.findModeByMIME("application/xml"):/\+json$/.test(b)?a.findModeByMIME("application/json"):void 0},a.findModeByExtension=function(b){for(var c,d=0;d<a.modeInfo.length;d++)if(c=a.modeInfo[d],c.ext)for(var e=0;e<c.ext.length;e++)if(c.ext[e]==b)return c},a.findModeByFileName=function(b){for(var c,d=0;d<a.modeInfo.length;d++)if(c=a.modeInfo[d],c.file&&c.file.test(b))return c;var e=b.lastIndexOf("."),f=-1<e&&b.substring(e+1,b.length);if(f)return a.findModeByExtension(f)},a.findModeByName=function(b){b=b.toLowerCase();for(var c,d=0;d<a.modeInfo.length;d++){if(c=a.modeInfo[d],c.name.toLowerCase()==b)return c;if(c.alias)for(var e=0;e<c.alias.length;e++)if(c.alias[e].toLowerCase()==b)return c}}})}});