import React = require('react');

export class CmMathjaxMacros extends React.Component<{}, {}> {
	render() {
		return <div className="mathjax-macros">
			<script type="math/tex">
				{this.props.children}
			</script>
		</div>
	}
}