var channelList = $("#channels");
var onlineBtn = $("#online");
var offlineBtn = $("#offline");
var allBtn = $("#all");
var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx",
              "RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "tr7k", "brunofin", "beyondthesummit"];

function getChannelInfo() {
  channels.forEach(function(channel) {
    function makeUrl(type, channelName) {
      return "https://api.twitch.tv/kraken/"+type+"/"+channelName+"?callback=?";
    }

    $.getJSON(makeUrl('streams', channel), function(streamData) {
      var status, game;

      if (streamData.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (streamData.stream === undefined) {
        game = "Account Closed";
        status = "closed";
      } else {
        game = streamData.stream.game;
        status = "online";
      }

      $.getJSON(makeUrl("channels", channel), function(channelData) {
        var logo = channelData.logo == null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/100px-No_image_available.svg.png" : channelData.logo;
        var name = channelData.display_name ? channelData.display_name : channel;

        var listItem = "<a target='_blank' href='"+channelData.url+"'><li class='"+status+" media'><div class='media-left'><img class='media-object' src='"+logo+"'></div><div class='media-body'><h1><strong>"+name+"</strong></h1><h2>"+game+"</h2></div></li></a>";
        status === "online" ? channelList.prepend(listItem) : channelList.append(listItem);
      });

    });


  });
}

$(document).ready(function() {
  getChannelInfo();
  online.on("click", function() {
    
  });
});
