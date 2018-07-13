$(document).ready(function(){
    const ApiUrl = "http://localhost/api/q/api.php";
    load_list()

    function load_list(){
        var topicList=[];
        var sourceList=[];

        var ApiToken = "quotes-for-life-21234343dfrf23w";
        
        var inputs1 = new FormData();
        inputs1.append("TOKEN", ApiToken);
        inputs1.append("TYPE", "source");
        inputs1.append("ACTION", "getFullList");

        var inputs2 = new FormData();
        inputs2.append("TOKEN", ApiToken);
        inputs2.append("TYPE", "topic");
        inputs2.append("ACTION", "getFullList");
        
        fetch(ApiUrl, { 
            method: 'POST',
            body: inputs1
        })
        .then((res)=>res.json())
        .then((resJSON)=>{ 
            console.log(resJSON.RESULT);
            resJSON.RESULT.forEach((item)=>{
                $('#sourceList').append('<option value="'+item.sID+'">'+item.source+'</option>')
            });
        })
        .catch((err)=>{
            alert(err);
        });

        fetch(ApiUrl, { 
            method: 'POST',
            body: inputs2
        })
        .then((res)=>res.json())
        .then((resJSON)=>{ 
            resJSON.RESULT.forEach((item)=>{
                $('#topicList').append('<option value="'+item.tID+'">'+item.topic+'</option>')
            });
        })
        .catch((err)=>{
            alert(err);
        });
    }

    $(document).on('submit','.form',function(e){
        e.preventDefault();
        
        var inputs = new FormData();
        inputs.append("TOKEN", $('#token').val());
        inputs.append("ACTION", "addNew");

        var form = $(this);

        switch(form.find('#type').val()){
            case 'addQuote':
                inputs.append("TYPE","quote");
                inputs.append("content",form.find('#content').val());
                inputs.append("source",form.find('#source').val());
                inputs.append("topic",form.find('#topic').val());
                break;
            case 'addSource':
                inputs.append("TYPE","source");    
                inputs.append("source",form.find('#source').val());
                break;
            case 'addTopic':
                inputs.append("TYPE","topic");    
                inputs.append("topic",form.find('#topic').val());
                break;
        }

        fetch(ApiUrl, { 
            method: 'POST',
            body: inputs
        })  
        .then((res)=>res.json())
        .then((resJSON)=>{ 
            alert(resJSON.RESULT.MESSAGE);
        })
        .catch((err)=>{
            alert(err);
        });

    })

})