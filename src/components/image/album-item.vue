<template>
	<li
		class="list-group-item list-group-item-action d-flex align-items-center"
		style="cursor: pointer"
		:class="{'active sum-active':active}"
		@click.stop="$emit('change', index)"
	>
		{{item.name}}
		<span class="btn btn-light btn-sm border ml-auto" v-if="!showOption">
			{{item.num}}
		</span>
		<el-dropdown class="ml-auto" v-else>
			<span class="btn btn-light btn-sm">
				{{item.num}}
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.stop.native="$emit('edit', {item,index})">修改</el-dropdown-item>
				<el-dropdown-item @click.stop.native="$emit('del', index)">删除</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</li>
</template>

<script>
export default {
	props: {
		item: Object,
        index: Number,
		showOption: {
			type: Boolean,
			default: true
		},
        active: {
            type: Boolean,
            default: false
        }
	},
	data() {
		return {

		}
    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
</style>

