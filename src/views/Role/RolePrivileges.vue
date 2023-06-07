<template>
    <div>
        <el-tree :data="prowlist" icon-class="el-icon-thumb" :check-strictly="true" show-checkbox default-expand-all
            node-key="value" ref="tree" highlight-current>
        </el-tree>
        <!-- <div class="buttons">
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        </div> -->
    </div>
</template>
<script>
import { GetPowerTree } from "@/api/power";
import { RoleEdit } from "@/api/role"
export default {
    props: {
        id: Number
    },
    name: 'APP',
    data() {
        return {
            prowlist: [],
        }
    },
    methods: {
        GetPowerTreeList() {
            GetPowerTree().then(d => {
                this.prowlist = d.data;
            })
        },
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },
        Edit() {
            RoleEdit(this.id).then(d => {
                // console.log(d.data);
                this.ruleForm = d.data;
                this.$refs.tree.setCheckedKeys(d.data.powerId, true);
                // console.log(this.$refs.tree)
            })
        }
    },
    created() {
        this.GetPowerTreeList();
        this.Edit();
    },
    mounted() {
    },
}
</script>
<style lang="scss" scoped></style>
