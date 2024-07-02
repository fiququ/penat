import { VRButton } from './libs/VRButton.js';

class CustomVRButton {
    static createButton(renderer) {
        const button = document.createElement('button');

        function showEnterVR() {
            button.style.display = '';
            button.style.position = 'absolute';
            button.style.left = '50%';
            button.style.top = '50%';
            button.style.transform = 'translate(-50%, -50%)';
            button.style.padding = '20px';
            button.style.fontSize = '20px';
            button.style.backgroundColor = '#000';
            button.style.color = '#fff';
            button.style.border = 'none';
            button.style.borderRadius = '10px';
            button.style.cursor = 'pointer';
            button.textContent = 'Enter VR';

            button.onclick = function () {
                button.style.display = 'none';
                renderer.xr.enabled = true;
                const session = renderer.xr.getSession();
                if (session) {
                    session.then(function (session) {
                        session.addEventListener('end', function () {
                            button.style.display = '';
                        });
                    });
                } else {
                    console.error('WebXR session is null or undefined');
                }
            };
        }

        function showVRNotSupported() {
            button.style.display = '';
            button.style.position = 'absolute';
            button.style.left = '50%';
            button.style.top = '50%';
            button.style.transform = 'translate(-50%, -50%)';
            button.style.padding = '20px';
            button.style.fontSize = '20px';
            button.style.backgroundColor = '#000';
            button.style.color = '#fff';
            button.style.border = 'none';
            button.style.borderRadius = '10px';
            button.textContent = 'VR NOT SUPPORTED';
            button.disabled = true;
        }

        if ('xr' in navigator) {
            navigator.xr.isSessionSupported('immersive-vr').then(function (supported) {
                supported ? showEnterVR() : showVRNotSupported();
            });
        } else {
            showVRNotSupported();
        }

        return button;
    }
}

export { CustomVRButton };
