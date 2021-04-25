var a = [
    {
        name: '1',
        key1: '1'
    },
    {
        name: '2',
        key1: '2'
    },
    {
        name: '3',
        key1: '3'
    },
    {
        name: '4',
        key1: '4'
    },
    {
        name: '5',
        key1: '5'
    }
];

var b = [
    {
        name: '1',
        key2: '11'
    },
    {
        name: '2',
        key2: '22'
    },
    {
        name: '3',
        key2: '33'
    },
    {
        name: '4',
        key2: '44'
    },
    {
        name: '6',
        key2: '6'
    }
];

var c = [];
a.forEach(aa => {
    var res = b.find(bb => bb.name === aa.name);
    if (res) {
        c.push({
            ...res,
            ...aa
        });
    };
});

console.log(c);