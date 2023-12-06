const APP_ID='a880fa50e43a45a5b40bea441c7eb33f'
const CHANNEL='myvideo'
const TOKEN='007eJxTYOC9y7PQKun8n69HtU+53Jx/o2byJunZPptOPtB4Z2o7sfWlAkOihYVBWqKpQaqJcaKJaaJpkolBUmqiiYlhsnlqkrFxmrtcfmpDICNDdeYzZkYGCATx2RlyK8syU1LzGRgAaaoi5g=='
let UID;
const client=AgoraRTC.createClient({mode:'rtc',codec:'vp8'})

let localTracks=[]
let remoteusers={}

    client.on('user-published', handleUserJoined)


    UID=await client.join(APP_ID,CHANNEL,TOKEN,null)
    localTracks =await AgoraRTC.createMicrophoneAndCameraTracks()

    

    let player = `<div class="video-container" id="user-container-${UID}">
    <div class="username-wrapper"><span class="user-name">My Name</span></div>
    <div class="video-player" id="user-${UID}"></div>
    </div>`;

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);
    localTracks[1].play(`user-${UID}`);

    await client.publish([localTracks[0],localTracks[1]])
}


let handleUserJoined=async(user,mediaType)=>{
    remoteusers[user.uid]=user
    await client.subscribe(user,mediaType)

    if(mediaType === 'video'){
        let player=document.getElementById(`user-container-${user.uid}`)
        if(player!=null){
            player.remove()
        }
         player = `<div class="video-container" id="user-container-${user.uid}">
                <div class="username-wrapper"><span class="user-name">My Name</span></div>
                <div class="video-player" id="user-${user.uid}"></div>
                </div>`

        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);
        user.videoTrack.play(`user-${user.uid}`)
    }

    if(mediaType === 'audio'){
        user.audioTrack.play()
    }
}


joinAndDisplayLocalStream()
