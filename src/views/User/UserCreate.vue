<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="24">
                <el-col :span="12" :offset="0">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="真实姓名" prop="pullName">
                        <el-input v-model="ruleForm.pullName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12" :offset="0">
                    <el-form-item label="邮箱" prop="userEmail">
                        <el-input v-model="ruleForm.userEmail"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="状态" prop="userState">
                        <el-radio-group v-model="ruleForm.userState">
                            <el-radio :label="true">启用</el-radio>
                            <el-radio :label="false">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12" :offset="0">
                    <el-form-item label="密码" prop="userPassword">
                        <el-input show-password v-model="ruleForm.userPassword"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                    <el-form-item label="确认密码" prop="userPasswords">
                        <el-input show-password v-model="ruleForm.userPasswords"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row :gutter="24">
                <el-col :span="12" :offset="0">
                    <el-form-item label="角色" prop="roleId">
                        <el-cascader :options="treelist" @change="value" :props="{ multiple: true, checkStrictly: true }"
                            clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
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
                    <el-form-item label="简介" prop="userDesc">
                        <div style="border: 1px solid #ccc;width: 100%;">
                            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                                :mode="mode" />
                            <Editor style="height: 500px; overflow-y: hidden;" v-model="ruleForm.userDesc"
                                :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" />
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <div style="margin: 0 auto;width: 400px;">
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </div>
        </el-form>

    </div>
</template>
<script>
import { GetRoleTree } from "@/api/role";
import { CreateUserAsync } from "@/api/admin";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import Vue from 'vue'
export default Vue.extend({
    components: { Editor, Toolbar },
    name: 'APP',
    data() {
        var validatePass = (rule, value, callback) => {
            debugger
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.userPassword !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.userPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            //富文本编译器变量
            editor: null,
            toolbarConfig: {},
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'


            treelist: [],
            parentid: "",
            ruleForm: {
                userName: '',
                pullName: "",
                userEmail: '',
                userPassword: '',
                userPasswords: '',
                userState: '',
                userImg: "",
                userDesc: "",
                lastLoginIP: ":IP",
                roleId: [],
                roleIdAll: [],
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                pullName: [
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
                userPassword: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                userPasswords: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    CreateUserAsync(this.ruleForm).then(d => {
                        if (d.result == 200) {
                            this.$message.success(d.message)
                            setTimeout(() => {
                                this.$emit("CreateVisible", false)
                            }, 1000)
                        } else if (d.result == 100) {
                            this.$message.warning(d.message);
                        } else {
                            this.$message.error(d.message)
                        }
                    })
                } else {
                    console.log('error submit!!');
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
        value(val) {
            this.ruleForm.roleId = [];
            this.ruleForm.roleIdAll = [];
            // console.log(val)
            val.forEach(item => {
                var index = item.length;
                // console.log(index)
                this.ruleForm.roleId.push(item[index - 1])
                this.ruleForm.roleIdAll.push(item.toString());
            })
            console.log(this.ruleForm.roleId)
        }
    },
    created() {
        this.GetRoleTree();
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

.el-cascader-panel {
    height: 100px;
}
</style>
