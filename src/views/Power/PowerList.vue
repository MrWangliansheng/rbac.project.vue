<template>
    <div>
        <div>
            <el-button type="success" @click="dialogFormVisible = true" plain>添加</el-button>
        </div>
        <div>
            <el-table :data="powerlist" style="width: 100%" row-key="powerId" border lazy :load="load"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" tooltip-effect="dark">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="powerName" label="名称">
                </el-table-column>
                <el-table-column prop="powerIcon" label="图标">
                    <template slot-scope="scope">
                        <i :class="scope.row.powerIcon"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="powerRoute" label="菜单路由"></el-table-column>
                <el-table-column prop="powerAPIUrl" label="接口路由"></el-table-column>
                <el-table-column prop="routeName" label="路由名称"></el-table-column>
                <el-table-column prop="powerRedirect" label="重定向路由"></el-table-column>
                <el-table-column prop="powerDesc" label="菜单描述"></el-table-column>
                <el-table-column prop="powerType" label="菜单类型">
                    <template slot-scope='scope'>
                        <span v-for="item in typelist" :key="item.id" v-if="scope.row.powerType == item.id">{{ item.name
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="powerTime" label="创建日期">
                    <template slot-scope="scope">
                        {{ scope.row.powerTime.replace("T", " ") }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <span v-for="item in buttonlist">
                                <el-button @click=" powerid = scope.row.powerId, EditVisible = true" type="text"
                                    size="small" v-if="item.powerName == '修改菜单'">编辑</el-button>
                                <el-button type="text" size="small" @click="DeletePower(scope.row.powerId)"
                                    style="color: red;" v-if="item.powerName == '删除菜单'">删除</el-button>
                                <el-button type="text" size="small"
                                    v-if="scope.row.powerType != 3 && item.powerName == '添加子菜单'"
                                    style="color: rgb(108, 34, 135);"
                                    @click="disbales = true, powerid = scope.row.powerId, dialogFormVisible = true">添加子菜单</el-button>
                            </span>

                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">...</el-tag>
                            </div>
                        </el-popover>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-dialog title="添加权限菜单" :visible.sync="dialogFormVisible" :modal="false">
                <PowerCreatre :key="new Date().getTime()" :disbales="disbales" :id="powerid" @Create="Visible">
                </PowerCreatre>
            </el-dialog>
        </div>
        <div>
            <el-dialog title="修改权限菜单" :visible.sync="EditVisible" :modal="false">
                <PowerEdit :key="new Date().getTime()" :id="powerid" @Update="Visible">
                </PowerEdit>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { GetPowerTreeTableLevelone, LogicDeleteAsync, GetPowerEnum } from "@/api/power"
import PowerCreatre from "./PowerCreatre.vue"
import PowerEdit from "./PowerEdit.vue"
import { GetRolePowerButton } from "@/api/role"
export default {
    components: {
        PowerCreatre,
        PowerEdit
    },
    name: 'APP',
    data() {
        return {
            typelist: [],
            buttonlist: [],
            dialogFormVisible: false,
            disbales: 0,
            powerlist: [],
            powerid: "",
            EditVisible: false,
        }
    },
    methods: {
        GetPowerTreeTableLevel() {
            GetPowerTreeTableLevelone(0).then(d => {
                this.powerlist = d.data;
            }).catch(err => {
                console.log(err);
            })
        },
        load(tree, treeNode, resolve) {
            // console.log(tree)
            // console.log(treeNode)
            // console.log(resolve)
        },
        Visible() {
            this.dialogFormVisible = false;
            this.EditVisible = false;
            this.GetPowerTreeTableLevel();
        }, DeletePower(id) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                LogicDeleteAsync(id).then(d => {
                    if (d.result == 200) {
                        this.$message.success(d.message)
                        this.GetPowerTreeTableLevel();
                    } else {
                        this.$message.error(d.message)
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        GetRolePowerButton() {
            GetRolePowerButton({
                id: Number(this.$ls.get("UserId")),
                state: 3
            }).then(d => {
                this.buttonlist = d.data;
            }).catch(error => {
                console.log(error)
            })
        },
        GetPowerEnumList() {
            GetPowerEnum().then(d => {
                this.typelist = d.data;
            })
        },
    },
    created() {
        this.GetPowerTreeTableLevel();
        this.GetRolePowerButton();
        this.GetPowerEnumList();
    },
    mounted() {
    },
}
</script>
<style lang="scss" scoped></style>
