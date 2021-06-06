(function() {
	window.Main = {};
	Main.Page = (function() {
		var mosq = null;
		function Page() {
			var _this = this;
			mosq = new Mosquitto();

			$('#connect-button').click(function() {
				return _this.connect();
			});
			$('#disconnect-button').click(function() {
				return _this.disconnect();
			});
			$('#subscribe-button').click(function() {
				return _this.subscribe();
			});
			$('#unsubscribe-button').click(function() {
				return _this.unsubscribe();
			});
			$('#publish-button').click(function() {
				return _this.publish();
			});

			var log=function(t){
				var p = document.createElement("p");
				p.innerHTML = t;
				$("#debug").append(p);
			}

			mosq.onconnect = function(rc){
				log("CONNACK " + rc);
				log("subscribe tasmota....")
				_this.subscribe("3095809834539058/#")
			};
			mosq.ondisconnect = function(rc){
				var p = document.createElement("p");
				p.innerHTML = "Lost connection";
				$("#debug").append(p);
			};
			mosq.onmessage = function(topic, payload, qos){
				var p = document.createElement("p");
				p.innerHTML = "PUBLISH " + topic + " " + payload;
				$("#debug").append(p);
			};
			log("connecting....");
			_this.connect();

		}
		Page.prototype.connect = function(){
			var url = "ws://test.mosquitto.org:8080/mqtt";
			mosq.connect(url);
		};
		Page.prototype.disconnect = function(){
			mosq.disconnect();
		};
		Page.prototype.subscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.subscribe(topic, 0);
		};
		Page.prototype.unsubscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.unsubscribe(topic);
		};
		Page.prototype.publish = function(){
			var topic = $('#pub-topic-text')[0].value;
			var payload = $('#payload-text')[0].value;
			mosq.publish(topic, payload, 0);
		};
		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page;
	});

}).call(this);
