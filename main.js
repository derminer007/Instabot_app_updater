const {app,BrowserWindow,ipcMain,dialog}=require('electron'),path=require('path'),puppeteer=require('puppeteer'),fs=require('fs')['promises'],{convertArrayToCSV}=require('convert-array-to-csv'),{replace}=require('formik'),sqlite3=require('sqlite3')['verbose']();function createWindow(){const _0x45af14=new BrowserWindow({'width':0x320,'height':0x258,'webPreferences':{'preload':path['join'](__dirname,'preload.js'),'contextIsolation':!![],'enableRemoteModule':![]}});console['log'](__dirname),_0x45af14['loadFile'](path['join'](__dirname,'index.html')),_0x45af14['webContents']['openDevTools']();}app['whenReady']()['then'](createWindow),app['on']('window-all-closed',()=>{app['quit']();}),app['on']('activate',()=>{BrowserWindow['getAllWindows']()['length']===0x0&&createWindow();});function createChildWindow(_0x1fd69f){var _0x51f2d9=![];BrowserWindow['getAllWindows']()['forEach'](function(_0x4a272a){console['log']('window\x20id:'+_0x4a272a['id']),_0x4a272a['id']>0x1&&(_0x51f2d9=!![]);}),console['log']('child\x20opened\x20='+_0x51f2d9);if(!_0x51f2d9){const _0x24b280=new BrowserWindow({'width':0x320,'height':0x258,'webPreferences':{'nodeIntegration':!![],'enableRemoteModule':!![],'contextBridge':!![],'nativeWindowOpen':!![],'nodeIntegrationInSubFrames':!![],'parent':win,'preload':path['join'](__dirname,'preload.js')}});_0x24b280['loadFile'](_0x1fd69f['url']);}else console['log']('child\x20window\x20opened\x20already');}let browser=null,page=null,isStopping=![];async function getBrowserPage(){let _0x186458='';if(process['platform']==='darwin')_0x186458='/Applications/Google\x20Chrome.app/Contents/MacOS/Google\x20Chrome';else{if(process['platform']==='win32')_0x186458='chromium_local/chrome-win/chrome.exe';else{if(process['platform']==='linux'){}}}return(browser===null||page['isClosed']())&&(browser=await puppeteer['launch']({'headless':![],'ignoreHTTPSErrors':!![],'defaultViewport':null,'executablePath':_0x186458})),(page===null||page['isClosed']())&&(page=await browser['newPage'](),page['setDefaultNavigationTimeout'](0x1d4c),page['setDefaultTimeout'](0x1d4c)),page;}ipcMain['on']('login',async(_0x47d901,_0xc89163,_0x208a07)=>{const _0x1bbaa6=await getBrowserPage();await _0x1bbaa6['goto']('https://www.instagram.com/accounts/login/'),console['log']('Login\x20startet'),await login(_0x1bbaa6,_0xc89163,_0x208a07),setTimeout(async()=>{await browser['close']();},0x1388);}),ipcMain['handle']('sendMessage',async(_0xc5c060,_0x41975a,_0x9d534d,_0x55f313,_0x133c6c)=>{isStopping=![];const _0x121738=await getBrowserPage();return console['log']('send\x20Message\x20gestartet'),console['log'](_0x41975a),new Promise((_0x2b1fb3,_0x50bd39)=>{send_message(_0x121738,_0x41975a,_0x9d534d,_0x55f313,_0x133c6c)['then'](_0x12040c=>_0x2b1fb3(_0x12040c))['catch'](_0x4607a4=>_0x50bd39(_0x4607a4));});}),ipcMain['handle']('stop-action',async _0x202016=>{isStopping=!![];const _0xc68c43=await getBrowserPage();await _0xc68c43['close']();}),ipcMain['on']('fetch_followers',async(_0x47a3c3,_0x3de3fe,_0x316b48,_0x228652,_0x3053c5)=>{const _0x475b4b=await getBrowserPage();await fetch_followers_from_account(_0x475b4b,_0x3de3fe,_0x316b48,_0x228652,_0x3053c5);}),ipcMain['on']('fetch_likes',async(_0x4f2d4e,_0x94a1d2,_0x51a546,_0x3df135,_0xea7f72)=>{const _0x389798=await getBrowserPage();await fetch_likers_from_post(_0x389798,_0x94a1d2,_0x51a546,_0x3df135,_0xea7f72);}),ipcMain['on']('fetch_comments',async(_0x4430ab,_0x1d44b0,_0x3a6a62,_0x4b34b2,_0x5d4376)=>{const _0x404b25=await getBrowserPage();await fetch_comments_from_post(_0x404b25,_0x1d44b0,_0x3a6a62,_0x4b34b2,_0x5d4376);});function getRnd(_0x334e0c,_0x5c13f5){return Math['random']()*(_0x5c13f5-_0x334e0c+0x1)+_0x334e0c;}function delay(_0x7134b8,_0x41f1e0){let _0x31665c=getRnd(_0x7134b8,_0x41f1e0);return new Promise(function(_0x422675){setTimeout(_0x422675,_0x31665c);});}async function scroll(_0x4eb913,_0x55f4f4,_0x56b4c0=0x2){const _0x1aba9c=await _0x4eb913['waitForSelector'](_0x55f4f4);for(let _0x3ec58a=0x0;_0x3ec58a<_0x56b4c0;_0x3ec58a++){console['log']('Scrolling\x20'+_0x3ec58a),await _0x4eb913['evaluate'](_0x113b89=>{const _0x49ed57=document['querySelector'](_0x113b89);_0x49ed57&&_0x49ed57['scrollBy'](0x0,0x190);},_0x55f4f4),await delay(0x320,0x5dc);}}async function saveCookies(_0x17ee13){let _0xee1862=await _0x17ee13['cookies']();await fs['writeFile']('public/cookies.json',JSON['stringify'](_0xee1862,null,0x2));}async function notificationClear(_0x3e24ca){console['log']('Suche\x20nach\x20Notification-Button');try{await delay(0xbb8,0x1388),await _0x3e24ca['waitForSelector']('button._a9--._ap36._a9_1',{'visible':!![]}),await _0x3e24ca['click']('button._a9--._ap36._a9_1'),console['log']('Notification-Button\x20gefunden');}catch(_0x571585){console['log']('Notification-Feld\x20übersprungen:\x20'+_0x571585);}}async function getTargetProfiles(_0x28a827){return new Promise((_0x180321,_0xcea932)=>{db['all']('SELECT\x20*\x20FROM\x20'+_0x28a827,(_0xdefa96,_0x440937)=>{_0xdefa96?_0xcea932(_0xdefa96):_0x180321(_0x440937);});});}async function login(_0x27ebbe,_0x1bf5f5,_0x496cf9){console['log']('Starte\x20Login\x20Prozess');try{await setCookiesForUser(_0x27ebbe,_0x1bf5f5),await createUserIfNotExists(_0x1bf5f5,_0x496cf9);}catch(_0x703517){console['log']('Cookies\x20konnten\x20nicht\x20hinzuefügt\x20werden:'+_0x703517);}try{await _0x27ebbe['goto']('https://www.instagram.com/accounts/login/');try{await delay(0x7d0,0x1388),await _0x27ebbe['waitForSelector']('button._a9--._ap36._a9_0',{'visible':!![]}),await _0x27ebbe['click']('button._a9--._ap36._a9_0');}catch(_0x2c9b70){console['log']('Cookie\x20Fenster\x20überspringen');}await delay(0xfa0,0x1d4c);try{await _0x27ebbe['waitForSelector']('input[name=\x27username\x27]'),console['log']('Benutzername-Feld\x20gefunden'),await _0x27ebbe['type']('input[name=\x27username\x27]',_0x1bf5f5,{'delay':getRnd(0x50,0x78)}),await delay(0xfa0,0x1d4c),await _0x27ebbe['waitForSelector']('input[name=\x27password\x27]'),console['log']('Passwort-Feld\x20gefunden'),await _0x27ebbe['type']('input[name=\x27password\x27]',_0x496cf9,{'delay':getRnd(0x50,0x78)}),await delay(0xfa0,0x1d4c),await _0x27ebbe['waitForSelector']('button[type=\x27submit\x27]'),console['log']('Login-Button\x20gefunden'),await _0x27ebbe['click']('button[type=\x27submit\x27]');}catch(_0x10bcb3){console['log']('Anmeldeformular\x20nicht\x20gefunden');}await notificationClear(_0x27ebbe),await delay(0x1388,0x1b58);try{await saveCookiesForUser(_0x27ebbe,_0x1bf5f5);}catch(_0x423a4d){console['log']('Fehler\x20bei\x20Cookie\x20speichern:\x20'+_0x423a4d);}}catch(_0x4e0cd0){console['log']('Login\x20nicht\x20durgeführt:\x20'+_0x4e0cd0);}}async function send_message(_0x155e52,_0x544a6a,_0x127cf0,_0x16119c,_0x3a5629){console['log'](_0x3a5629),console['log']('Anfang'),console['log']('Counter:\x20'+_0x16119c);if(_0x16119c==0x0){try{console['log'](_0x3a5629),await login(_0x155e52,_0x3a5629['username'],_0x3a5629['password']);}catch(_0x3c69b7){console['log']('Cookies\x20konnten\x20nicht\x20hinzuefügt\x20werden:'+_0x3c69b7);return;}await _0x155e52['goto']('https://www.instagram.com/direct/inbox/'),await delay(0xfa0,0x1d4c),await notificationClear(_0x155e52);}try{try{const _0x32d176='div.x1i10hfl.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x6s0dn4.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x1ypdohk.x78zum5.xl56j7k.x1y1aw1k.x1sxyh0.xwib8y2.xurb0ha.xcdnw81';await delay(0xfa0,0x1d4c),await _0x155e52['waitForSelector'](_0x32d176),await _0x155e52['click'](_0x32d176),console['log']('Message-Button\x20geklickt'),console['log'](_0x544a6a+'\x20'+_0x127cf0),await delay(0xfa0,0x1d4c);try{const _0x25b922='input[name=\x22queryBox\x22]',_0x1f86ae='body\x20>\x20div.x1n2onr6.xzkaem6\x20>\x20div.x9f619.x1n2onr6.x1ja2u2z\x20>\x20div\x20>\x20div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj\x20>\x20div\x20>\x20div\x20>\x20div\x20>\x20div\x20>\x20div\x20>\x20div\x20>\x20div.x9f619.x1ja2u2z.x1k90msu.x6o7n8i.x1qfuztq.x10l6tqk.x17qophe.x13vifvy.x1hc1fzr.x71s49j.xh8yej3\x20>\x20div\x20>\x20div:nth-child(2)\x20>\x20div\x20>\x20div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1iyjqo2.x2lwn1j.xeuugli.x1q0g3np.x1a02dak.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1\x20>\x20input';await _0x155e52['waitForSelector'](_0x1f86ae),await _0x155e52['click'](_0x1f86ae),await delay(0xfa0,0x1d4c),await _0x155e52['waitForSelector'](_0x25b922),await _0x155e52['click'](_0x25b922),await delay(0xfa0,0x1d4c),await _0x155e52['type'](_0x25b922,_0x544a6a,{'delay':getRnd(0x50,0x78)}),await delay(0xfa0,0x1d4c),console['log']('Account\x20Name\x20eingefügt');const _0x3be313='div.xnkg4db.x1xling4.x13ywhbb.x178cd7z.x1n2onr6.xzkaem6\x20>\x20div.x9f619.x1n2onr6.x1ja2u2z\x20>\x20div\x20>\x20div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj\x20>\x20div\x20>\x20div\x20>\x20div\x20>\x20div\x20>\x20div\x20>\x20div\x20>\x20div.x9f619.x1ja2u2z.x1k90msu.x6o7n8i.x1qfuztq.x17qophe.x10l6tqk.x13vifvy.x1hc1fzr.x71s49j.xh8yej3\x20>\x20div\x20>\x20div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x6ikm8r.x1rife3k.x1iyjqo2.x2lwn1j.xeuugli.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1\x20>\x20div\x20>\x20div:nth-child(',_0xbfde20=')\x20>\x20div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1pi30zi.x1swvt13.xwib8y2.x1y1aw1k.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1\x20>\x20div\x20>\x20div\x20>\x20div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x1iyjqo2.xs83m0k.xeuugli.x1qughib.x6s0dn4.x1a02dak.x1q0g3np.xdl72j9\x20>\x20div\x20>\x20div\x20>\x20span\x20>\x20span';let _0x2ca49c=0x1;try{while(_0x2ca49c!=0x14){console['log']('Schleife');let _0x1cd0c3=_0x3be313+_0x2ca49c+_0xbfde20;const _0x53a449=await _0x155e52['waitForSelector'](_0x1cd0c3),_0x3613af=await _0x155e52['evaluate'](_0x50b832=>_0x50b832['innerHTML'],_0x53a449);console['log'](_0x3613af+'\x20'+_0x544a6a),delay(0x3e8,0xbb8);if(_0x3613af==_0x544a6a){console['log']('Account\x20gefunden'),await _0x155e52['click'](_0x1cd0c3);break;}_0x2ca49c++;}try{await delay(0xbb8,0x1388);const _0x4e9697=await _0x155e52['waitForSelector']('div.x1i10hfl.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x972fbf.xcfux6l.x1qhh985.xm0m39n.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x18d9i69.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x1lku1pv.x1a2a7pz.x6s0dn4.xjyslct.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x9f619.x9bdzbf.x1ypdohk.x78zum5.x1f6kntn.xwhw2v2.xl56j7k.x17ydfre.x1n2onr6.x2b8uid.xlyipyv.x87ps6o.x14atkfc.xcdnw81.x1i0vuye.xn3w4p2.x5ib6vp.xc73u3c.x1tu34mt.xzloghq');console['log'](_0x4e9697),await delay(0xbb8,0x1388),await _0x4e9697['click']();try{await delay(0xbb8,0x1388);const _0x2b753c=await _0x155e52['waitForSelector']('div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1i64zmx.xw3qccf.x1uhb9sk.x1plvlek.xryxfnj.x1iyjqo2.x2lwn1j.xeuugli.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1\x20>\x20div\x20>\x20div.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.x1iyjqo2.x1gh3ibb.xisnujt.xeuugli.x1odjw0f.notranslate');await _0x2b753c['type'](_0x127cf0,{'delay':getRnd(0x50,0x78)}),await delay(0xbb8,0x1388);try{const _0x3777a2=await _0x155e52['waitForSelector']('div.x1i10hfl.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.xdl72j9.x2lah0s.xe8uvvx.xdj266r.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x1lku1pv.x1a2a7pz.x6s0dn4.xjyslct.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x9f619.x1ypdohk.x1f6kntn.xwhw2v2.xl56j7k.x17ydfre.x2b8uid.xlyipyv.x87ps6o.x14atkfc.xcdnw81.x1i0vuye.xjbqb8w.xm3z3ea.x1x8b98j.x131883w.x16mih1h.x972fbf.xcfux6l.x1qhh985.xm0m39n.xt0psk2.xt7dq6l.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1n5bzlp.x173jzuc.x1yc6y37.xfs2ol5[role=\x22button\x22][tabindex=\x220\x22]');return await _0x3777a2['click'](),await delay(0xbb8,0x1388),new Promise(_0x3f2400=>{_0x3f2400('Nachricht\x20erfolgreich\x20verschickt!');});}catch(_0x331404){console['log']('Message-Button\x20nicht\x20geklickt:\x20'+_0x331404);}}catch(_0x2097e6){console['log']('Chat-Fenster\x20nicht\x20gefunden:\x20'+_0x2097e6);}}catch(_0x18ebbb){console['log']('error:\x20'+_0x18ebbb);}}catch(_0x59d432){console['log']('User\x20nicht\x20gefunden:'+_0x59d432);}}catch(_0x4dac3a){console['log']('DM-Fenster\x20nicht\x20gefunden:'+_0x4dac3a);}}catch(_0xa11df){console['log']('Message-Button\x20nicht\x20geklickt:'+_0xa11df);}}catch(_0x4f42db){console['log']('Nachricht\x20senden\x20fehlgeschlagen:\x20'+_0x4f42db);}return console['log']('Ende'),new Promise((_0x11ca70,_0x186e50)=>{_0x186e50('Fehler\x20beim\x20Anschreiben.\x20Lade\x20bitte\x20die\x20neuste\x20Version\x20herunter');});}async function fetch_followers_from_account(_0x2f4a49,_0x288070,_0x223117,_0x57468d,_0x21101a){try{await login(_0x2f4a49,_0x21101a['username'],_0x21101a['password']);}catch(_0x4f1af9){console['log']('Cookies\x20konnten\x20nicht\x20hinzuefügt\x20werden:'+_0x4f1af9);}let _0x38acc5=0x0;try{await _0x2f4a49['goto']('https://www.instagram.com/'+_0x288070+'/'),await notificationClear(_0x2f4a49);try{if(_0x223117<=0x0){const _0x3654dd=await _0x2f4a49['waitForSelector']('div.x9f619.x1n2onr6\x20>\x20div\x20>\x20div\x20>\x20div.x78zum5.x1ja2u2z\x20>\x20div\x20>\x20div\x20>\x20div.x1gryazu\x20>\x20section\x20>\x20main\x20>\x20div\x20>\x20header\x20>\x20section\x20>\x20ul\x20>\x20li:nth-child(2)\x20>\x20div\x20>\x20a\x20>\x20span\x20>\x20span');await delay(0x12c,0x320);const _0x3dac27=await _0x2f4a49['evaluate'](_0x21ebe4=>_0x21ebe4['innerHTML'],_0x3654dd);_0x38acc5=Math['ceil'](_0x3dac27/0x4);}else _0x38acc5=Math['ceil'](_0x223117/0x4);let _0x3e2f28=await _0x2f4a49['waitForSelector']('div.x9f619.x1n2onr6.x1ja2u2z\x20>\x20div\x20>\x20div\x20>\x20div.x78zum5.x1ja2u2z\x20>\x20div:nth-child(2)\x20>\x20div\x20>\x20div.x1gryazu\x20>\x20section\x20>\x20main\x20>\x20div\x20>\x20header\x20>\x20section.xc3tme8\x20>\x20ul\x20>\x20li:nth-child(2)\x20>\x20div\x20>\x20a');await delay(0xbb8,0x1388),await _0x3e2f28['click'](),console['log']('Follower\x20Liste\x20von\x20'+_0x288070+'\x20gesichtet');}catch(_0xa8b702){console['log']('Follower\x20Liste\x20von\x20'+_0x288070+'\x20nicht\x20gefunden:'+_0xa8b702);}}catch(_0x15f4ca){console['log']('User\x20besuchen\x20fehlgeschlagen:\x20'+_0x15f4ca);}try{await delay(0xbb8,0x1388),console['log']('Auto-scrolls:\x20'+_0x38acc5),await scroll(_0x2f4a49,'div.xnkg4db.x1xling4\x20>\x20div:nth-child(2)\x20>\x20div\x20>\x20div\x20>\x20div.x9f619.x1ja2u2z\x20>\x20div\x20>\x20div.x1uvtmcs.x1h91t0o\x20>\x20div\x20>\x20div\x20>\x20div\x20>\x20div\x20>\x20div.x7r02ix.xf1ldfh\x20>\x20div\x20>\x20div\x20>\x20div.xyi19xy.x1pc53ja.x1lliihq.x1iyjqo2',_0x38acc5),await _0x2f4a49['waitForSelector']('a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.notranslate._a6hd');const _0x1e736e=await _0x2f4a49['$$']('a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.notranslate._a6hd');_0x223117<=0x0&&(_0x223117=_0x1e736e['length']);for(let _0x180b2e=0x0;_0x180b2e<_0x1e736e['length']&&_0x180b2e<_0x223117;_0x180b2e++){console['log'](await _0x1e736e[_0x180b2e]['evaluate'](_0x4bf761=>_0x4bf761['textContent']));const _0x180859=await db['prepare']('INSERT\x20INTO\x20'+_0x57468d+'\x20(username)\x20VALUES\x20(?)');await _0x180859['run'](await _0x1e736e[_0x180b2e]['evaluate'](_0x247eb5=>_0x247eb5['textContent']),function(_0x2c9c5f){_0x2c9c5f&&console['log']('error\x20in\x20add-user:'+_0x2c9c5f);}),await _0x180859['finalize']();}await dialog['showMessageBox']({'type':'info','buttons':['OK'],'title':'Information','message':'Scraping\x20finished!'});}catch(_0x1980e3){console['log']('Fehler\x20bei\x20der\x20Followerliste\x20von\x20'+_0x288070+'\x20nicht\x20gefunden:'+_0x1980e3);}}async function fetch_likers_from_post(_0xb76492,_0x54e6f6,_0x2206c5,_0x3dc2ce,_0xfa552d){try{await login(_0xb76492,_0xfa552d['username'],_0xfa552d['password']);}catch(_0x358278){console['log']('Cookies\x20konnten\x20nicht\x20hinzuefügt\x20werden:'+_0x358278);return;}try{let _0x5389b6=_0x54e6f6['substring'](0x0,_0x54e6f6['lastIndexOf']('/')),_0x502776=_0x5389b6+'/liked_by';console['log'](_0x502776),await _0xb76492['goto'](_0x502776),await delay(0x7d0,0xfa0),await notificationClear(_0xb76492),await delay(0xc8,0x1f4);let _0x5e2103='a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.notranslate._a6hd';await _0xb76492['waitForSelector'](_0x5e2103),await delay(0x1f4,0x320);const _0x272f79=await _0xb76492['$$'](_0x5e2103);await delay(0x1f4,0x320),console['log'](_0x272f79['length']);let _0xc71ce2=path['join'](__dirname,'/likers.csv');_0x2206c5<=0x0&&(_0x2206c5=_0x272f79['length']);try{for(let _0x276e54=0x0;_0x276e54<_0x272f79['length']&&_0x276e54<_0x2206c5;_0x276e54++){console['log'](await _0x272f79[_0x276e54]['evaluate'](_0x4b9621=>_0x4b9621['textContent']));try{const _0x405548=await db['prepare']('INSERT\x20INTO\x20'+_0x3dc2ce+'\x20(username)\x20VALUES\x20(?)');await _0x405548['run'](await _0x272f79[_0x276e54]['evaluate'](_0xbcdf12=>_0xbcdf12['textContent']),function(_0x39d91a){_0x39d91a&&console['log']('error\x20in\x20add-user:'+_0x39d91a);}),await _0x405548['finalize']();}catch(_0x3a3341){console['log']('Fehler\x20innerhalb\x20des\x20Fetchen\x20bei\x20i='+_0x276e54+'\x20:\x20'+_0x3a3341);}}await dialog['showMessageBox']({'type':'info','buttons':['OK'],'title':'Information','message':'Scraping\x20finished!'});}catch(_0x5be23c){console['log']('Nicht\x20in\x20Likers\x20Datei\x20geschrieben');}}catch(_0x5a8b33){console['log']('Like-Seite\x20nicht\x20geöffnet'+_0x5a8b33);}}async function fetch_comments_from_post(_0x272fe6,_0x2a5029,_0x499834,_0x817b1e,_0xc17da3){try{await login(_0x272fe6,_0xc17da3['username'],_0xc17da3['password']);}catch(_0x4d4b4f){console['log']('Cookies\x20konnten\x20nicht\x20hinzuefügt\x20werden:'+_0x4d4b4f);return;}try{console['log'](_0x2a5029),await _0x272fe6['goto'](_0x2a5029),await delay(0x7d0,0xfa0),await notificationClear(_0x272fe6),await delay(0xc8,0x1f4);const _0x172562='.x9f619.x1n2onr6.x1ja2u2z\x20>\x20div\x20>\x20div\x20>\x20div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4\x20>\x20div.x9f619.xvbhtw8.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib\x20>\x20div.x1gryazu.xh8yej3.x10o80wk.x14k21rp.x17snn68.x6osk4m.x1porb0y\x20>\x20section\x20>\x20main\x20>\x20div\x20>\x20div.x6s0dn4.x78zum5.xdt5ytf.xdj266r.xkrivgy.xat24cr.x1gryazu.x1n2onr6.xh8yej3\x20>\x20div\x20>\x20div.x4h1yfo\x20>\x20div\x20>\x20div.x5yr21d.xw2csxc.x1odjw0f.x1n2onr6';let _0x27fd14;if(_0x499834<=0x0){const _0x534c8f=await _0x272fe6['waitForSelector']('div.x78zum5.xdt5ytf.x1ja2u2z\x20>\x20div.x9f619.xvbhtw8\x20>\x20div.x1gryazu\x20>\x20section\x20>\x20main\x20>\x20div\x20>\x20div.x6s0dn4\x20>\x20div\x20>\x20div.x4h1yfo\x20>\x20div\x20>\x20div.x1xp8e9x\x20>\x20section.x12nagc\x20>\x20div\x20>\x20div\x20>\x20span\x20>\x20a\x20>\x20span\x20>\x20span');await delay(0x12c,0x320);let _0x136cb8=await _0x272fe6['evaluate'](_0x912813=>_0x912813['innerHTML'],_0x534c8f),_0x4de192=String(_0x136cb8)['replace'](/[^0-9]/g,''),_0x5d2c3d=Number(_0x4de192)/0x14;_0x27fd14=Math['ceil'](_0x5d2c3d/0x3);}else _0x27fd14=Math['ceil'](_0x499834/0x3);console['log']('Auto-scrolls:\x20'+_0x27fd14),await scroll(_0x272fe6,_0x172562,_0x27fd14);try{const _0xf9cea5='div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1.x540dpk\x20>\x20div\x20>\x20div\x20>\x20span';await _0x272fe6['waitForSelector'](_0xf9cea5),await delay(0x1f4,0x320);const _0x57ec08=await _0x272fe6['$$'](_0xf9cea5);console['log'](_0x57ec08),await delay(0xc8,0x1f4);try{for(let _0x27c278=0x0;_0x27c278<_0x57ec08['length'];_0x27c278++){_0x57ec08[_0x27c278]['click'](),await delay(0x320,0x5dc);}}catch(_0x54af58){console['log']('Nicht\x20auf\x20Replies\x20geklickt\x20'+_0x54af58);}}catch(_0x42dd4c){console['log']('Kein\x20Reply-Button\x20gefunden.\x20Überspringe\x20Schritt');}const _0x1ce5a3='span._ap3a._aaco._aacw._aacx._aad7._aade';await _0x272fe6['waitForSelector'](_0x1ce5a3),await delay(0x1f4,0x320);const _0x1615b7=await _0x272fe6['$$'](_0x1ce5a3);let _0x847110=path['join'](__dirname,'/comments.csv');_0x499834<=0x0&&(_0x499834=_0x1615b7['length']);console['log']('fetch_limit:\x20'+_0x499834),console['log']('comments_len:\x20'+_0x1615b7['length']),_0x499834++;try{for(let _0x444fcb=0x1;_0x444fcb<_0x1615b7['length']&&_0x444fcb<_0x499834;_0x444fcb++){try{console['log'](await _0x1615b7[_0x444fcb]['evaluate'](_0x4c1c09=>_0x4c1c09['textContent']));const _0x415a36=await db['prepare']('INSERT\x20INTO\x20'+_0x817b1e+'\x20(username)\x20VALUES\x20(?)');await _0x415a36['run'](await _0x1615b7[_0x444fcb]['evaluate'](_0x24d530=>_0x24d530['textContent']),function(_0xd70a41){_0xd70a41&&console['log']('error\x20in\x20add-user:'+_0xd70a41);}),await _0x415a36['finalize']();}catch(_0x4952e7){console['log']('Fehler\x20innerhalb\x20des\x20Fetchen\x20bei\x20i='+_0x444fcb+'\x20:\x20'+_0x4952e7);}}await dialog['showMessageBox']({'type':'info','buttons':['OK'],'title':'Information','message':'Scraping\x20finished!'});}catch(_0x9690c3){console['log']('Nicht\x20in\x20Comments\x20Datei\x20geschrieben');}}catch(_0x4e0209){console['log']('Comments-Seite\x20nicht\x20geöffnet'+_0x4e0209);}}const dbPath=path['resolve'](__dirname,'data/crm.db'),db=new sqlite3['Database'](dbPath);db['serialize'](()=>{db['run']('CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20leads\x20(username\x20TEXT\x20PRIMARY\x20KEY)');});const igaccountsPath=path['resolve'](__dirname,'data/igaccounts.db'),igaccountsDB=new sqlite3['Database'](igaccountsPath);igaccountsDB['serialize'](()=>{igaccountsDB['run']('CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20accounts\x20(username\x20TEXT\x20PRIMARY\x20KEY,\x20password\x20TEXT,\x20cookie\x20TEXT)');});async function setCookiesForUser(_0x5f03e2,_0xf86a4){try{const _0x22bfe7=await new Promise((_0x4393cc,_0x23a01a)=>{igaccountsDB['all']('SELECT\x20cookie\x20FROM\x20accounts\x20WHERE\x20username=?',[_0xf86a4],(_0x5eadd1,_0x41ca35)=>{if(_0x5eadd1)_0x23a01a(_0x5eadd1);else{if(_0x41ca35['length']>0x0){let _0x542738=JSON['parse'](_0x41ca35[0x0]['cookie']);console['log'](_0x542738),_0x4393cc(_0x542738);}else _0x23a01a(new Error('User\x20with\x20username\x20'+_0xf86a4+'\x20does\x20not\x20exist.'));}});});await _0x5f03e2['setCookie'](..._0x22bfe7),console['log']('Cookies\x20were\x20successfully\x20added.');}catch(_0x39f52f){console['log']('Cookies\x20konnten\x20nicht\x20hinzugefügt\x20werden:\x20'+_0x39f52f);}}async function saveCookiesForUser(_0x5bb105,_0x3d4988){try{let _0x48bf71=await _0x5bb105['cookies']();_0x48bf71=JSON['stringify'](_0x48bf71),igaccountsDB['get']('SELECT\x20username\x20FROM\x20accounts\x20WHERE\x20username\x20=\x20?',[_0x3d4988],(_0x3de7bf,_0x2b866b)=>{if(_0x3de7bf){console['error']('Error\x20checking\x20user\x20existence:',_0x3de7bf);throw _0x3de7bf;}else{if(_0x2b866b){const _0x46c2e1=igaccountsDB['prepare']('UPDATE\x20accounts\x20SET\x20cookie\x20=\x20?\x20WHERE\x20username\x20=\x20?');_0x46c2e1['run'](_0x48bf71,_0x3d4988,function(_0x32eab4){_0x32eab4?console['error']('Error\x20updating\x20cookies:',_0x32eab4):console['log']('Cookies\x20updated\x20for\x20user:',_0x3d4988);});}else{const _0x10650a=igaccountsDB['prepare']('INSERT\x20INTO\x20accounts\x20(username,\x20cookie)\x20VALUES\x20(?,\x20?)');_0x10650a['run'](_0x3d4988,_0x48bf71,function(_0x3775db){_0x3775db?console['error']('Error\x20inserting\x20new\x20user\x20and\x20cookies:',_0x3775db):console['log']('New\x20user\x20created\x20and\x20cookies\x20saved\x20for\x20user:',_0x3d4988);});}}});}catch(_0x40a80e){console['error']('Error\x20fetching\x20cookies:',_0x40a80e);throw _0x40a80e;}}async function createUserIfNotExists(_0x5c581e,_0x14bc1a){try{igaccountsDB['get']('SELECT\x20username\x20FROM\x20accounts\x20WHERE\x20username\x20=\x20?',[_0x5c581e],(_0xb969a,_0x3a3f43)=>{if(_0xb969a){console['error']('Error\x20checking\x20user\x20existence:',_0xb969a);throw _0xb969a;}else{if(!_0x3a3f43){const _0x5e322b=igaccountsDB['prepare']('INSERT\x20INTO\x20accounts\x20(username,\x20password)\x20VALUES\x20(?,\x20?)');_0x5e322b['run'](_0x5c581e,_0x14bc1a,function(_0x12ecfc){_0x12ecfc?console['error']('Error\x20inserting\x20new\x20user:',_0x12ecfc):console['log']('New\x20user\x20created:',_0x5c581e);});}else console['log']('User\x20already\x20exists:',_0x5c581e);}});}catch(_0x20cbde){console['error']('Error\x20creating\x20user:',_0x20cbde);throw _0x20cbde;}}ipcMain['handle']('create-relation',async(_0x47aa94,_0x2afe05)=>{return new Promise((_0x5a8d5f,_0x34e079)=>{const _0x2c8d52='CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20'+_0x2afe05+'\x20(username\x20TEXT\x20PRIMARY\x20KEY)';db['run'](_0x2c8d52,function(_0x16ef18){_0x16ef18?_0x34e079(_0x16ef18):_0x5a8d5f({'status':'success'});});});}),ipcMain['handle']('delete-relation',async(_0x146e94,_0x527b34)=>{return console['log']('droping\x20table'+_0x527b34),new Promise((_0x143353,_0x36cf4a)=>{const _0x235cc1='DROP\x20TABLE\x20IF\x20EXISTS\x20'+_0x527b34;console['log']('droping\x20table'+_0x527b34),db['run'](_0x235cc1,function(_0x3d791b){_0x3d791b?_0x36cf4a(_0x3d791b):_0x143353({'status':'success'});});});}),ipcMain['handle']('get-relations',async _0x570dac=>{return new Promise((_0x20803e,_0x91285d)=>{const _0x292613='SELECT\x20name\x20FROM\x20sqlite_master\x20WHERE\x20type=\x27table\x27';db['all'](_0x292613,[],(_0x49c64d,_0x54a261)=>{_0x49c64d?_0x91285d(_0x49c64d):_0x20803e(_0x54a261['map'](_0x4b5778=>_0x4b5778['name']));});});}),ipcMain['handle']('add-user',async(_0x232bd1,_0x32102b,_0x5747a0)=>{return new Promise(_0x39f2f4=>{const _0x48183f=db['prepare']('INSERT\x20INTO\x20'+_0x5747a0+'\x20(username)\x20VALUES\x20(?)');_0x48183f['run'](_0x32102b,function(_0x2bb029){_0x2bb029?console['log']('error\x20in\x20add-user:'+_0x2bb029):_0x39f2f4({'status':'success','id':this['lastID']});}),_0x48183f['finalize']();});}),ipcMain['handle']('get-users',async()=>{return new Promise((_0x259550,_0x5e0ce5)=>{db['all']('SELECT\x20*\x20FROM\x20leads',(_0x8d7a18,_0xd9ceb5)=>{if(_0x8d7a18)_0x5e0ce5(_0x8d7a18);else{_0x259550({'status':'success','users':_0xd9ceb5});for(_0xd9ceb5 of _0xd9ceb5){console['log'](_0xd9ceb5['username']);}}});});}),ipcMain['handle']('get-data',async(_0x8f6c1d,_0x2b3e84)=>{return new Promise((_0x5b2a4d,_0x2c4117)=>{const _0x587431='SELECT\x20*\x20FROM\x20'+_0x2b3e84;console['log'](_0x587431),db['all'](_0x587431,[],(_0xd9f0e0,_0x5469cc)=>{_0xd9f0e0?_0x2c4117(_0xd9f0e0):_0x5b2a4d(_0x5469cc);});});}),ipcMain['handle']('get-accounts',async _0x52fc9d=>{return new Promise((_0x5e7a7f,_0xb3247b)=>{const _0xa9b4d5='SELECT\x20*\x20FROM\x20accounts';console['log'](_0xa9b4d5),igaccountsDB['all'](_0xa9b4d5,[],(_0x32eb9c,_0x5f4925)=>{_0x32eb9c?_0xb3247b(_0x32eb9c):_0x5e7a7f(_0x5f4925);});});}),ipcMain['handle']('get-targets',async(_0x2aa05b,_0x4e9f86)=>{return getTargetProfiles(_0x4e9f86);}),ipcMain['handle']('delete-user',async(_0x8f5eea,_0x4094e7,_0x39bdfa)=>{return new Promise((_0x30f376,_0x2e07af)=>{const _0x30ad2e=db['prepare']('DELETE\x20FROM\x20'+_0x39bdfa+'\x20WHERE\x20username\x20=\x20?');_0x30ad2e['run'](_0x4094e7,function(_0x44b886){_0x44b886?_0x2e07af(_0x44b886):_0x30f376({'status':'success','changes':this['changes']});}),_0x30ad2e['finalize']();});}),ipcMain['handle']('delete-account',async(_0x479d9f,_0x831bb0)=>{const _0x37ee22=igaccountsDB['prepare']('DELETE\x20FROM\x20accounts\x20WHERE\x20username\x20=\x20?');_0x37ee22['run'](_0x831bb0,function(_0x475cd2){_0x475cd2&&console['log'](_0x475cd2);}),_0x37ee22['finalize']();});