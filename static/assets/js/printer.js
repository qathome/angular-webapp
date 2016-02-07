/**
 * Created by tonegas on 13/12/15.
 */

function getAndPrintTicket() {
    var self = this;
    $('#wait').fadeIn();
    $('#button').hide();
    var params = {
        type: 'N',
        queue_choices: $(self).attr('letter')
    };
    console.log('ajax:' + $(self).attr('letter'));
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            var csrftoken = $.cookie('csrftoken');
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    });
    $.ajax({
        type: "POST",
        url: ticket_url,
        data: params,
        success: function (response) {
            printTicket(response,{
                onError:function(message){
                    $('#wait').hide();
                    var msg = 'Status:' + message.status + ' ResponseText:' + message.responseText;
                    $("#error").fadeIn(function(){
                        if(message.status == 0){
                            $(this).find('#error-type').text("Asura non presente");
                        }else{
                            $(this).find('#error-type').text(msg);
                        }
                    }).delay(3000).fadeOut(function(){
                        $('#button').fadeIn();
                    });
                    $(self).one('click',getAndPrintTicket);
                },
                onReceive:function(message){
                    $('#wait').hide();
                    $('#button').fadeIn();
                    $(self).one('click',getAndPrintTicket);
                }
            });
            console.log('draw:' + $(self).attr('letter'));
        },
        error:function(response){
            console.log('draw:' + $(self).attr('letter'));
            $('#wait').hide();
            $("#error").fadeIn(function(){
                if(response['responseJSON']) {
                    $(this).find('#error-type').text(response['responseJSON']['detail']);
                }
            }).delay(3000).fadeOut("fast",function(){
                $(self).one('click',getAndPrintTicket);
            });
            $('#button').fadeIn();
        }
    });
}

function updateView(){
    $.ajax({
        type: "GET",
        url: firm_view_url,
        timeout: 60000,
        success: function (response) {
            queues = response['queues'];
            firm = response;
            $.each(queues,function(num,queue){
                var elem = $("[letter='"+queue.letter+"']");
                if(queue.state == 'O' && firm.state == 'O' && queue.can_take_ticket_now){
                    $(elem).addClass('btn-myprimary nowticket').removeClass('disabled');
                    $(elem).find('.close_btn').css('display','none');
                    $(elem).find('.open_btn').css('display','block');
                    $(elem).off().one("click",getAndPrintTicket);
                }else {
                    $(elem).addClass('disabled').removeClass('btn-myprimary nowticket');
                    $(elem).find('.open_btn').css('display', 'none');
                    $(elem).find('.close_btn').css('display', 'block');
                    $(elem).unbind("click",getAndPrintTicket);
                }
            });
            window.setTimeout(updateView, 1000);
        },
        error:function(response){
            window.setTimeout(updateView, 10000);
        }
    });
}

function loadFirm() {
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            var csrftoken = $.cookie('csrftoken');
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    });
    updateView();
}

$(document).ready(function() {
    if (typeof androidprinter === 'undefined') {
        $.getScript("/static/asura/js/StarWebPrintBuilder.js", function (data, textStatus, jqxhr) {
            console.log(data); // Data returned
            console.log(textStatus); // Success
            console.log(jqxhr.status); // 200
            console.log("Load was performed.");
        });
        $.getScript("/static/asura/js/StarWebPrintTrader.js", function (data, textStatus, jqxhr) {
            console.log(data); // Data returned
            console.log(textStatus); // Success
            console.log(jqxhr.status); // 200
            console.log("Load was performed.");
        });
        $.getScript("/static/asura/js/myasura.js", function (data, textStatus, jqxhr) {
            console.log(data); // Data returned
            console.log(textStatus); // Success
            console.log(jqxhr.status); // 200
            console.log("Load was performed.");
        });
    }else{
        $.getScript("/static/androidprinter/js/myandroidprinter.js", function (data, textStatus, jqxhr) {
            console.log(data); // Data returned
            console.log(textStatus); // Success
            console.log(jqxhr.status); // 200
            console.log("Load was performed.");
        });
    }
    window.setTimeout(loadFirm, 1000);
});