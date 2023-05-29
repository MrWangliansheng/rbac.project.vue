<template>
    <div>
        <div>
            <el-button type="success" @click="dialogFormVisible = true" plain>添加</el-button>
        </div>
        <div>
            <el-table :data="powerlist" style="width: 100%" row-key="powerId" border lazy :load="load"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="powerName" label="名称"></el-table-column>
                <el-table-column prop="powerRoute" label="路由"></el-table-column>
                <el-table-column prop="powerDesc" label="菜单描述"></el-table-column>
                <el-table-column prop="powerTime" label="创建日期">
                    <template slot-scope="scope">
                        {{ scope.row.powerTime.replace("T", " ") }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog title="添加权限菜单" :visible.sync="dialogFormVisible" :modal="false">
                <PowerCreatre></PowerCreatre>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { GetPowerTreeTableLevelone } from "@/api/power"
import PowerCreatre from "./PowerCreatre.vue"
export default {
    components: {
        PowerCreatre
    },
    name: 'APP',
    data() {
        return {
            dialogFormVisible: false,
            powerlist: [],
        }
    },
    methods: {
        GetPowerTreeTableLevel() {
            GetPowerTreeTableLevelone(0).then(d => {
                this.powerlist = d.data;
            })
        },
        load(tree, treeNode, resolve) {
            console.log(tree)
            console.log(treeNode)
            console.log(resolve)
        }
    },
    created() {
        this.GetPowerTreeTableLevel();
    },
    mounted() {
    },
}
</script>
<style lang="scss" scoped></style>
