import React from "react";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import RepositoriesPageContainer, {
  RepositoriesPage,
} from "../../components/RepositoriesPage";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { repositories, noDataFatched } from "../fixtures/repositories";
import actionFunctions from "../../actions/repositoriesAction";

const createMockStore = configureMockStore([thunk]);

test("should render RepositoriesPage with repositories", () => {
  const wrapper = shallow(
    <RepositoriesPage
      getRepositories={jest.fn(() => Promise.resolve(repositories))}
      repositories={repositories.items}
      totalCount={repositories.total_count}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

test("should render RepositoriesPage with message", async () => {
  const wrapper = shallow(
    <RepositoriesPage
      getRepositories={jest.fn(() => Promise.resolve(noDataFatched))}
      repositories={[]}
      totalCount={0}
    />
  );

  await wrapper.find(Search).props().onSearchButtonClick("zxcvbnmlkgf");

  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("h2")).toHaveLength(2);
});

test("should change state on invoke onSearchButtonClick callback", async () => {
  const wrapper = shallow(
    <RepositoriesPage
      getRepositories={jest.fn(() => Promise.resolve(repositories))}
      repositories={repositories.items}
      totalCount={repositories.total_count}
    />
  );

  await wrapper.find(Search).props().onSearchButtonClick("jquery");

  expect(wrapper.state("searchTerm")).toEqual("jquery");
  expect(wrapper.state("maxPage")).toEqual(40);
  expect(wrapper.state("currentPage")).toEqual(1);
});

test("should change state on invoke jumpToPage callback", async () => {
  const wrapper = shallow(
    <RepositoriesPage
      getRepositories={jest.fn(() => Promise.resolve(repositories))}
      repositories={repositories.items}
      totalCount={repositories.total_count}
    />
  );
  wrapper.setState({ maxPage: 40 });

  await wrapper.find(Pagination).props().jumpToPage(3);

  expect(wrapper.state("currentPage")).toEqual(3);
});

test("mapStateToProps - should provide correct props from store", () => {
  const state = { repositories };
  const mockStore = createMockStore(state);
  const wrapper = shallow(<RepositoriesPageContainer store={mockStore} />);

  expect(wrapper.props().children.props.totalCount).toEqual(
    repositories.total_count
  );
  expect(wrapper.props().children.props.repositories).toEqual(
    repositories.items
  );
});

test("mapDispatchToProps - should provide dispatch from store", async () => {
  const state = { repositories };
  const mockStore = createMockStore(state);

  actionFunctions.getRepositories = jest
    .fn()
    .mockImplementation((dispatch, searchTerm, pageNumber) => {
      return Promise.resolve(repositories).then((repositories) => {
        dispatch(actionFunctions.setRepositories(repositories));
        return repositories;
      });
    });

  const wrapper = mount(<RepositoriesPageContainer store={mockStore} />);

  await wrapper.find(Search).props().onSearchButtonClick("jquery", 1);

  const actions = mockStore.getActions();
  expect(actions).toHaveLength(1);
});
