import "../../styles/Settings.css";

function Settings() {

    return (

        <div className="settings-page">

            <div className="page-header">

                <h1>Settings</h1>

                <p>Manage your application preferences.</p>

            </div>

            <div className="settings-card">

                <div className="setting-row">

                    <span>Dark Theme</span>

                    <input type="checkbox" defaultChecked />

                </div>

                <div className="setting-row">

                    <span>Email Notifications</span>

                    <input type="checkbox" defaultChecked />

                </div>

                <div className="setting-row">

                    <span>Auto Backup</span>

                    <input type="checkbox" />

                </div>

                <button className="save-btn">

                    Save Settings

                </button>

            </div>

        </div>

    );

}

export default Settings;