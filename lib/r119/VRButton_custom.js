
var VRButton_session,VRButton_device;

var VRButton = {

	createButton: function ( renderer, options ) {

		if ( options ) {

			console.error( 'THREE.VRButton: The "options" parameter has been removed. Please set the reference space type via renderer.xr.setReferenceSpaceType() instead.' );

		}

		function showEnterVR( /*device*/ ) {

			//_G.VR_XR_SUPPORTED = true; //!!!

			var currentSession = null;

			function onSessionStarted( session ) {

				VRButton_session = session; //!!! fw

				session.addEventListener( 'end', onSessionEnded );

				renderer.xr.setSession( session );
				button.textContent = 'EXIT VR';

				currentSession = session;

				_G.XR_SESSION = currentSession;

			}

			function onSessionEnded( /*event*/ ) {

				currentSession.removeEventListener( 'end', onSessionEnded );

				button.textContent = 'ENTER VR DDDANCE.PARTY';
				//_G.VR_XR_SUPPORTED = true; //!!!

				currentSession = null;

			}

			//

			button.style.display = '';

			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 170px)';
			button.style.width = '340px';

			button.textContent = 'ENTER VR DDDANCE.PARTY';
			//_G.VR_XR_SUPPORTED = true; //!!!

			button.onmouseenter = function () {

				button.style.opacity = '1.0';

			};

			button.onmouseleave = function () {

				button.style.opacity = '0.66';

			};

			button.onclick = function () {

				if ( currentSession === null ) {

					// WebXR's requestReferenceSpace only works if the corresponding feature
					// was requested at session creation time. For simplicity, just ask for
					// the interesting ones as optional features, but be aware that the
					// requestReferenceSpace call will fail if it turns out to be unavailable.
					// ('local' is always available for immersive sessions and doesn't need to
					// be requested separately.)

					var sessionInit = { optionalFeatures: [ 'local-floor', 'bounded-floor', 'hand-tracking' ] };
					navigator.xr.requestSession( 'immersive-vr', sessionInit ).then( onSessionStarted );

					if(_G.MYXR){ _G.MYXR.clicked_enter_vr(); } //!!!

				} else {

					currentSession.end();

				}

			};

		}

		function disableButton() {

			button.style.display = '';

			button.style.cursor = 'auto';
			button.style.left = 'calc(50% - 170px)';
			button.style.width = '340px';

			button.onmouseenter = null;
			button.onmouseleave = null;

			button.onclick = null;

		}

		function showWebXRNotFound() {

			disableButton();

			button.textContent = 'VR NOT SUPPORTED';
			//_G.VR_XR_SUPPORTED = false; //!!!

		}

		function stylizeElement( element ) {

			element.style.position = 'absolute';
			//element.style.bottom = '20px';
			element.style.top = 'calc(50% - 40px)';
			element.style.padding = '14px 6px';
			element.style.border = '2px solid #fff';
			//element.style.borderRadius = '6px';
			element.style.background = 'rgba(0,0,0,0.75)';
			element.style.color = '#fff';
			element.style.font = 'normal 20px sans-serif';
			element.style.textAlign = 'center';
			element.style.opacity = '0.75';
			element.style.outline = 'none';
			element.style.zIndex = '40';
			element.style.fontWeight = '600';
			//element.classList.add("pulser");

			element.id = 'vr-button'; //!!!

		}

		if ( 'xr' in navigator ) {

			var button = document.createElement( 'button' );
			button.id = 'VRButton';
			button.style.display = 'none';

			stylizeElement( button );

			navigator.xr.isSessionSupported( 'immersive-vr' ).then( function ( supported ) {

				supported ? showEnterVR() : showWebXRNotFound();

			} );

			return button;

		} else {

			var message = document.createElement( 'a' );

			if ( window.isSecureContext === false ) {

				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';
				//_G.VR_XR_SUPPORTED = false; //!!!

			}

			message.style.left = 'calc(50% - 170px)';
			message.style.width = '340px';
			message.style.textDecoration = 'none';

			stylizeElement( message );

			return message;

		}

	}

};

// export { VRButton };
