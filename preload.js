window['addEventListener']('DOMContentLoaded',()=>{const _0x288d48=(_0xcb2bd0,_0x44ae59)=>{const _0x51116d=document['getElementById'](_0xcb2bd0);if(_0x51116d)_0x51116d['innerText']=_0x44ae59;};for(const _0x3050ef of['chrome','node','electron']){_0x288d48(_0x3050ef+'-version',process['versions'][_0x3050ef]);}});const {contextBridge,ipcRenderer}=require('electron');contextBridge['exposeInMainWorld']('electronAPI',{'login':(_0x1fee6a,_0x5121f8)=>ipcRenderer['send']('login',_0x1fee6a,_0x5121f8),'sendMessage':(_0xd94bbc,_0x27d9a0,_0x2f97af,_0x299339)=>ipcRenderer['invoke']('sendMessage',_0xd94bbc,_0x27d9a0,_0x2f97af,_0x299339),'fetch_likes':(_0x260b8d,_0x102f0b=-0x1,_0x1c03f5,_0x3f562f)=>ipcRenderer['invoke']('fetch_likes',_0x260b8d,_0x102f0b,_0x1c03f5,_0x3f562f),'fetch_comments':(_0x10890c,_0xeb063=-0x1,_0x56781c,_0x15844b)=>ipcRenderer['invoke']('fetch_comments',_0x10890c,_0xeb063,_0x56781c,_0x15844b),'fetch_followers':(_0x1a537c,_0x53ae73=-0x1,_0x102451,_0x3c36ee)=>ipcRenderer['invoke']('fetch_followers',_0x1a537c,_0x53ae73,_0x102451,_0x3c36ee),'createRelation':_0x4dec2f=>ipcRenderer['invoke']('create-relation',_0x4dec2f),'deleteRelation':_0x3fdc88=>ipcRenderer['invoke']('delete-relation',_0x3fdc88),'getRelations':()=>ipcRenderer['invoke']('get-relations'),'addUser':(_0x35a05e,_0x53c284)=>ipcRenderer['invoke']('add-user',_0x35a05e,_0x53c284),'getUsers':()=>ipcRenderer['invoke']('get-users'),'getData':_0x5e1d85=>ipcRenderer['invoke']('get-data',_0x5e1d85),'deleteUser':(_0x41b232,_0x201fce)=>ipcRenderer['invoke']('delete-user',_0x41b232,_0x201fce),'getTargets':_0x53d970=>ipcRenderer['invoke']('get-targets',_0x53d970),'getAccounts':()=>ipcRenderer['invoke']('get-accounts'),'deleteAccount':_0x2b6fd8=>ipcRenderer['invoke']('delete-account',_0x2b6fd8),'stopAction':()=>ipcRenderer['invoke']('stop-action')});