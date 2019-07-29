<template>
	<div id="app">
		<template>
			<SiteHeader ref="header"></SiteHeader>
			<section class="nav-container" ref="navContainer">
				<router-view/>
			</section>
			<SiteFooter ref="footer"></SiteFooter>
		</template>
	</div>
</template>

<script src="./app/app.js"></script>
<style src="./app/app.styl" lang="stylus"></style>