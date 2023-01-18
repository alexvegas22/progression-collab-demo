<template>
	<v-navigation-drawer
		permanent
		expand-on-hover
		location="right"
		rail
	>
		<template v-slot:prepend>
			<v-list-item
				lines="one"
				prepend-icon="mdi-account-circle"
				:title="username">
			</v-list-item>
		</template>
		<v-divider></v-divider>
		<v-list
			density="compact"
			nav
		>
			<div v-for="menu,i in menus" :key="i">
				<v-list-group
					v-if="menu.sous_menus"
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
						:key="i"
						:title="item.title"
						:prepend-icon="item.icon"
						:value="item.value"
						v-on:click="item.action"
					/>
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
