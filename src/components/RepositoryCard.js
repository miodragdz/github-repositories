import React from 'react'

const RepositoryCard = ({ repository }) => (
  <div className="cards__item">
    <div className="card">
      <div className="card__content">
        <a className="card__name" href={repository.html_url} target="_blank" rel="noopener noreferrer">{repository.full_name}</a>
        <div className="card__language">{repository.language ? repository.language : 'No Language Info'}</div>
        <p className="card__owner">{`Owner: `}
          <a className="card__owner-link" href={repository.owner.html_url} target="_blank" rel="noopener noreferrer">{`${repository.owner.login}`}</a>
        </p>      
        <span className="card__stars">{`Stars: ${repository.stargazers_count}`}</span>
      </div>
    </div>
  </div>
)

export default RepositoryCard
