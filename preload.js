window['addEventListener']('DOMContentLoaded',()=>{const _0x221019=(_0x284ddd,_0x1406af)=>{const _0x265175=document['getElementById'](_0x284ddd);if(_0x265175)_0x265175['innerText']=_0x1406af;};for(const _0x8f1a4e of['chrome','node','electron']){_0x221019(_0x8f1a4e+'-version',process['versions'][_0x8f1a4e]);}});const {contextBridge,ipcRenderer}=require('electron');contextBridge['exposeInMainWorld']('electronAPI',{'login':(_0x5267e7,_0x545461)=>ipcRenderer['send']('login',_0x5267e7,_0x545461),'sendMessage':(_0x567829,_0x10c06b,_0x6b0b9b,_0xea121,_0x35a8f7,_0x130807,_0x318a73)=>ipcRenderer['invoke']('sendMessage',_0x567829,_0x10c06b,_0x6b0b9b,_0xea121,_0x35a8f7,_0x130807,_0x318a73),'fetch_likes':(_0x197841,_0x10f86a=-0x1,_0x12f62a,_0x265803)=>ipcRenderer['invoke']('fetch_likes',_0x197841,_0x10f86a,_0x12f62a,_0x265803),'fetch_comments':(_0x151b76,_0x2cf9b9=-0x1,_0x55cd93,_0x35a652)=>ipcRenderer['invoke']('fetch_comments',_0x151b76,_0x2cf9b9,_0x55cd93,_0x35a652),'fetch_followers':(_0x3d9c0d,_0x14aee8=-0x1,_0xc88d3f,_0x3a297d)=>ipcRenderer['invoke']('fetch_followers',_0x3d9c0d,_0x14aee8,_0xc88d3f,_0x3a297d),'createRelation':_0x1cb986=>ipcRenderer['invoke']('create-relation',_0x1cb986),'deleteRelation':_0x144946=>ipcRenderer['invoke']('delete-relation',_0x144946),'getRelations':()=>ipcRenderer['invoke']('get-relations'),'addUser':(_0x2402b7,_0x46ae7f)=>ipcRenderer['invoke']('add-user',_0x2402b7,_0x46ae7f),'getUsers':()=>ipcRenderer['invoke']('get-users'),'getData':_0x371560=>ipcRenderer['invoke']('get-data',_0x371560),'deleteUser':(_0x545e44,_0x409560)=>ipcRenderer['invoke']('delete-user',_0x545e44,_0x409560),'getTargets':_0x3e86a7=>ipcRenderer['invoke']('get-targets',_0x3e86a7),'getAccounts':()=>ipcRenderer['invoke']('get-accounts'),'deleteAccount':_0x542ca3=>ipcRenderer['invoke']('delete-account',_0x542ca3),'stopAction':(_0x4a55f9=0x0)=>ipcRenderer['invoke']('stop-action',_0x4a55f9),'updateApp':()=>ipcRenderer['invoke']('update-app'),'getCampaigns':()=>ipcRenderer['invoke']('get-campaigns'),'createCampaign':_0x25d544=>ipcRenderer['invoke']('create-campaign',_0x25d544),'updateCampaign':(_0x513508,_0x2d871d,_0x46157d,_0x465058,_0x11a6d4)=>ipcRenderer['invoke']('update-campaign',_0x513508,_0x2d871d,_0x46157d,_0x465058,_0x11a6d4),'getLeadCount':_0x17d50d=>ipcRenderer['invoke']('get-lead_count',_0x17d50d),'getCampaignDetails':()=>ipcRenderer['invoke']('get-campaign-details'),'getCampaignWriterInformation':_0x1d1de6=>ipcRenderer['invoke']('get-campaign-writer-information',_0x1d1de6),'updateDM':(_0x2528fd,_0x13e682,_0x1edf80)=>ipcRenderer['invoke']('update-dm',_0x2528fd,_0x13e682,_0x1edf80),'getContactedCountThisMonth':()=>ipcRenderer['invoke']('get-contacted-count-this-month'),'getContactedCountToday':()=>ipcRenderer['invoke']('get-contacted-count-today')});