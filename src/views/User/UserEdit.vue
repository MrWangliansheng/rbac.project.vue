<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="24">
                <el-col :span="8">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="邮箱" prop="userEmail">
                        <el-input v-model="ruleForm.userEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="真实姓名" prop="pullName">
                        <el-input v-model="ruleForm.pullName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="9">
                    <el-form-item label="状态" prop="userState">
                        <el-radio-group v-model="ruleForm.userState">
                            <el-radio :label="true">启用</el-radio>
                            <el-radio :label="false">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="角色" prop="roleId">
                        <el-cascader :options="treelist" v-model="roleId" @change="GetValue"
                            :props="{ multiple: true, checkStrictly: true }" clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="头像" prop="userImg">
                        <el-upload class="avatar-uploader" action="http://localhost:5000/api/File/ImgUp"
                            :show-file-list="false" :on-success="handleAvatarSuccess">
                            <img v-if="ruleForm.userImg" :src="'http://localhost:5000/img/' + ruleForm.userImg"
                                class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24" :offset="0">
                    <div style="border: 1px solid #ccc;width: 100%;">
                        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                            :mode="mode" />
                        <Editor style="height: 500px; overflow-y: hidden;" v-model="ruleForm.userDesc"
                            :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
                    </div>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="UpdateUser('ruleForm')">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { GetRoleTree } from "@/api/role";
import axios from "@/utils/request";
import { UpdateUser } from "@/api/admin"
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import Vue from 'vue'
export default Vue.extend({
    components: { Editor, Toolbar },
    props: {
        id: Number
    },
    name: 'APP',
    data() {
        return {
            //富文本编译器变量
            editor: null,
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
            roleId: [],

            treelist: [],
            ruleForm: {
                userName: '',
                fullName: "",
                userEmail: '',
                userPassword: '',
                userPasswords: '',
                userState: '',
                userImg: "",
                userDesc: "",
                lastLoginIP: ":IP",
                roleId: [],
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                fullName: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' }
                ],
                roleId: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                userState: [
                    { required: true, message: '请选择用户状态', trigger: 'change' }
                ],
                userEmail: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
                userImg: [
                    { required: true, message: '上传用户头像', trigger: 'change' }
                ],
                userDesc: [
                    { required: true, message: '请添加用户描述', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleAvatarSuccess(res, file) {
            console.log(res.message)
            if (res.result != 200) {
                this.$message.error(res.message);
                return;
            }
            this.ruleForm.userImg = res.message;
        },
        EditUser(id) {
            console.log(id);
            axios({
                method: "get",
                url: "/User/EditUser?id=" + id
            }).then(d => {
                console.log(d)
                this.ruleForm = d.data;
            })
        },
        //修改用户信息
        UpdateUser(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    UpdateUser(this.ruleForm).then(d => {
                        if (d.result == 200) {
                            this.$message.success(d.message);
                            setTimeout(() => {
                                this.$emit("dialogFormVisible", false)
                            }, 1000)

                        } else {
                            this.$message.error(d.message);
                        }
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        GetRoleTree() {
            GetRoleTree().then(d => {
                this.treelist = d.data;
            })
        },
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        GetValue(val) {
            this.ruleForm.roleId = [];
            console.log(val);
            debugger
            val.forEach(item => {
                // item.forEach(item1 => {
                //     debugger
                // })
                var index = item.length;
                this.ruleForm.roleId.push(item[index - 1])
                console.log(item);
            })
            console.log(this.ruleForm.roleId);
        }
    },
    created() {
        this.EditUser(this.id);
        this.GetRoleTree();
        this.mode = "asokdjhoak";
    },
    mounted() {
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
})
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}

.avatar {
    width: 80px;
    height: 80px;
    display: block;
}
</style>
