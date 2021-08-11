from __future__ import unicode_literals;
import json;
import asyncio;
from pytube import YouTube;
from pytube.cli import on_progress;

loop = asyncio.get_event_loop();

async def async_download_task(video):
    url = video['url'];
    filename = f'{video["name"]}{video["ext"]}';
    yt = YouTube(url, on_progress_callback=on_progress);
    yt.streams.filter(progressive=True, file_extension='mp4').first().download(output_path='download', filename=filename);
    print('下载完成！');

async def run_download_tasks():
    with open('./video-map.json') as video_map:
        data = json.load(video_map);
        for video in data['videos']:
            print(f'下载 {video["name"]}{video["ext"]} 中');
            await async_download_task(video);
        else:
            loop.stop();

loop.run_until_complete(run_download_tasks());