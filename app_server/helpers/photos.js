module.exports = {
    popular: function(){
        var images = [
            {
                uniqueid:1,
                title:'sample title 1',
                description: 'desc',
                filename: 'abc.jpg',
                views:0,
                likes:0,
                timestamp: Date.now()
            },{
                uniqueid:2,
                title:'sample title 2',
                description: 'desc',
                filename: 'abc.jpg',
                views:0,
                likes:0,
                timestamp: Date.now()
            },{
                uniqueid:3,
                title:'sample title 3',
                description: 'desc',
                filename: 'abc.jpg',
                views:0,
                likes:0,
                timestamp: Date.now()
            },{
                uniqueid:4,
                title:'sample title 4',
                description: 'desc',
                filename: 'abc.jpg',
                views:0,
                likes:0,
                timestamp: Date.now()
            },
        ];

        return images;
    }
}