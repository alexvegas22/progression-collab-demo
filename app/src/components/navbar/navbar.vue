<template>
	<v-navigation-drawer
		expand-on-hover
		location="right"
		:rail="drawer"
		:permanent="drawer"
		v-on:update:rail="onUpdateRail"
	>
		<v-list
			density="compact"
			nav
		>
			<div v-for="menu,i in menus" :key="i">
				<v-list-group
					v-if="menu.sous_menus"
					:value="menu.value"
				>
					<template v-slot:activator="{props}">
						<v-list-item
							:title="menu.title"
							:prepend-icon="menu.icon"
							v-bind="props">
						</v-list-item>
					</template>

					<v-list-item
						v-for="item, i in menu.sous_menus"
						:style="item.activé!==false ? '' : 'display:none'"
						:key="i"
						:title="item.title"
						:value="item.value"
						v-on:click="item.action"
					>
					</v-list-item>

				</v-list-group>
				<v-list-item v-else
					:title="menu.title"
					:prepend-icon="menu.icon"
					v-on:click="menu.action"
				/>
			</div>
		</v-list>
	</v-navigation-drawer>

</template>

<script src="./navbar.js"/>
