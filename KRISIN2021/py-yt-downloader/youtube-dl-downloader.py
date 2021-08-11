from __future__ import unicode_literals;
import json;
import asyncio;
import youtube_dl;

class Logger(object):
    def debug(self, msg):
        print(msg);

    def warning(self, msg):
        print(msg);

    def error(self, msg):
        print(msg);

class Download_hook():
    def execute(self, data):
        print('下载进度：%s'%(data['_percent_str']));

class Finish_hook():
    def execute(self, data):
        print(data);

progressHookMap = {
    'downloading': Download_hook(),
    'finished': Finish_hook(),
};

def progress_hooks(data):
    status = data['status'];
    progressHookMap[status].execute(data);

loop = asyncio.get_event_loop();

async def async_download_task(video):
    ydlOpts = {
        'logger': Logger(),
        'progress_hooks': [progress_hooks],
        'outtmpl': f'download/{video["name"]}{video["ext"]}'
    };
    with youtube_dl.YoutubeDL(ydlOpts) as ydl:
        ydl.download([video['url']]);

async def run_download_tasks():
    with open('./video-map.json') as video_map:
        data = json.load(video_map);
        for video in data['videos']:
            print(f'下载 {video["name"]}{video["ext"]} 中');
            await async_download_task(video);
        else:
            loop.stop();

loop.run_until_complete(run_download_tasks());