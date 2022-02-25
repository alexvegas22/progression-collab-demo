<template>
	<div style="flex-grow: 1;">
		<div class="container p-0">
			<div class="row align-items-end" style="height: 0px">
				<div class="col"></div>
				<div class="col-auto">
					<div class="form-check form-switch btn-thème" présentation_étape="1.0" id="testeurx">
						<input class="form-check-input" type="checkbox" id="btn_thème" name="btn_thème" v-model="thèmeSombre" />
						<label class="form-check-label" for="btn_thème">🕶</label>
					</div>
				</div>
				<div class="col-auto" v-if="rôleÉditeur">
					<div class="form-check form-switch btn-xray">
						<input class="form-check-input" type="checkbox" id="btn_xray" name="btn_xray" v-model="xray" />
						<label class="form-check-label" for="btn_xray">Tout voir</label>
					</div>
				</div>
			</div>
		</div>

		<div class="container-fluid p-0 h-100">
				<div class="row align-items-end" style="height: 0px">
					<div class="col" ></div>
				<div class="col-auto" :class="classeIndicateur">●</div>
			</div>
			
      <v-code-mirror présentation_étape="1.1"
        id="editor"
        style="height: 99%;"
        :value="code"
        :mode="mode"
        :theme="thème"
        :xray="xray"
        @update:value="onChange"
      />
		</div>	
	</div>
</template>

<script src="./editeur.js"></script>

<style src="./editeur.css"></style>