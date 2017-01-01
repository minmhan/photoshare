module.exports = {
    newest: function(){
        var comments = [
            {
                imageid:1,
                email:'min@mail.com',
                name:'Min Min',
                gravatar:  'http://lorempixel.com/75/75/animals/1',
                comment:'this is comment 1',
                timestamp: Date.now(),
                image:{
                    uniqueid:1,
                    title: 'sample image',
                    description:'',
                    filename:'abc.jpg',
                    views:0,
                    likes:0,
                    timestamp:Date.now()
                }
            },{
                imageid:2,
                email:'min@mail.com',
                name:'Min Min',
                gravatar:  'http://lorempixel.com/75/75/animals/1',
                comment:'this is comment 1',
                timestamp: Date.now(),
                image:{
                    uniqueid:1,
                    title: 'sample image',
                    description:'',
                    filename:'abc.jpg',
                    views:0,
                    likes:0,
                    timestamp:Date.now()
                }
            }
        ];

        return comments;
    }
};