<template>
  <div class="input-box-custom">
    <input
      class="input-custom"
      v-model="todo"
      placeholder="할일을 입력해주세요."
      @keyup.enter="saveToDo()"
    />
  </div>

  <div class="listLength-custom">
    <v-chip-group filter v-model="filterSelection">
      <v-chip>해야할일</v-chip>
      <v-chip>완료한일</v-chip>
    </v-chip-group>
    <div>남아있는 할일 개수 : {{ leftListCount }}</div>
  </div>

  <div class="item-box-outside-custom">
    <div class="item-box-custom" v-for="item in reviewList" :key="item.id">
      <div class="item-flex-custom">
        <div class="item-flex-in-custom">
          <div class="item-custom">
            <img
              v-if="item.completion == 0"
              @click="patchCompletionToDo(item)"
              src="@/assets/xd_unchecked.svg"
            />
            <img
              v-else
              @click="patchCompletionToDo(item)"
              src="@/assets/xd_checked.svg"
            />
          </div>
          <input
            v-model="item.title"
            :class="
              item.completion == 0
                ? 'item-custom unresolved'
                : 'item-custom solved'
            "
            @keyup.enter="patchContentsToDo(item)"
          />
        </div>
        <div class="button-box-custom">
          <button @click="deleteItem(item, item.id)" class="button-custom">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import axios from "axios";

export default {
  computed: {
    leftListCount() {
      return this.reviewList.filter((item) => item.completion === 0).length;
    },
  },

  mounted() {},
  setup() {
    const reviewList = ref([]);
    const todo = ref("");
    const filterSelection = ref();
    axios
      .get("/api/v1/todo/get", {})
      .then((res) => {
        console.log(res.data);
        reviewList.value = res.data;
        console.log("reviewList.value", reviewList.value);
      })
      .catch((err) => {
        console.log(err);
      });

      watch(filterSelection, (selection, prevSelection) => {
        axios
          .get("/api/v1/todo/get", {params: {
            completion : selection
          }})
          .then((res) => {
            console.log(res.data);
            reviewList.value = res.data;
            console.log("reviewList.value", reviewList.value);
          })
          .catch((err) => {
            console.log(err);
          });
      });

    return {
      todo,
      reviewList,
      filterSelection,

      // 전체 글 조회
      getAllToDo() {
        axios
          .get("/api/v1/todo/get", {})
          .then((res) => {
            console.log(res.data);
            reviewList.value = res.data;
            console.log("reviewList.value", reviewList.value);
          })
          .catch((err) => {
            console.log(err);
          });
      },

      // 글 등록
      saveToDo() {
        if (this.todo != "") {
          axios
            .post("/api/v1/todo/save", {
              title: this.todo,
            })
            .then((res) => {
              console.log(res);
              this.reviewList.push(res.data);
              this.todo = "";
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("내용을 입력해주세요.");
        }
      },

      // 글 삭제
      deleteItem(item) {
        axios
          .delete("/api/v1/todo/delete/" + item.id)
          .then((res) => {
            console.log(res);
            console.log("메서드 호출이 왜 안되는거지?");
            this.getAllToDo(item);
          })
          .catch((err) => {
            console.log(err);
          });
      },

      // 글 완료 수정
      patchCompletionToDo(item) {
        let newCompletion;

        if (item.completion === 1) {
          newCompletion = 0;
        } else {
          newCompletion = 1;
        }

        axios
          .patch("/api/v1/todo/update/" + item.id, {
            title: item.title,
            completion: newCompletion,
          })
          .then((res) => {
            console.log(res);
            item.completion = newCompletion;
          })
          .catch((err) => {
            console.log(err);
          });
      },

      // 글 내용 수정
      patchContentsToDo(item) {
        axios
          .patch("/api/v1/todo/update/" + item.id, {
            title: item.title,
            completion: item.completion,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
  },
};
</script>
<style scoped>
.item-box-custom {
  width: 75%;
  margin: auto;
}
.item-custom {
  padding: 5px;
  font-weight: 600;
  display: flex;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
}
.unresolved {
  opacity: 0.7;
  width: calc(100% - 40px);
  margin-left: 5px;
}

.solved {
  text-decoration: line-through;
  font-style: italic;
  opacity: 0.5;
  width: calc(100% - 40px);
  margin-left: 5px;
}
.input-box-custom {
  width: 75%;
  margin: 15px auto;
  border-bottom: blue 1px solid;
}

.input-custom {
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  font-size: 13px;
}
.item-box-outside-custom {
  height: 70%;
  width: 100%;
  overflow-y: scroll;
  position: fixed;
  margin: auto;
}
.item-flex-custom {
  display: flex;
  justify-content: space-between;
}
.button-custom {
  background: black;
  color: white;
  margin: auto;
  border-radius: 4px;
  font-size: 12px;
  padding: 3px 9px;
  font-weight: 600;
}

.button-box-custom {
  display: flex;
  margin-right: 10px;
}

.item-flex-in-custom {
  display: flex;
  width: 80%;
}

.listLength-custom {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
