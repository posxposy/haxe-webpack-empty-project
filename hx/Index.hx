package;
import js.Browser;

final class Index {
	static function main():Void {
		Webpack.require('./../src/styles/main.scss');
		Browser.alert("Hello, website!");
	}
}