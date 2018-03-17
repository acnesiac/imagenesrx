import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class ProfilePage extends Component {
	state = {
	username: '',
	avatar: '',
	isUploading: false,
	progress: 0,
	avatarURL: ''
};

handleChangeUsername = (event) => this.setState({username: event.target.value});

handleUploadStart = () => this.setState({isUploading: true, progress: 0});

handleProgress = (progress) => this.setState({progress});

handleUploadError = (error) => {
	this.setState({isUploading: false});
	console.error(error);
}

handleUploadSuccess = (filename) => {
	this.setState({avatar: filename, progress: 100, isUploading: false});
	firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
};

render() {
	return (
		 <div className="home-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

			<form>
				<label>Username:</label>
				<input type="text" value={this.state.username} name="username" onChange={this.handleChangeUsername} />
				<label>Avatar:</label>
					{this.state.isUploading &&
				<p>Progress: {this.state.progress}</p>
				
				}
				{this.state.avatarURL &&
				<img src={this.state.avatarURL} />
				}

				 <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
				    Select your awesome avatar
							<FileUploader
							hidden
							storageRef={firebase.storage().ref('images')}
				    filename={file => this.state.username }

				accept="image/*"
				name="avatar"
				randomizeFilename
				onUploadStart={this.handleUploadStart}
				onUploadError={this.handleUploadError}
				onUploadSuccess={this.handleUploadSuccess}
				onProgress={this.handleProgress}
				/>
				</label>
			</form>
		</div>
		</div>
		</div>
		</div>

		</div>

	);
}
}
export default ProfilePage;